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
                                <dt v-if="locataire.cniLocataire" class="mt-1 mb-2 col-11 truncate" v-b-tooltip="$t('data.occupation_numero_cni')">{{ locataire.cniLocataire }}</dt>
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
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'occupations'}" @click.prevent="section = 'occupations'">{{$t('data.detail_habitant_occupations')}}</a></li>
                <!--<li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'charges'}" @click.prevent="section = 'charges'">Charges</a></li>
                <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'loyers'}" @click.prevent="section = 'loyers'">Loyers</a></li>
                <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'logements'}" @click.prevent="section = 'Logements'">Logements</a></li>-->
                <li class="nav-item" v-if="itemsOccupations.length==0"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-occupation'}" @click.prevent="section = 'add-occupation'">{{$t('data.detail_habitant_ajouter_occupation')}}</a></li>
            </ul>
            <div class="tab-content mt-3">
                <div class="tab-pane fade show active">
                    <b-container fluid v-if="section == 'occupations'" style="height: 75vh; overflow-y: auto; overflow-x: hidden">
                        <b-alert variant="info" class="text-center" show v-if="!locataire.occupations.length">
                            <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                            <span class="h4 d-inline-flex ml-2">{{$t('data.occupation_pas_de_occupation')}}</span>
                        </b-alert> 
                        <b-row v-else>
                            <div class="card-body">
                                <b-table-simple hover small responsive>
                                    <b-thead head-variant="light">
                                        <!--<b-tr>
                                            <b-th>N°</b-th>
                                            <b-th>Logement</b-th>
                                            <b-th>Loyer de base</b-th>
                                            <b-th>Facturation en eau</b-th>
                                            <b-th>Facturation en energie</b-th>
                                            <b-th>Action</b-th>
                                        </b-tr>-->
                                        <b-tr>
                                            <b-th>{{$t("data.detail_habitant_numero")}}</b-th>
                                            <b-th>{{$t('data.detail_habitant_logement')}}</b-th>
                                            <b-th>{{$t('data.detail_habitant_prix_loyer')}}</b-th>
                                            <b-th>{{$t("data.occupation_facture_eau")}}</b-th>
                                            <b-th>{{$t('data.occupation_facture_energie')}}</b-th>
                                            <b-th class="d-flex justify-content-center align-items-center">{{$t('data.batiment_form_label_action')}}</b-th>
                                        </b-tr>
                                    </b-thead>
                                    <b-tbody>
                                        <!--<b-tr v-for="occupation in itemsOccupations" :key="occupation.idOccupation">
                                            <b-td class="p-2">{{ occupation.idOccupation }}</b-td>
                                            <b-td class="p-2"> 
                                                <span class="d-inline-block w-100 mt-1 text-muted" v-if="occupation.modePaiement == 'prepayer'">
                                                    Paiement loyer avant consommation
                                                </span>
                                                <span class="d-inline-block w-100 mt-1 text-muted" v-if="occupation.modePaiement == 'postpayer'">
                                                    Paiement loyer après consommation
                                                </span>     
                                            </b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.loyerBase}}</span>    
                                            </b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mb-1"><b>{{ occupation.modeEau }}</b> / 
                                                    <small v-if="occupation.modeEau =='index'">{{ occupation.puEau }} le KW</small>
                                                    <small v-if="occupation.modeEau =='forfait'">{{ occupation.puEau }} par mois</small>
                                                </span>     
                                            </b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mb-1"><b>{{ occupation.modeEnergie }}</b> / 
                                                    <small v-if="occupation.modeEnergie =='index'">{{ occupation.puEnergie }} le KW</small>
                                                    <small v-if="occupation.modeEnergie =='forfait'">{{ occupation.puEnergie }} par mois</small>
                                                </span>       
                                            </b-td>
                                            <b-td>
                                                <b-button id="accessOccupation"  @click.prevent="viewOccupationDetail(occupation)"  :to="{name: 'details-occupation', params: {id: occupation.idOccupation}}" v-b-tooltip.bottom="'Accéder à l\'occupation'"><i class="fa fa-eye"></i></b-button>
                                                <b-button id="accessOccupation"  @click.prevent="viewOccupationDetail(occupation)"  class="ml-1" v-b-tooltip.bottom="'Payer'"><i class="fa fa-user"></i></b-button>
                                                <b-button id="accessOccupation"  @click.prevent="viewOccupationDetail(occupation)"  class="ml-1" v-b-tooltip.bottom="'Recharger le compte'"><i class="fa fa-user"></i></b-button>
                                            </b-td>
                                        </b-tr>-->
                                        <b-tr v-for="(occupation, index) in itemsOccupations" :key="occupation.idOccupation">
                                            <b-td class="p-2">{{ ++index }}</b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mt-1 text-muted">
                                                    {{ occupation.logement.refLogement }}
                                                    <b-badge pill variant="secondary" v-if="occupation.modePaiement == 'prepayer'">Prépayé</b-badge>
                                                    <b-badge pill variant="danger" v-if="occupation.modePaiement == 'postpayer'">Postpayé</b-badge>
                                                </span>
                                            </b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.loyerBase }}</span> 
                                                 <!-- <b-badge variant="success">réglé</b-badge>    -->
                                            </b-td>
                                            <b-td class="p-2">
                                                <span class="d-inline-block w-100 mb-1">
                                                    <span class="d-inline-block w-100 mb-1 font-weight-bold"> {{ occupation.impayerEau }}</span> 
                                                    <b-badge v-if="occupation.modeEau =='index'" pill variant="secondary">
                                                        suivi des index
                                                    </b-badge>
                                                    <b-badge v-if="occupation.modeEau =='forfait'" pill variant="info">
                                                        taux forfaiaire
                                                    </b-badge>
                                                </span>     
                                            </b-td>
                                            <b-td class="p-2">
                                                 <span class="d-inline-block w-100 mb-1">
                                                    <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.impayerEnergie }}</span>  
                                                    <b-badge v-if="occupation.modeEnergie =='index'" pill variant="secondary">
                                                        suivi des index
                                                    </b-badge>
                                                    <b-badge v-if="occupation.modeEnergie =='forfait'" pill variant="info">
                                                        taux forfaiaire
                                                    </b-badge>
                                                </span>      
                                            </b-td>
                                            <b-td>
                                                <b-button id="accessOccupation"  @click.prevent="viewOccupationDetail(occupation)"  :to="{name: 'occupation', params: {id: occupation.idOccupation}}" v-b-tooltip.bottom="$t('data.detail_habitant_facture_tooltip_acceder_occupation')"><i class="fa fa-eye"></i></b-button>
                                                <b-button id="accessOccupation"  @click.prevent="viewOccupationDetail(occupation)"  class="ml-1" v-b-tooltip.bottom="$t('data.occupation_charge_payer')"><i class="fab fa-amazon-pay"></i></b-button>
                                            </b-td>
                                        </b-tr>
                                    </b-tbody>
                                </b-table-simple>
                            </div>
                        </b-row>
                        <paginator hr="top" :offset="offset" :total="itemsOccupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                        


                    </b-container>
                    <b-container fluid v-if="section == 'logements'">
                        <!--<b-row>
                            <b-col cols="6">
                                <span class="d-inline-block w-100 my-1">Pays: <b>{{ logement.adresse.pays }}</b></span>
                                <span class="d-inline-block w-100 my-1">Ville: <b>{{ logement.adresse.ville }}</b></span>
                                <span class="d-inline-block w-100 my-1">Quartier: <b>{{ logement.adresse.quartier }}</b></span>
                            </b-col>
                            <b-col cols="6">
                                <span class="d-inline-block w-100 my-1">Logitude: <b>{{ logement.adresse.lon }}</b></span>
                                <span class="d-inline-block w-100 my-1">Latitue: <b>{{ logement.adresse.lat }}</b></span>
                            </b-col>
                        </b-row>
                        <b-container class="mt-4 p-0"> <GmapMap
                            :center="{lat: parseFloat(logement.adresse.lat), lng: parseFloat(logement.adresse.lon)}" :zoom="14"
                            class="w-100" style="height:340px;"
                        /></b-container>-->
                    </b-container>
                    <!--<div v-if="section == 'logements'">
                        <b-alert variant="info" show v-if="!batiment.logements.length">
                            <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                            <span class="h4 d-inline-flex ml-2">Aucun logement enregistré pour le moment</span>
                        </b-alert>   
                        <div v-else style="height: 75vh;">
                            <paginator no-control hr="bottom" :total="batiment.logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                            <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                                <b-row class="layout-wrap">
                                    <b-col v-for="(logement, i) in items" :key="logement.idLogement || i" cols="6">
                                        <logement @deleted="removeLogement" :logement="logement" is-sub />
                                    </b-col>
                                </b-row>    
                            </div> 
                        </div>       
                    </div>--> 
                    <b-container fluid v-if="section == 'loyers'">
                    <!--- <b-row>
                            <b-col cols="7">
                                <span class="d-inline-block w-100 my-1">Type de logement: <b>{{ logement.sousTypeLogement.libelleSousType }}</b></span>
                                <span class="d-inline-block w-100 my-1">Etat: <b-badge variant="success" v-if="!logement.etatLogement">Libre</b-badge><b-badge variant="danger" v-else>Occupé</b-badge></span>
                            </b-col>
                            <b-col cols="5">
                                <span class="d-inline-block w-100 my-1">Prix minimal: <b>{{ logement.prixMin + ' F' }}</b></span>
                                <span class="d-inline-block w-100 my-1">Prix maximal: <b>{{ logement.prixMax + ' F' }}</b></span>
                            </b-col>
                        </b-row>
                        <div class="jumbotron pt-10 pb-10 mt-2 mb-0"><p>{{ logement.descLogement }}</p></div>
                        <hr/>
                        <div>
                            <b-badge v-for="(c, i) in caracteristiques" :key="i" variant="secondary">{{ c.valeur + ' ' + c.libelleCaracteristique }}</b-badge>
                        </div>-->
                    </b-container>
                    <div v-if="section == 'charges'"  style="height: 75vh; overflow-y: auto; overflow-x: hidden">
                        <!--<b-row>
                            <b-col cols="12" v-for="(annonce, i) in logement.annonces" :key="annonce.idAnnonce || i">
                                <div class="card p-0 shadow">
                                    <div class="card-body p-0 d-flex">
                                        <b-img :src="photos[i] || photos[0]" style="height: 8em; width: 8em"></b-img>
                                        <div class="ml-2 p-2">
                                            <div>
                                                <b-badge :variant="annonce.publish ? 'success' : 'danger'">{{ annonce.publish ? 'Déja publiée' : 'Pas encore publiée' }}</b-badge>
                                                &nbsp;
                                                <b-badge variant="light"><i class="fa fa-clock"></i> Créée le {{ $date(annonce.createdAt).format("DD.MM.YYYY") }} </b-badge>
                                            </div>
                                            <h5 class="my-2"><a href="#" class="text-red ">{{ annonce.titreAnnonce }}</a></h5>
                                            <b-badge v-for="(tag, i) in annonce.tags.split(',')" :key="i" variant="secondary">{{ tag }}</b-badge>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>-->
                        
                    </div>
                    <div v-show="section == 'add-occupation'">
                        <!--<occupation-form :locataire="locataire"  @occupationAdded="addedOccupation" :provenance="provenance" :action="action"/>-->
                        <occupation-form :locataire="locataire"  @occupationAdded="addedOccupation" :provenance="provenance" :action="action"/>

                    </div>  
                </div>
            </div>
        </div>
        <!--TEST MODAL CENTRAL-->
         <!--<modal name="my-first-modal">
              <div>
                    <button @click="$modal.hide('my-first-modal')">
                        
                    </button>
              </div>
                <b-form-group description="Entrez le montant de la recharge" label="Montant à créditer">
                <b-form-input
                    v-model="recharge.montant"
                    type="number"
                    :min="1000"
                    :class="{'is-invalid' : recharge.error}"
                />
                 </b-form-group>
                 <div class="float-right"><b-button @click.prevent="validateRecharge" variant="primary">Valider<b-spinner v-if="recharge.submitted" small></b-spinner></b-button></div>
         </modal>-->
            
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
        /**données manipulées pour le rechargement
         * du compted du locataire
        */
       recharge: {
            enabled: false,
            submitted: false,
            error: false,
            montant: null,
            pay:false
        },
        show:false,
         modalClass: '',
        /**données manipulées pour afficher le modal de recharge
         * du compte du locataire
        */
        showModal: true,
        idOccupation:'',
        /**données manipulées pour effectuer un Transfert
         * intercomptes
         */
        transfert: {
            enabled: false,
            submitted: false,
            compteDebiteur: '',
            compteCredite: '',
            montant: null,
        },
        touslesComptes:[
             { text: 'loyer', value: 'compteLoyer' },
             { text: 'électricité', value: 'compteEnergie' },
             { text: 'eau', value: 'compteEau' }
        ],
        requiredCompteCrediteur:true,
        requiredCompteDebiteur:true
    }),
    computed: {
        itemsOccupations(){
             return php.array_slice(this.locataire.occupations || [], this.offset, this.perPage)
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        },
        comptesfiltres(){
            return this.touslesComptes.map(elt =>{
                if(elt.value!=this.transfert.compteDebiteur)
                return
            })
        }
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
        /**
         * Reinitialise le formulaire de recharge du compte d'un locataire
         */
        resetRechargeForm() {
            this.recharge = {
                enabled: false,
                submitted: false,
                error: false,
                montant: null
            };
        },
        /**
         * ouvre le formulaire de transfert inter-comptes
         */
        callTranfertForm(locataire){
            console.log("locataire 2", locataire)
            this.transfert.enabled = true;
            this.locataire = locataire;
            this.$refs['modal-tranfert'].show()
        },
        /**methode permettant d'ecouter le compte débiteur sélectionné
         * ceci afin de filtrer la liste des comptes à envoyer
         * dans le v-select de selection du compte à crediter
         */
        filterAccountList(a) {
            this.comptesfiltres=[];
            let data = this.touslesComptes;
            /*for (let i = 0; i < this.sousTypesLogements.length; i++) {
                data.push(this.sousTypesLogements[i]);
            }*/
            let result = data.filter(x => x.value != this.transfert.compteDebiteur);
            this.comptesfiltres = result;
            console.log("sous-type",this.comptesfiltres)
        },
        /**
         * valide le transfert -intercomptes pour un locataire donné
         */
        validateTransfert(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.transfert.error = false;

            if (php.empty(this.transfert.montant) || php.empty(this.transfert.compteDebiteur) || php.empty(this.transfert.compteCredite)) {
                this.transfert.error = true;
                return;
            }
            this.transfert.submitted = true;

            axios
                .post(`locataires/${this.locataire.idLocataire}/transfert`, this.transfert)
                .then(response => {
                    //this.getHousing(false);
                    this.resetTransfertForm();
                    return App.notifySuccess(response.message);
                })
                .catch(error => {
                    this.transfert.submitted = false;
                    return App.alertError(error.message);
                });
        },
        /**
         * Reinitialise le formulaire de transfert inter-comptes
         */
        resetTransfertForm() {
            this.transfert = {
                enabled: false,
                submitted: false,
                error: false,
                compteDebiteur: null,
                compteCredite:null,
                montant: null
            };
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