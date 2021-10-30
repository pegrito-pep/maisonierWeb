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
                        <div class="float-md-right">
                            <div class="d-flex ">
                                <b-form-select class="form-control" size="sm" v-model="periode.mois" :options="mois" />
                                <b-form-select class="form-control" size="sm" v-model="periode.annee" :options="annees" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Vous n'avez défini aucune occupation pour le moment</span>
                    </b-alert> 
                    <b-row v-else>
                        <div class="card-body">
                            <b-table-simple hover small responsive>
                                <b-thead head-variant="light">
                                    <b-tr class="text-center">
                                        <b-th>Logement</b-th>
                                        <b-th>Locataire</b-th>
                                        <b-th>Loyer de base</b-th>
                                        <b-th>Consommation en eau</b-th>
                                        <b-th>Consommation en électricité</b-th>
                                        <b-th>Charges</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="occupation in items" :key="occupation.idOccupation">
                                       <b-td class="px-2 py-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.logement.refLogement }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">
                                                {{ occupation.logement.sousTypeLogement.libelleSousType  }}
                                                <span v-if="occupation.logement.batiment"> / Batiment : {{ occupation.logement.batiment.nomBatiment }}</span>
                                            </span>    
                                        </b-td>
                                        <b-td class="p-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">{{ occupation.locataire.tel + ' / ' + occupation.locataire.email }}</span>    
                                        </b-td>
                                        <b-td class="p-1" v-html="_display_loyer(occupation)"></b-td>
                                        <b-td class="p-1" v-html="_display_consommation(occupation, 'eau')"></b-td>
                                        <b-td class="p-1" v-html="_display_consommation(occupation, 'energie')"></b-td>
                                        <b-td class="p-1" v-html="_display_charge(occupation)"></b-td>
                                        <b-td>
                                            <b-dropdown right >
                                                <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                                                <b-dropdown-item :to="{name: 'occupation', params: {id: occupation.idOccupation}}">Détails de l'occupation</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="doPayment(occupation)">Effectuer un paiement</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="correspondance(occupation)">Correspondance</b-dropdown-item>
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
                        <b-button class="position-fixed validate btn-icon" id="popover-options" variant="danger"><i class="fa fa-bars fa-lg"></i></b-button>
                        <b-popover title="Options" target="popover-options" triggers="click blur" placement="topleft">
                            <div class="py-2">
                                <b-button block variant="outline-secondary" @click.prevent="autoPay" :disabled="submitted">Lancer le paiement automatique<!--  <b-spinner v-if="submitted" small /> --></b-button>
                                <b-button block variant="outline-secondary" @click.prevent="generateCharges" :disabled="submitted">Générer les charges</b-button>
                                <hr>
                                <b-button block variant="outline-secondary" @click.prevent="printList = true">Générer le listing des factures</b-button>
                            </div>
                        </b-popover>
                    </div>
                </b-overlay>
            </div>
        </div>

        <!--MODAL POUR PAYER UNE FACTURE -->
        <div v-if="occupation"><b-modal id="paiement" title="Ajout de paiement" @ok="runPaiement" no-close-on-backdrop ok-only @hidden="resetForm">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted || totalPayerFacture <= 0">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <div class="jumbotron pt-10 pb-10 px-2">
                <h5 class="text-center mb-2">Effectuer un versement pour:</h5>
                <b-row>
                    <b-col><dl>
                        <dt>Logement</dt>
                        <dd>{{ occupation.logement.refLogement }} <br> {{ occupation.logement.sousTypeLogement.libelleSousType  }} <br> <span v-if="occupation.logement.batiment">Batiment : {{ occupation.logement.batiment.nomBatiment }}</span></dd>
                    </dl></b-col>
                    <b-col><dl>
                        <dt>Locataire</dt>
                        <dd>{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }} <br> {{ occupation.locataire.tel }} <br> {{ occupation.locataire.email }}</dd>
                    </dl></b-col>
                </b-row>
            </div>
            <b-row>
                <b-col><b-form-group label="Loyer" :description="'Avance: ' + paiement.avance[0]">
                    <b-form-checkbox v-model="paiement.buy[0]" :disabled="paiement.disabled[0]">Payer <b>{{ paiement.loyer + ' F' }}</b></b-form-checkbox>
                </b-form-group></b-col>
                <b-col><b-form-group label="Charges" :description="'Avance: ' + paiement.avance[3]">
                    <b-form-checkbox v-model="paiement.buy[3]" :disabled="paiement.disabled[3]">Payer <b>{{ paiement.charges + ' F' }}</b></b-form-checkbox>
                </b-form-group></b-col>
            </b-row>
            <b-row>
                <b-col><b-form-group label="Eau" :description="'Avance: ' + paiement.avance[1]">
                    <b-form-checkbox v-model="paiement.buy[1]" :disabled="paiement.disabled[1]">Payer <b>{{ paiement.eau + ' F' }}</b></b-form-checkbox>
                </b-form-group></b-col>
                <b-col><b-form-group label="Lumière" :description="'Avance: ' + paiement.avance[2]">
                    <b-form-checkbox v-model="paiement.buy[2]" :disabled="paiement.disabled[2]">Payer <b>{{ paiement.energie + ' F' }}</b></b-form-checkbox>
                </b-form-group></b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col><b-form-group label="Total à payer" description="Ce prix soustrait les montants avancés par le locataire pour cette facture">
                    <b-form-input disabled :value="totalPayerFacture" />
                </b-form-group></b-col>
                <b-col><b-form-group label="Montant à préléver" description="Entrez le montant versé pour cette facture. Il sera débité du compte de l'occupation">
                    <b-form-input v-model="paiement.payer" :disabled="totalPayerFacture <= 0" />
                </b-form-group></b-col>
            </b-row>
        </b-modal></div>

        <div v-if="occupation"><b-modal id="correspondance" title="Correspondance" no-close-on-backdrop cancel-title="Fermer" ok-title="Imprimer" ok-variant="danger" @ok="(bvtEvt) => {bvtEvt.preventDefault(); printSingle = true}">
            <b-alert v-if="occupation.dateFin" show variant="info" class="text-center">
                <i class="fa fa-exclamation-triangle fa-5x"></i> <br />
                <p class="fa-2x mt-5 pt-2">Bail terminé le {{ $dayjs(occupation.dateFin).format('dddd, DD MMMM YYYY') }}</p>
            </b-alert>
            <printer :display="true" v-else v-model="printSingle" @input="printSingle = false" id="print-correspondance">
                <b-card class="border" >
                    <span class="float-right d-inline-block mb-5">Yaoundé le {{ $dayjs().format('DD MMMM YYYY')}} </span>
                    <br>
                    <div class="clearfix my-3">
                        <span class="text-underline">Object: </span>
                        <b class="fa-lg">Loyer du mois de : {{ _find_periode_loyer(occupation) }}</b>
                    </div>
                    <p>
                        <b>{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }} ({{ occupation.locataire.tel}})</b>,
                        vous occupez le logement <b>{{ occupation.logement.refLogement }} / {{ occupation.logement.sousTypeLogement.libelleSousType  }}</b> situé à 
                        <b>{{ occupation.logement.adresse.ville + ' ' + occupation.logement.adresse.pays + ', ' + occupation.logement.adresse.quartier }}</b>. 
                        <br>
                        Ci-dessous, votre loyer du mois de {{ _find_periode_loyer(occupation) }}
                    </p>
                    <b-table-simple>
                        <b-thead>
                            <b-tr>
                                <b-td></b-td>
                                <b-th>Montant</b-th>
                                <b-th>Avance</b-th>
                                <b-th>Reste</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr>
                                <b-th>Loyer de base</b-th>
                                <b-td>{{ occupation.loyerBase }} F</b-td>
                                <b-td>{{ hasBuyLoyer[1] }} F</b-td>
                                <b-td>{{ occupation.loyerBase - hasBuyLoyer[1] }} F</b-td>
                            </b-tr>
                            <b-tr>
                                <b-th>Charges</b-th>
                                <b-td>{{ hasBuyCharges[2] }} F</b-td>
                                <b-td>{{ hasBuyCharges[1] }} F</b-td>
                                <b-td>{{ hasBuyCharges[2] - hasBuyCharges[1] }} F</b-td>
                            </b-tr>
                            <b-tr>
                                <b-th>Consommation en eau</b-th>
                                <b-td>{{ hasBuyEau[1] }} F</b-td>
                                <b-td>{{ hasBuyEau[2] }} F</b-td>
                                <b-td>{{ hasBuyEau[1] - hasBuyEau[2] }} F</b-td>
                            </b-tr>
                            <b-tr>
                                <b-th>Consommation en électricité</b-th>
                                <b-td>{{ hasBuyEnergie[1] }} F</b-td>
                                <b-td>{{ hasBuyEnergie[2] }} F</b-td>
                                <b-td>{{ hasBuyEnergie[1] - hasBuyEnergie[2] }} F</b-td>
                            </b-tr>
                            <b-tr>
                                <b-th>Total</b-th>
                                <b-td>{{ occupation.loyerBase + hasBuyCharges[2] + hasBuyEau[1] + hasBuyEnergie[1] }} F</b-td>
                                <b-td>{{ hasBuyLoyer[1] + hasBuyCharges[1] + hasBuyEau[2] + hasBuyEnergie[2] }} F</b-td>
                                <b-td>{{ totalQuitance }} F</b-td>
                            </b-tr>
                            <b-tr>
                                <b-th>Net à payer</b-th>
                                <b-td colspan="3">
                                    <b class="fa-lg text-primary">{{ totalQuitance }} F</b>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-card>
            </printer>
        </b-modal></div>

        <!-- IMPRESSIONS -->   
        <printer v-model="printList" @input="printList = false" id="print-liste">
            <h3 class="text-center mb-3">Loyers du mois de <b>{{ $dayjs(this.periodeCourante).format('MMMM YYYY') }}</b></h3>
            <b-table-simple class="mt-4" hover small responsive>
                <b-thead class="border mb-5">
                    <b-tr class="text-center">
                        <b-th valign="middle">Logement</b-th>
                        <b-th valign="middle">Locataire</b-th>
                        <b-th valign="middle">Loyer de base</b-th>
                        <b-th valign="middle">Consommation en eau</b-th>
                        <b-th valign="middle">Consommation en lumière</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr><td colspan="5">&nbsp;</td></b-tr>
                    <b-tr v-for="occupation in trueOccupations" :key="occupation.idOccupation" class="pt-2">
                        <b-td class="px-2 py-1">
                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.logement.refLogement }}</span>    
                            <span class="d-inline-block w-100 mt-1 text-muted">
                                {{ occupation.logement.sousTypeLogement.libelleSousType  }}
                                <span v-if="occupation.logement.batiment"> / Batiment : {{ occupation.logement.batiment.nomBatiment }}</span>
                            </span>    
                        </b-td>
                        <b-td class="p-1">
                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                            <span class="d-inline-block w-100 mt-1 text-muted">{{ occupation.locataire.tel + ' / ' + occupation.locataire.email }}</span>    
                        </b-td>
                        <b-td class="p-1" v-html="_display_loyer(occupation)"></b-td>
                        <b-td class="p-1" v-html="_display_consommation(occupation, 'eau')"></b-td>
                        <b-td class="p-1" v-html="_display_consommation(occupation, 'energie')"></b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </printer>   
    </div>
