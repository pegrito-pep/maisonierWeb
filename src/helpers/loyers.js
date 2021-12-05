const dayjs = require('dayjs');
const php = require('phpjs');


/**
 * calcule et renvoi la consommation mensuelle d'une occupation
 */
export function calcul_consommation(occupation, periode, type) {
     const indexes = occupation.indexes.filter(elt => elt.typeIndexe == type),
         mode = { eau: occupation.modeEau, energie: occupation.modeEnergie },
         pu = { eau: occupation.puEau, energie: occupation.puEnergie }
     
    let indexeMois = getIndexesPeriode(periode, indexes)[0], consommation = 1        

    if (!indexeMois) {
         consommation = 0
    }
    else if (mode[type] == 'index') {
        consommation = indexeMois.nouveau  - indexeMois.ancien
    }

    return consommation * pu[type]
}

export function getIndexesPeriode(periode, indexes) {
    return indexes.filter(e => dayjs(periode).diff(e.periode, 'month') == 0)
}

export function check_if_buy_loyer(occupation, periode) {
    const loyers = occupation.loyers.filter(e => dayjs(periode).diff(e.periode, 'month') == 0)
    if (loyers.length) {
        const totalPayer = loyers.reduce((accumulator, curr) => accumulator + curr.montantPayer, 0)
        if (totalPayer != 0) {
            if (totalPayer < occupation.loyerBase) {
                return [2, totalPayer]
            }
            return [1, totalPayer]
        }
    }
    return [0, 0]
}

export function check_if_buy_consommation(occupation, periode, type) {
    const consommation = calcul_consommation(occupation, periode, type)
    if (consommation == 0) {
        return [-1, consommation, 0]
    }
    const indexes = occupation.indexes.filter(elt => elt.typeIndexe == type)
    if (!php.empty(indexes)) {
        let indexeMois = getIndexesPeriode(periode, indexes)[0]
        if (!php.empty(indexeMois)) {
            if (consommation > indexeMois.avance) {
                return [2, consommation, indexeMois.avance || 0]
            }
            if (consommation <= indexeMois.avance) {
                return [1, consommation, indexeMois.avance || 0]
            }   
        }
    }
    return [0, consommation, 0]
}

/**
 * Verifie si les charge d'une occupation pour une periode ont étées payées
 * 
 * @param {Object} occupation 
 * @param {String} periode 
 * @returns {Array<any>}
 */
export function check_if_buy_charges(occupation, periode) {
    const charges = occupation.charges.filter(e => dayjs(periode).diff(dayjs(e.periode).format('YYYY-MM')+'-01', 'month') == 0)
    const totalCharge = charges.reduce((accumulator, curr) => accumulator + curr.montant, 0)

    if (charges.length) {
        const totalPayer = charges.reduce((accumulator, curr) => accumulator + curr.montantPayer, 0)
        if (totalPayer != 0) {
            if (totalPayer < totalCharge) {
                return [2, totalPayer, totalCharge]
            }
            return [1, totalPayer, totalCharge]
        }
    }
    return [0, 0, totalCharge]
}