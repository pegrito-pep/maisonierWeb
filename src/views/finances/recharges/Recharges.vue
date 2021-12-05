<template>
    <div class="container-fluid">
        <!--page header start -->
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                        <!--<div class="float-md-right">
                            <div class="d-flex ">
                                <b-form-select class="form-control" size="sm" v-model="periode.mois" :options="mois" />
                                <b-form-select class="form-control" size="sm" v-model="periode.annee" :options="annees" />
                            </div>
                        </div>-->
                        <div class="d-flex align-items-center justify-content-end">
                            <paginatorTop :offset="offset" :libelle='$t("data.finance_recharges")' :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" class="mr-2 d-flex justify-content-center align-items-center" />
                            <button v-if="canRecharges" type="button" class="btn btn-danger" data-toggle="modal" data-target="#fullwindowModal"><i class="fa fa-plus-circle"></i> {{$t('data.recharger_compte_en_masse')}}</button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">{{$t('data.occupation_pas_de_occupation')}}</span>
                    </b-alert> 
                    <b-row v-else>
                        <div class="card-body">
                            <b-table-simple hover small responsive>
                                <b-thead head-variant="light">
                                    <b-tr class="text-center">
                                        <b-th>{{$t('data.detail_habitant_numero')}}</b-th>
                                        <b-th>{{$t('data.detail_habitant_logement')}}</b-th>
                                        <b-th>{{$t('data.occupation_locataire')}}</b-th>
                                        <b-th>{{$t('data.recharger_solde_du_compte')}}</b-th>
                                        <b-th>{{$t('data.batiment_form_label_action')}}</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="(occupation, i) in items" :key="occupation.idOccupation">
                                        <b-td class="px-2 py-1">
                                            <h4 class="card-title">{{ ++i }}</h4> 
                                        </b-td>
                                       <b-td class="px-2 py-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.logement.refLogement }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">
                                                {{ occupation.logement.sousTypeLogement.libelleSousType  }}
                                                <span v-if="occupation.logement.batiment"> / {{$t('data.logement_batiment_lie_au_clonage_label')}} : {{ occupation.logement.batiment.nomBatiment }}</span>
                                            </span>    
                                        </b-td>
                                        <!--<b-td class="p-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ /*occupation.locataire.titre + ' ' +*/ occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">{{ occupation.locataire.tel }}</span>    
                                        </b-td>-->
                                        <!--<b-td class="p-1" v-html="_display_logement(occupation)"></b-td>-->
                                        <b-td class="p-1" v-html="_display_locataire(occupation)"></b-td>
            
                                        <b-td class="p-1" v-html="_display_solde(occupation)"></b-td>
                                        <b-td>
                                            <b-dropdown right >
                                                <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                                                <b-dropdown-item :to="{name: 'occupation', params: {id: occupation.idOccupation}}">{{$t('data.logement_detail_details_de_occupation')}}</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="doPayment(occupation)">{{$t('data.charge_effectuer_un_paiement')}}</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="correspondance(occupation)">{{$t('data.recharger_modifier_le_solde')}}</b-dropdown-item>
                                            </b-dropdown>                                            
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                    </b-row>
                    <hr>
                    <div class="d-flex justify-content-between align-items-start">
                        <paginator :offset="offset" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                    </div>
                </b-overlay>
            </div>
        </div>

       <!-- form de recharge des comptes en masse -->
        <div class="modal fade edit-layout-modal" id="fullwindowModal" tabindex="-1" role="dialog" aria-labelledby="fullwindowModalLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div style="position: sticky; top: 0;z-index: 9; background: #F5F5F5">
                        <div class="modal-header w-100">
                            <h5 class="modal-title font-weight-bold" id="fullwindowModalLabel">{{$t('data.recharger_plusieurs_compte')}}<br/> (<span class="font-weight-bold ml-1 mt-2 h5" style="color: #f5365c"> {{occupations.length}} / {{ trueOccupations.length }} Comptes</span> )</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="input-group mx-4 mt-3">
                            <input class="pl-3 h6" type="text" placeholder="Rechercher un compte" style="height: 40px; width: 350px; border-radius: 5px; border: none; color: gray" v-model="search" />
                            <button type="submit" class="btn btn-icon border-0" style="height: 40px; width:50px; border-radius: 5px; background-color: #eceff1;"><i class="ik ik-search text-dark"></i></button>
                        </div>
                    </div>

                    <div class="modal-body">
                    <b-overlay :show="showOverlay" rounded="sm">
                        <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                            <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                            <span class="h4 d-inline-flex ml-2">{{$t('data.recharger_pas_de_occupation')}}</span>
                        </b-alert> 
                        <b-row v-else>
                        <b-col lg="4" md="6" sm="12" v-for="occupation in items" :key="occupation.idOccupation" > 
                            <b-card :title="occupation.logement.refLogement" :sub-title="occupation.logement.sousTypeLogement.libelleSousType" class="p-0"  style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);">
                                <div class="text-white py-1 rounded pl-2" style="background: #191c22;">
                                    <p class="h5 font-weight-bold" style="color: #fff;">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' '+ occupation.locataire.prenomLocataire }}</p>
                                    <div class="d-flex justify-content-start align-items-center font-weight-bold h6" style="color: #fff">{{$t('data.recharger_solde_actuel')}} : <span class="font-weight-bold ml-1 mt-2 h5" style="color: #f5365c">{{ occupation.solde }} F</span></div>
                                </div>
                                <hr>
                                <h6 class="font-weight-bold">{{$t('data.recharger_montant_recharge')}}</h6>
                                <b-form-group label="">
                                    <b-input-group>
                                        <b-form-input size="sm" type="number" min="0" v-model="occupation.montant"/>
                                    </b-input-group>
                                </b-form-group>
               
                            </b-card>
                        </b-col>
                        </b-row>
                        <hr>
                        <div class="d-flex justify-content-between align-items-start">
                            <paginator :offset="offset" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" /> 
                            <!-- <b-button class="position-fixed validate btn-icon" variant="danger" :disabled="submitted" @click.prevent="submitForm" v-b-tooltip.left="'Valider'"><b-spinner small v-if="submitted" /><i v-else class="fa fa-check fa-lg"></i></b-button> -->
                        </div>
                    </b-overlay>
                    </div>
                    <div class="modal-footer w-100">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="myBtn">{{$t('data.logement_form_fermer')}}</button>
                        <button type="button" class="btn" :disabled="submitted"  @click.prevent="CreditedAccounts" style="background: #f5365c; color: #FFF"><b-spinner small v-if="submitted" />{{$t('data.batiment_form_wizard_bouton_enregistrer')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import SearchForm from "@/components/parts/SearchForm.vue";
const php  = require ( 'phpjs' ) ; 

export default {
  name: "recharges",
  components: {
      SearchForm
  },
  data: () => ({
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     occupations:[],
     trueOccupations:[],
     occupation: null,
     submitted: false,
     devise:null,
     permissions: storage.get("userPermissions")
  }),
  watch: {
       search(value) {
        this.occupations = !php.empty(value)
            ? this.trueOccupations.filter(elt =>
                elt.locataire.nomLocataire.toLowerCase().includes(value.toLowerCase()) ||
                elt.locataire.prenomLocataire.toLowerCase().includes(value.toLowerCase()) ||
                elt.logement.refLogement.toLowerCase().includes(value.toLowerCase())
            )
            : this.trueOccupations;
        },
        periodeCourante(value) {
            this.getOccupations()
        }
  },
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        /*items() { 
            return php.array_slice(this.occupations.filter(elt => {
                return (this.$dayjs(this.periodeCourante).diff(elt.dateDeb, 'month') >= 0 && (php.empty(elt.dateFin) || this.$dayjs(elt.dateFin).diff(this.periodeCourante, 'month') <= 0))
            }), this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        },*/
            /**
     * Elements affichés avec prise en charge de la pagination
     */
        items() {
            return php.array_slice(this.occupations, this.offset, this.perPage);
        },
        offset() {
            return this.currentPage * this.perPage - this.perPage;
        },

        annees() {
            const current = this.$dayjs().format('YYYY')
            let annees = [current]

            for (let i = current; i > (current - 5); i--) {
                if (i != current) {
                    annees.push(i)
                }
            }
            
            return annees.sort((a, b) => a - b)
        },
        canRecharges(){
            if(this.permissions.includes("add_recharge_comptes")){
                return true;
            }
            return false;  
        }

    },

    beforeMount() {
        /*this.periode = {
            mois: parseInt(this.$dayjs().format('M')) - 1,
            annee: parseInt(this.$dayjs().format('YYYY'))
        }*/
        this.getOccupations()
    },
    mounted(){
        this.devise=storage.get('devise')
        if(this.devise==null)
        this.devise='F'
    
    this.occupations = this.setMontants(this.occupations)

    },
    methods: {
        CreditedAccounts(){
              this.submitted = true 
            let data = { comptes: [] }

            this.occupations.forEach(elt => {
                if (null != elt.montant) {
                    data.comptes.push({
                        idOccupation: elt.idOccupation,
                        montant: elt.montant
                    })
                }
            })
            axios.post('comptes/recharge', data).then(response => {
                App.notifySuccess(response.message)
                this.showOverlay = true 
                this.submitted = false
                this.$refs.myBtn.click();
                this.getOccupations()
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message || 'Impossible de joindre le serveur')
            })
        },

            //recupération de la liste des occupations
        getOccupations() {
                axios.get('occupations-lite').then(response => response.result || []).then(occupations => {
                    this.occupations = this.trueOccupations = occupations
                    this.showOverlay = false
                })
               
        },
        setMontants(occupations) {
            return occupations.map(elt => {
  
                elt.montant = 0

                return elt
            })
        },
        _display_solde(occupation) {
            let variant = 'success', title = ''

            return `<span class="badge w-100 badge-${variant}">
                <b>${occupation.solde}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },
        _display_locataire(occupation){
            let variant = 'secondary', title = ''+occupation.locataire.tel
            return `<span class="badge w-100 badge-${variant}">
                <b>${occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire}</b><br>
                <span class="small">${title}</span>
            </span>`
        },


    }

};
</script>
<style scoped>
    .text-form-occupation {
        font-size: 1.3em;
        color: #212121ef;
        font-weight: 800;
        text-align: center;
        margin-top: 2px;
    }
    .modal-footer{
        position: sticky;
        bottom: 0;
        right: 0;
        z-index: 99;
        background: #F5F5F5;
    }

</style>