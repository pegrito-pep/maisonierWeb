<template>
    <div>
        <div class="card-deck">
           <div class="card mb-2" >
                <div class="card-body">
                    <div class="d-flex justify-content-between"> 
                        <div class="w-20">
                            <b-avatar :src="locataire.avatar" size="10em" />
                        </div>
                        <div class="w-60 globalcont2">
                            
                            <dl class="row text-muted">
                                <dd v-if="locataire.cniLocataire" class="mt-1 mb-2 col-1"><i class="fa fa-id-card"></i></dd>
                                <dt v-if="locataire.cniLocataire" class="mt-1 mb-2 col-11 truncate" v-b-tooltip="$t('data.occupation_numero_cni')">{{ locataire.cni }}</dt>
                                <dd v-if="locataire.tel" class="mt-1 mb-2 col-1"><i class="fa fa-phone"></i></dd>
                                <dt v-if="locataire.tel" class="mt-1 mb-2 col-11 truncate" v-b-tooltip="$t('data.occupation_numero_telephone')">{{ locataire.tel }}</dt>
                                <dd v-if="locataire.email" class="mt-1 mb-2 col-1"><i class="fa fa-envelope"></i></dd>
                                <dt v-if="locataire.email" class="mt-1 mb-2 col-11 truncate" v-b-tooltip="$t('data.occupation_email')">{{ locataire.email }}</dt>
                                <dd class="mt-1 mb-2 col-1" v-if="locataire.dateNaiss"><i class="fas fa-birthday-cake"></i></dd>
                                <dt class="mt-1 mb-2 col-11 truncate" v-b-tooltip="$t('data.occupation_date_naissance')" v-if="locataire.dateNaiss">{{ $date(locataire.dateNaiss).format('DD MMMM YYYY') }}</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_tooltip_solde_principal')}}</dd>
                                <dt class="mt-1 mb-2 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_tooltip_solde_principal')"> {{ locataire.solde }} F CFA</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_impayer_loyer')}}</dd>
                                <dt class="mt-1 mb-2 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_impayer_loyer')"> {{ locataire.impayerLoyer }} F CFA</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_impayer_eau')}}</dd>
                                <dt class="mt-1 mb-2 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_impayer_eau')">{{ locataire.impayerEau }} F CFA</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_impayer_electricite')}}</dd>
                                <dt class="mt-1 mb-2 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_impayer_electricite')">{{ locataire.impayerEnergie }} F CFA</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_impayer_charges')}}</dd>
                                <dt class="mt-1 mb-2 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_impayer_charges')">{{ locataire.impayerCharges }} F CFA</dt>
                                <dd class="mt-1 mb-2 col-5">{{$t('data.detail_habitant_total_impayer')}}</dd>
                                <dt class="mt-1 mb-1 col-3 truncate" v-b-tooltip="$t('data.detail_habitant_total_impayer')"><b-badge variant="danger">{{ locataire.impayerTotal }} F CFA</b-badge></dt>
                            </dl>
                        </div>
                    </div>

                </div>
            </div> 
        </div>
        <div class="mt-1">
            <!--<b-table  sticky-header="600px" striped hover responsive :items="indexes" :fields="[
                { key: 'mois', label: $t('data.occupation_mois'), sortable: true },
                { key: 'annees', label: $t('data.occupation_annee'), sortable: true },
                { key: 'chargesEau', label: $t('data.occupation_consommation'), sortable: true },
                { key: 'chargesElec', label: $t('data.occupation_montant'), sortable: true },
                { key: 'autresCharges', label: $t('data.occupation_details') }
            ]">-->
            <h4 class="d-flex justify-content-center align-items-center font-weight-bold">Répartition des Impayés</h4>
            <b-table  sticky-header="600px" striped hover responsive :items="indexes" :fields="[
                { key: 'mois', label: $t('data.occupation_mois'), sortable: true },
                { key: 'annees', label: $t('data.occupation_annee'), sortable: true },
                { key: 'chargesEau', label: 'charges en eau', sortable: true },
                { key: 'chargesElec', label: 'charges en electricité', sortable: true },
                { key: 'autresCharges', label: 'autres charges' }
            ]">

                <!--<template #cell(mois)="data">{{ $dayjs(data.item.periode).format('MMMM')}}</template>-->
                <template #cell(mois)>Janvier</template>
                <!--<template #cell(annees)="data">{{ $dayjs(data.item.periode).format('YYYY')}}</template>-->
                <template #cell(annees)>2021</template>
                <template #cell(chargesEau)>2200 F</template>
                <template #cell(chargesElec)>2900 F</template>
                <template #cell(autresCharges)>0 F</template>
                <!--<template #cell(chargesElec)="data">{{ data.item.nouveau - data.item.ancien }}</template>
                <template #cell(montant)="data"><span :class="{'text-success': _calcul_consommation_indexe(data.item, tab_indexe) <= data.item.avance, 'text-warning': _calcul_consommation_indexe(data.item, tab_indexe) > data.item.avance, 'text-danger': empty(data.item.avance)}">
                    {{ _calcul_consommation_indexe(data.item, tab_indexe) }} F
                </span></template>
                <template #cell(show_details)="row"><b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails"></b-form-checkbox></template>
                <template #row-details="row">
                    <b-card class="m-0">
                        <b-row>
                            <b-col>
                                <dl class="row text-muted">
                                    <dd class="mt-1 col-5">{{$t('data.occupation_avance')}}</dd>
                                    <dt class="mt-1 col-7">{{ empty(row.item.avance) ? '0 F' : row.item.avance + ' F' }}</dt>
                                    <dd class="mt-1 col-5">{{$t('data.occupation_reste')}}</dd>
                                    <dt class="mt-1 col-7">{{ empty(row.item.reste) ? '0 F' : row.item.reste + ' F' }}</dt>
                                </dl>
                            </b-col>
                            <b-col>
                                <dl class="row text-muted">
                                    <dd class="mt-1 col-5">{{$t('data.occupation_status')}}</dd>
                                    <dt class="mt-1 col-7">
                                        <div class="d-flex" v-if="_calcul_consommation_indexe(row.item, tab_indexe) == 0">
                                            <b-badge>{{$t('data.occupation_consommation_non_consomme')}}</b-badge>
                                        </div>
                                        <div class="d-flex" v-else-if="empty(row.item.avance)">
                                            <b-badge variant="danger">{{$t('data.occupation_consommation_non_payer')}}</b-badge>
                                            <b-button class="ml-1 py-1" size="sm" @click.prevent="buyIndexe(row.item, tab_indexe)" v-b-tooltip="'Payer maintenant'"><i class="fa fa-coins"></i></b-button>
                                        </div>
                                        <div class="d-flex" v-else-if="_calcul_consommation_indexe(row.item, tab_indexe) > row.item.avance">
                                            <b-badge variant="warning">{{$t('data.occupation_avancer')}}</b-badge>
                                            <b-button class="ml-1 py-1" size="sm" @click.prevent="buyIndexe(row.item, tab_indexe)" v-b-tooltip="'Completer le paiement'"><i class="fa fa-coins"></i></b-button>
                                        </div>
                                        <b-badge variant="success" v-else>{{$t('data.occupation_payer')}}</b-badge>
                                    </dt>
                                    <dd class="mt-1 col-5">{{$t('data.occupation_date_paiement')}}</dd>
                                    <dt class="mt-1 col-7">{{ empty(row.item.datePaiement) ? 'Non disponible' : $date(row.item.datePaiement).format('DD MMMM YYYY') }}</dt>
                                </dl>
                            </b-col>
                        </b-row>
                    </b-card>
                </template>-->
            </b-table>
        </div>

            
    </div>
