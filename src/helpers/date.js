const dayjs = require('dayjs')

export function annees() {
    const current = dayjs().format('YYYY')
    let annees = [current]

    for (let i = current; i > (current - 5); i--) {
        if (i != current) {
            annees.push(i)
        }
    }
    
    return annees.sort((a, b) => a - b)
}

export function mois(annee) {
    const date = new Date, mois = [], 
        current = dayjs().format('YYYY'),
        limit = current == annee ? date.getMonth() : 11
    for (let i = 0; i <= limit; i++) {
        date.setMonth(i)
        mois.push({ value: i, text: dayjs(date).format('MMMM') })
    }

    return mois
}

export function periodeCourante({mois, annee}) {
    if (annee == null || mois == null) {
        return null
    }
    let periodeCourante = mois + 1
    if (periodeCourante < 10) {
        periodeCourante = '0'+periodeCourante
    }
    return annee + '-' +  periodeCourante + '-01'
}