</template>
<script>
import Printer from '@/components/Printer.vue'
import SearchForm from "@/components/parts/SearchForm.vue";
const php  = require ( 'phpjs' ) ; 

export default {
  name: "loyers",
  components: {
      SearchForm,
      Printer
  },
  data: () => ({
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     occupations:[],
     trueOccupations:[],

     periode: {annee: null, mois: null},
     paiement: { 
        payer: 0, loyer: 0, eau: 0, energie: 0, charges: 0, 
        avance: [0, 0, 0, 0] ,
        buy: [true, false, false, false], disabled: [true, false, false, false], 
    },
     occupation: null,

     submitted: false,
     printList: false,
     printSingle: false
  }),
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.occupations.filter(elt => {
                return (this.$dayjs(this.periodeCourante).diff(elt.dateDeb, 'month') >= 0 && (php.empty(elt.dateFin) || this.$dayjs(elt.dateFin).diff(this.periodeCourante, 'month') <= 0))
            }), this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
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
        mois() {
            const date = new Date, mois = [], 
                current = this.$dayjs().format('YYYY'),
                limit = current == this.periode.annee ? date.getMonth() : 11
            for (let i = 0; i <= limit; i++) {
                date.setMonth(i)
                mois.push({ value: i, text: php.ucfirst(this.$dayjs(date).format('MMMM')) })
            }

            return mois
        },
        periodeCourante() {
            let periodeCourante = this.periode.mois + 1
            if (periodeCourante < 10) {
                periodeCourante = '0'+periodeCourante
            }
            return this.periode.annee + '-' +  periodeCourante + '-01'
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
        },

        hasBuyLoyer() {
            return this._check_if_buy_loyer(this.occupation)
        },
        hasBuyEau() {
            return this._check_if_buy_consommation(this.occupation, 'eau')
        },
        hasBuyEnergie() {
            return this._check_if_buy_consommation(this.occupation, 'energie')
        },
        hasBuyCharges() {
            return this._check_if_buy_charges(this.occupation)
        },
        totalQuitance() {
            return (this.occupation.loyerBase - this.hasBuyLoyer[1]) 
            + 
            (this.hasBuyCharges[2] - this.hasBuyCharges[1]) 
            + 
            (this.hasBuyEnergie[1] - this.hasBuyEnergie[2])
            +
            (this.hasBuyEau[1] - this.hasBuyEau[2])
        }
    },

    beforeMount() {
        this.periode = {
            mois: parseInt(this.$dayjs().format('M')) - 1,
            annee: parseInt(this.$dayjs().format('YYYY'))
        }
        this.getOccupations()
    },
    methods: {
        sendData(){
            
        },
        
    //recupération de la liste des logements
     getOccupations() {
         this.showOverlay = true
            axios.get('occupations').then(response => response.result || []).then(occupations => {
                this.occupations = this.trueOccupations = occupations
                this.showOverlay = false
            })
     },
     
        doPayment(occupation) {
            this.occupation = occupation 

            let [a_payer_loyer, totalPayer] = this._check_if_buy_loyer(occupation)
            this.paiement.loyer = occupation.loyerBase
            this.paiement.avance[0] = totalPayer
            if (totalPayer >= occupation.loyerBase) {
                this.paiement.buy[0] = false
            }

            let [a_payer_eau, consommation_eau, indexeMois_eau] = this._check_if_buy_consommation(occupation, 'eau')
            this.paiement.eau = consommation_eau
            this.paiement.disabled[1] = a_payer_eau == 1
            this.paiement.avance[1] = !php.empty(indexeMois_eau) ? indexeMois_eau.avance : 0

            let [a_payer_energie, consommation_energie, indexeMois_energie] = this._check_if_buy_consommation(occupation, 'energie')
            this.paiement.energie = consommation_energie
            this.paiement.disabled[2] = a_payer_energie == 1
            this.paiement.avance[2] = !php.empty(indexeMois_energie) ? indexeMois_energie.avance : 0

            let [a_payer_charge, totalPayer_charge, totalCharge] = this._check_if_buy_charges(occupation)
            this.paiement.charges = totalCharge
            this.paiement.disabled[3] = a_payer_charge == 1
            this.paiement.avance[3] = totalPayer_charge

            setTimeout(() => {
                this.$bvModal.show('paiement')
            }, 50);
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
                return App.error('Veuillez selectionnez au moins élément à payer')
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
                    this.getOccupations()
                    this.$bvModal.hide('paiement')
                }})
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },

        correspondance(occupation) {
            this.occupation = occupation
            
            setTimeout(() => {
                this.$bvModal.show('correspondance')
            }, 50);
        },

        /**
         * Lance le paiement automatique des facture
         */
        autoPay() {
            this.submitted = true 
            axios.post('loyers/auto-pay', {periode: this.periodeCourante}).then(response => {
                this.submitted = false 
                return App.alertSuccess(response.message, {callback: () => {
                    this.getOccupations()
                }})
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },
        generateCharges() {
            this.submitted = true 
            axios.post('charges/auto-generate', {periode: this.periodeCourante}).then(response => {
                this.submitted = false 
                return App.alertSuccess(response.message, {callback: () => {
                    this.getOccupations()
                }})
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },

        /**
         * calcule et renvoi la consommation mensuelle d'une occupation
         */
        _calcul_consommation(occupation, type)
        {
            const indexes = occupation.indexes.filter(elt => elt.typeIndexe == type),
                mode = { eau: occupation.modeEau, energie: occupation.modeEnergie },
                pu = { eau: occupation.puEau, energie: occupation.puEnergie }
            
            let indexeMois = this.getIndexesPeriode(this.periodeCourante, indexes)[0], consommation = 1        

            if (!indexeMois) {
                consommation = 0
            }
            else if (mode[type] == 'index') {
                consommation = indexeMois.nouveau  - indexeMois.ancien
            }

            return consommation * pu[type]
        },
        _display_consommation(occupation, type) 
        {
            const [a_payer, consommation, avance] = this._check_if_buy_consommation(occupation, type)
            let variant = 'danger', title = 'Impayé'

            if (a_payer == -1) {
                variant = 'secondary'
                title = 'Non consommé'
            }
            else if (a_payer == 2) {
                variant = 'warning'
                title = 'Avancé ' + avance + ' F'
            }
            else if (a_payer == 1) {
                variant = 'success'
                title = 'Payé'
            }

            return `<span class="badge w-100 badge-${variant}">
                <b>${consommation}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },
        _check_if_buy_consommation(occupation, type) {
            const consommation = this._calcul_consommation(occupation, type)
            if (consommation == 0) {
                return [-1, consommation, null]
            }
            const indexes = occupation.indexes.filter(elt => elt.typeIndexe == type)
            if (!php.empty(indexes)) {
                let indexeMois = this.getIndexesPeriode(this.periodeCourante, indexes)[0]
                if (!php.empty(indexeMois)) {
                    if (consommation > indexeMois.avance) {
                        return [2, consommation, indexeMois.avance]
                    }
                    if (consommation <= indexeMois.avance) {
                        return [1, consommation, indexeMois.avance]
                    }   
                }
            }
            return [0, consommation, 0]
        },

        _display_loyer(occupation) {
            const [a_payer, totalPayer] = this._check_if_buy_loyer(occupation)
            let variant = 'danger', title = 'Impayé'
            
            if (a_payer == 2) {
                variant = 'warning'
                title = 'Avancé : ' + totalPayer + ' F'
            }
            else if (a_payer == 1) {
                variant = 'success'
                    title = 'Payé'
            }
            
            return `<span class="badge w-100 badge-${variant}">
                <b>${occupation.loyerBase}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },
        _check_if_buy_loyer(occupation) {
            const loyers = occupation.loyers.filter(e => this.$dayjs(this.periodeCourante).diff(e.periode, 'month') == 0)
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
        },

        _display_charge(occupation) {
            const [a_payer, totalPayer, totalCharge] = this._check_if_buy_charges(occupation)
            let variant = 'danger', title = 'Impayé'
            
            if (a_payer == 2) {
                variant = 'warning'
                title = 'Avancé : ' + totalPayer + ' F'
            }
            else if (a_payer == 1) {
                variant = 'success'
                    title = 'Payé'
            }
            
            return `<span class="badge w-100 badge-${variant}">
                <b>${totalCharge}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },
        _check_if_buy_charges(occupation) {
            const charges = occupation.charges.filter(e => this.$dayjs(this.periodeCourante).diff(this.$dayjs(e.periode).format('YYYY-MM')+'-01', 'month') == 0)
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
        },

        _calcul_total_quitance_facture(occupation) {
            const loyer = parseInt(occupation.loyerBase),
                [a_payer_eau, consoEau] = this._check_if_buy_consommation(occupation, 'eau'),
                [a_payer_energie, consoEnergie] = this._check_if_buy_consommation(occupation, 'energie'),
                [a_payer_loyer, totalPayer] = this._check_if_buy_loyer(occupation),
                [a_payer_charge, totalPayer_charge, totalCharge] = this._check_if_buy_loyer(occupation)

            let total = loyer + consoEnergie + consoEau + totalCharge

            if (a_payer_loyer != 0) {
                total -= totalPayer
            }
            if (a_payer_energie != 0) {
                total -= consoEnergie
            }
            if (a_payer_eau != 0) {
                total -= consoEau
            }
            if (a_payer_charge != 0) {
                total -= totalPayer_charge
            }
            return total
        },

        _find_periode_loyer(occupation) {
            if (occupation.modePaiement == 'prepayer') {
                return this.$dayjs(this.periodeCourante).add(1, 'month').format('MMMM YYYY')
            }
            return this.$dayjs(this.periodeCourante).format('MMMM YYYY')
        },


        getIndexesPeriode(periode, indexes) {
            return indexes.filter(e => this.$dayjs(periode).diff(e.periode, 'month') == 0)
        },

        resetForm() {
            this.paiement = { a_payer: 0, payer: 0, loyer: 0, eau: 0, buy: [true, false, false], disabled: [false, false, false], avance: [0, 0, 0] }
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
button.validate{
    bottom: 1em;
    right: 1em;
    width: 3em;
    height: 3em;
    box-shadow: 3px 1px 1px gray;
}
</style>