</template>

<script>

import ModalRecharge from '@/views/gestion-immobiliere/habitants/Modal.vue'
//import OccupationForm from "@/components/_gestion-immobiliere/OccupationForm.vue";
import OccupationForm from "@/views/gestion-immobiliere/occupations/OccupationForm.vue"


const php = require('phpjs')
export default {
    components: {
        OccupationForm,
        ModalRecharge
     
    },
    props: {
        locataire: {type: Object, required: true}
    },
    data: () => ({
        action:0,
        section: 'occupations',
        /**
         * Données manipuler par la section occupations
         */
        currentPage: 1,
        perPage: 10,
        occupations:[],
        setOccupation:false,
        /**
         * Données manipuler par la section add-occupation
         */
        provenance:2,
        action:"add",
   
        show:false,
 
        showModal: true,
        touslesComptes:[
             { text: 'loyer', value: 'compteLoyer' },
             { text: 'électricité', value: 'compteEnergie' },
             { text: 'eau', value: 'compteEau' }
        ],
        indexes:[]
    }),
    computed: {
       
    },
    mounted() {
        /*javascript composant de drop down*/

    },
    methods: {

       /**
         * réponse à l'évènement d'ajout d'une occupation
         * dans le détail d'un habitant, la réponse consiste juste à mettre à jour la liste des occupations de l'habitant
         */
         addedOccupation() {
            axios.get(`locataires/${this.locataire.idLocataire}/occupations`).then(response => response.result || []).then(occupations => {
                this.locataire.occupations = occupations
                this.section = 'occupations'
            })
        },
        /**
         * recupération de la liste des occupations de l'habitant sélectionné si elles existent
         */
        getOccupations(){
            axios.get("locataires/"+locataire.idLocataire+"/occupations").then(response =>{
                 this.occupations=response.result;
            })
        },
        viewOccupationDetail(occupation){
            this.$root.$emit('show-detail-occupation',occupation)
        },

        /**
         * Ouvre le formulaire de recharge du compte d'un locataire
         */
        callRechargeForm(locataire) {
            console.log("locataire 1", locataire)
            this.recharge.enabled = true;
            this.locataire = locataire;
            this.$refs['modal-recharge'].show()
        },
        /**
         * valide la recharge du compte d'un locataire
         */
        validateRecharge(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.recharge.error = false;

            if (php.empty(this.recharge.montant) || this.recharge.montant < 1000) {
                this.recharge.error = true;
                return;
            }
            this.recharge.submitted = true;

            axios
                .post(`locataires/${this.locataire.idLocataire}/recharge`, this.recharge)
                .then(response => {
                    this.getHousing(false);
                    this.resetRechargeForm();
                    return App.notifySuccess(response.message);
                })
                .catch(error => {
                    this.recharge.submitted = false;
                    return App.alertError(error.message);
                });
        },


    }
}
</script>

<style scoped>
    .globalcont2{
        position: relative;
    }
    .display-top-right{
        position: absolute;
        right: 0;
        top: 0;
   
    }
    /* debut css du composant de drop down*/

/*fin css du composant de drop down*/

</style>