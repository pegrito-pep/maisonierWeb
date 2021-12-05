<template>
    <div>
        <b-alert v-if="!allowed" show variant="info" class="text-center">
            <i class="fa fa-exclamation-triangle fa-3x"></i><br>
            <span class="h4">Cette occupation n'était pas encore créée à cette période</span>
        </b-alert>
        <div v-else>
            <div class="jumbotron pt-10 pb-10 px-2">
                <h5 class="text-center mb-2">{{$t('data.loyers_effectuer_versement_pour')}}:</h5>
                <b-row>
                    <b-col><dl>
                        <dt>{{$t('data.detail_habitant_logement')}}</dt>
                        <dd>
                            <span class="font-weight-bold fa-lg">{{ occupation.logement.refLogement }}</span> 
                            <br> {{ occupation.logement.sousTypeLogement.libelleSousType }} 
                            <br> <span v-if="occupation.logement.batiment">{{$t('data.Bâtiment')}} : {{ occupation.logement.batiment.nomBatiment }}</span>
                        </dd>
                    </dl></b-col>
                    <b-col><dl>
                        <dt>{{$t('data.occupation_locataire')}}</dt>
                        <dd>
                            <span class="font-weight-bold fa-lg">{{ occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>
                            <br> {{ occupation.locataire.tel }} 
                            <br> {{ occupation.locataire.email }}</dd>
                    </dl></b-col>
                </b-row>
            </div>
            <b-row>
                <b-col><b-form-group :label="$t('data.occupation_informations_loyer')" :description="$t('data.occupation_avance') + ' ' + paiement.avance[0]">
                    <b-form-checkbox v-model="paiement.buy[0]" :disabled="paiement.disabled[0]">{{$t('data.occupation_charge_payer')}} <b>{{ paiement.loyer | currency(devise, 0,{  symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.'  }) }}</b></b-form-checkbox>
                </b-form-group></b-col>
                <b-col><b-form-group :label="$t('data.ionsolvable_charges_insolvable')" :description="$t('data.occupation_avance') + ' ' + paiement.avance[3]">
                    <b-form-checkbox v-model="paiement.buy[3]" :disabled="paiement.disabled[3]">{{$t('data.occupation_charge_payer')}} <b>{{ paiement.charges | currency(devise, 0,{  symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.'  }) }}</b></b-form-checkbox>
                </b-form-group></b-col>
            </b-row>
            <b-row>
                <b-col><b-form-group :label="$t('data.ionsolvable_en_eau')" :description="$t('data.occupation_avance') + ' ' + paiement.avance[1]">
                    <b-form-checkbox v-model="paiement.buy[1]" :disabled="paiement.disabled[1]">{{$t('data.occupation_charge_payer')}} <b>{{ paiement.eau | currency(devise, 0,{  symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.'  }) }}</b></b-form-checkbox>
                </b-form-group></b-col>
                <b-col><b-form-group :label="$t('data.ionsolvable_en_lumiere')" :description="$t('data.occupation_avance') + ' ' + paiement.avance[2]">
                    <b-form-checkbox v-model="paiement.buy[2]" :disabled="paiement.disabled[2]">{{$t('data.occupation_charge_payer')}} <b>{{ paiement.energie | currency(devise, 0,{  symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.'  }) }}</b></b-form-checkbox>
                </b-form-group></b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col><b-form-group :label="$t('data.loyers_total_a_payer')" :description="$t('data.loyers_total_a_payer_description')">
                    <b-form-input disabled :value="totalPayerFacture()" />
                </b-form-group></b-col>
                <b-col><b-form-group :label="$t('data.loyers_montant_a_prelever')" :description="$t('data.loyers_montant_a_prelever_description')">
                    <b-form-input v-model="paiement.payer" :disabled="totalPayerFacture <= 0" />
                </b-form-group></b-col>
            </b-row>
            <b-button class="float-right mt-2" variant="danger" @click.prevent="runPaiement">Valider</b-button>
        </div>
    </div>
</template>

<script>

const {
    check_if_buy_loyer, 
    check_if_buy_consommation, 
    check_if_buy_charges
} = require('../../helpers/loyers')

export default {
    name: 'PayerLoyerForm',
    props: {
        occupation: { type: Object, required: true },
        periodeCourante: {type: String, required: true}
    },
    data: () => ({
        paiement: { 
            payer: 0, loyer: 0, eau: 0, energie: 0, charges: 0, 
            avance: [0, 0, 0, 0] ,
            buy: [true, false, false, false], disabled: [true, false, false, false], 
        },
        devise: 'F',
        allowed: true
    }),
    watch: {
        periodeCourante() {
            this.initData()
        }
    },
    computed: {
        
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.allowed = this.$dayjs(this.periodeCourante).diff(this.occupation.dateDeb, 'month')  >= 0
            if (!this.allowed) {
                return
            }
            let [a_payer_loyer, totalPayer] = check_if_buy_loyer(this.occupation, this.periodeCourante)
            this.paiement.loyer = this.occupation.loyerBase
            this.paiement.avance[0] = totalPayer
            if (totalPayer >= this.occupation.loyerBase) {
                this.paiement.buy[0] = false
            }

            let [a_payer_eau, consommation_eau, indexeMois_eau] = check_if_buy_consommation(this.occupation, this.periodeCourante, 'eau')
            this.paiement.eau = consommation_eau
            this.paiement.disabled[1] = a_payer_eau == 1
            this.paiement.avance[1] = indexeMois_eau

            let [a_payer_energie, consommation_energie, indexeMois_energie] = check_if_buy_consommation(this.occupation, this.periodeCourante, 'energie')
            this.paiement.energie = consommation_energie
            this.paiement.disabled[2] = a_payer_energie == 1
            this.paiement.avance[2] = indexeMois_energie

            let [a_payer_charge, totalPayer_charge, totalCharge] = check_if_buy_charges(this.occupation, this.periodeCourante)
            this.paiement.charges = totalCharge
            this.paiement.disabled[3] = a_payer_charge == 1
            this.paiement.avance[3] = totalPayer_charge            
        },
        runPaiement(bvtEvt) {
            bvtEvt.preventDefault()
            if (php.empty(this.paiement.payer) || this.paiement.payer < 1) {
                return App.error('Veuillez entrer un montant valide');
            }
            if (this.paiement.disabled[0] && this.paiement.disabled[1] && this.paiement.buy[2]) {
                // return App.error('Tous les éléments de cette facture ont déjà été payés')
            }
            if (this.paiement.buy[0] == false && this.paiement.buy[1] == false && this.paiement.buy[2] == false && this.paiement.buy[3] == false) {
                return App.error('Veuillez selectionnez au moins un élément à payer')
            }
            if (this.paiement.payer > this.totalPayerFacture) {
                return App.error('Vous ne pouvez pas débiter une somme supérieure au total de la facture')
            }
            const data = {
                montant: this.paiement.payer,
                periode: this.periodeCourante,
                loyer: this.paiement.buy[0],
                eau: this.paiement.buy[1],
                energie: this.paiement.buy[2],
                charges: this.paiement.buy[3],
            }
            this.submitted = true 

            axios.post('occupations/' + this.occupation.idOccupation + '/pay-facture', data).then(response => {
                this.submitted = false 
                return App.alertSuccess(response.message, {callback: () => {
                    this.$emit('payed')
                }})
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },

        totalPayerFacture() {
            let total = 0
            if (this.paiement.buy[0] == true) {
                total += (this.paiement.loyer - this.paiement.avance[0])
            }
            if (this.paiement.buy[1] == true) {
                total += (this.paiement.eau - this.paiement.avance[1])
            }
            if (this.paiement.buy[2] == true) {
                total += (this.paiement.energie - this.paiement.avance[2])
            }
             if (this.paiement.buy[3] == true) {
                total += (this.paiement.charges - this.paiement.avance[3])
            }
            return total
        }
    }
}
</script>