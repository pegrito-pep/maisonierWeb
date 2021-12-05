<template>
    <div class="container-fluid">
        <!--page header start -->
        <page-description :title="$t('data.occupation_loyers')" :description="$t('data.charge_description')" icon="list" :path="['Finances', 'Loyers']" />
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <form action="" onSubmit="return false">
                                    <input type="text" class="form-control" placeholder="Recherche..." v-model="search">
                                    <button type="submit" class="btn btn-icon"><i class="ik ik-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="float-md-right">
                            <div class="d-flex ">
                                <b-form-select class="form-control" size="sm" @input="(value) => setIndexesMois(value, periode.annee)" v-model="periode.mois" :options="mois"></b-form-select>
                                <b-form-select class="form-control" size="sm" @input="(value) => setIndexesMois(periode.mois, value)" v-model="periode.annee" :options="annees"></b-form-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">{{$t('data.charge_pas_de_occupations')}}</span>
                    </b-alert> 
                    <b-row v-else>
                        <div class="card-body">
                            <b-table-simple hover small responsive>
                                <b-thead head-variant="light">
                                    <b-tr class="text-center">
                                        <b-th>{{$t('data.detail_habitant_logement')}}</b-th>
                                        <b-th>{{$t('data.occupation_locataire')}}</b-th>
                                        <b-th>{{$t('data.charge_loyer_de_base')}}</b-th>
                                        <b-th>{{$t('data.charge_consommation_en_eau')}}</b-th>
                                        <b-th>{{$t('data.charge_consommation_en_lumiere')}}</b-th>
                                        <b-th>{{$t('data.batiment_form_label_action')}}</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="occupation in items" :key="occupation.idOccupation">
                                       <b-td class="px-2 py-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.logement.refLogement }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">
                                                {{ occupation.logement.sousTypeLogement.libelleSousType  }}
                                                <span v-if="occupation.logement.batiment"> / {{$t('data.logement_batiment_lie_au_clonage_label')}} : {{ occupation.logement.batiment.nomBatiment }}</span>
                                            </span>    
                                        </b-td>
                                        <b-td class="p-1">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">{{ occupation.locataire.tel + ' / ' + occupation.locataire.email }}</span>    
                                        </b-td>
                                        <b-td class="p-1" v-html="_display_loyer(occupation)"></b-td>
                                        <b-td class="p-1" v-html="_display_consommation(occupation, 'eau')"></b-td>
                                        <b-td class="p-1" v-html="_display_consommation(occupation, 'energie')"></b-td>
                                        <b-td>
                                            <b-dropdown right >
                                                <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                                                <b-dropdown-item :to="{name: 'details-occupation', params: {id: occupation.idOccupation}}">{{$t('data.logement_detail_details_de_occupation')}}</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="doPayment(occupation)">{{$t('data.charge_effectuer_un_paiement')}}</b-dropdown-item>
                                                <b-dropdown-item href="#" @click.prevent="correspondance(occupation)">{{$t('data.charge_correspondance')}}</b-dropdown-item>
                                            </b-dropdown>                                            
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>

        <!--MODAL POUR AJOUTER OU MODIFIER UNE OCCUPATION-->
        <div v-if="occupation"><b-modal id="paiement" :title="$t('data.charge_ajouter_paiement')" size="lg" no-close-on-backdrop ok-only :ok-title="$t('data.cite_valider_cite')" ok-variant="danger">
            <div class="jumbotron pt-10 pb-10 px-2">
                <h4 class="text-center">{{$t('data.charge_effectuer_versement_pour')}}:</h4>
                <b-row>
                    <b-col><dl>
                        <dt>{{$t('data.detail_habitant_logement')}}</dt>
                        <dd>{{ occupation.logement.refLogement }} / {{ occupation.logement.sousTypeLogement.libelleSousType  }} <br> <span v-if="occupation.logement.batiment">{{$t('data.occupation_batiment')}} : {{ occupation.logement.batiment.nomBatiment }}</span></dd>
                    </dl></b-col>
                    <b-col><dl>
                        <dt>{{$t('data.occupation_locataire')}}</dt>
                        <dd>{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }} <br> {{ occupation.locataire.tel + ' / ' + occupation.locataire.email }}</dd>
                    </dl></b-col>
                </b-row>
             
            </div>
            <b-row>
                <b-col>
                    <h5 class="border-bottom mb-3">{{$t('data.charge_paiement_loyer')}}</h5>
                    <b-form-group :label="$t('data.charge_label_type_paiement_loyer')" :description="$t('data.charge_label_type_paiement_loyer_description')">
                        <b-form-select :options="[
                            {text: 'Selectionnez une méthode', value: null, disabled: true},
                            {text: 'Payer en espèce', value: 'espece'},
                            {text: 'Payer à partir du compte loyer', value: 'loyer'},
                        ]" v-model="paiement.type" />
                    </b-form-group>
                    <b-form-group label="Montant" description="Combien doit-on verser">
                        <b-form-input type="number" v-model="paiement.loyer" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <h5 class="border-bottom mb-3">Paiement de l'eau</h5>
                    <b-form-group label="Type de paiement" description="Par quel canal doit-on effectuer le paiement">
                        <b-form-select :options="[
                            {text: 'Selectionnez une méthode', value: null, disabled: true},
                            {text: 'Payer en espèce', value: 'espece'},
                            {text: 'Payer à partir de compte eau', value: 'eau'},
                        ]" v-model="paiement.type" />
                    </b-form-group>
                    <b-form-group label="Montant" description="Combien doit-on verser">
                        <b-form-input type="number" v-model="paiement.eau" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <h5 class="border-bottom mb-3">Paiement de la lumière</h5>
                    <b-form-group label="Type de paiement" description="Par quel canal doit-on effectuer le paiement">
                        <b-form-select :options="[
                            {text: $t('data.charge_label_selectionner_methode'), value: null, disabled: true},
                            {text: $t('data.charge_label_payer_en_espece'), value: 'espece'},
                            {text: $t('data.charge_label_payer_par_compte_lumiere'), value: 'energie'},
                        ]" v-model="paiement.type" />
                    </b-form-group>
                    <b-form-group :label="$t('data.occupation_montant')" :description="$t('data.charge_label_combien_doit_on_verser')">
                        <b-form-input type="number" v-model="paiement.energie" disabled />
                    </b-form-group>
                </b-col>
            </b-row>
        </b-modal></div>

        <div v-if="occupation"><b-modal id="correspondance" :title="$t('data.charge_correspondance')" no-close-on-backdrop ok-only :ok-title="$t('data.logement_form_fermer')" ok-variant="secondary">
            <b-alert v-if="occupation.dateFin" show variant="info" class="text-center">
                <i class="fa fa-exclamation-triangle fa-5x"></i> <br />
                <p class="fa-2x mt-5 pt-2">{{$t('data.logement_detail_bail_termine_le')}} {{ $dayjs(occupation.dateFin).format('dddd, DD MMMM YYYY') }}</p>
            </b-alert>
            <div v-else>
                <b-card class="border" >
                    <span class="float-right d-inline-block mb-5">{{$t('data.charge_label_yaounde_le')}} {{ $dayjs().format('DD MMMM YYYY')}} </span>
                    <br>
                    <div class="clearfix my-3">
                        <span class="text-underline">{{$t('data.charge_label_objet')}}: </span>
                        <b class="fa-lg">{{$t('data.charge_label_loyer_du_mois_de')}} : {{ _find_periode_loyer(occupation) }}</b>
                    </div>
                    <p>
                        <b>{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }} ({{ occupation.locataire.tel}})</b>,
                        {{$t('data.charge_label_vous_occuper_le_logement')}} <b>{{ occupation.logement.refLogement }} / {{ occupation.logement.sousTypeLogement.libelleSousType  }}</b>{{$t('data.charge_label_vous_occuper_le_logement_situe_a')}}
                        <b>{{ occupation.logement.adresse.ville + ' ' + occupation.logement.adresse.pays + ', ' + occupation.logement.adresse.quartier }}</b>. 
                        <br>
                        {{$t('data.charge_label_ci_dessous_le_loyer_du_mois')}} {{ _find_periode_loyer(occupation) }}
                    </p>
                    <b-table-simple>
                        <b-tbody>
                            <b-tr><b-th>{{$t('data.charge_loyer_de_base')}}</b-th><b-td>{{ occupation.loyerBase }} F</b-td></b-tr>
                            <b-tr><b-th>{{$t('data.charge_consommation_en_eau')}}</b-th><b-td>{{ _calcul_consommation(occupation, 'eau') }} F</b-td></b-tr>
                            <b-tr><b-th>{{$t('data.charge_consommation_en_lumiere')}}</b-th><b-td>{{ _calcul_consommation(occupation, 'energie') }} F</b-td></b-tr>
                            <b-tr><b-th>{{$t('data.ionsolvable_total_insolvable')}}</b-th><b-td><b class="fa-2x text-primary">
                                {{ parseInt(occupation.loyerBase) + _calcul_consommation(occupation, 'energie') + _calcul_consommation(occupation, 'eau') }} F    
                            </b></b-td>
                        </b-tr>
                        </b-tbody>
                        
                    </b-table-simple>
                </b-card>
            </div>
        </b-modal></div>
        
  </div>
</template>
<script>

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-occupations",
  data: () => ({
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     occupations:[],
     trueOccupations:[],

     periode: {annee: null, mois: null},
     paiement: { type: null, loyer: 0, eau: 0 },
     occupation: null,
  }),
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.occupations.filter(elt => {
                return (this.$dayjs(elt.dateDeb).diff(this.periodeCourante, 'month') >= 0 && (php.empty(elt.dateFin) || this.$dayjs(elt.dateFin).diff(this.periodeCourante, 'month') <= 0))
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
            axios.get('occupations').then(response => response.result || []).then(occupations => {
                this.occupations = this.trueOccupations = occupations
                this.showOverlay = false
            })
     },
     
        doPayment(occupation) {
            this.occupation = occupation
            this.paiement.loyer = occupation.loyerBase
            this.paiement.eau = this._calcul_consommation(occupation, 'eau')
            this.paiement.energie = this._calcul_consommation(occupation, 'energie')

            setTimeout(() => {
                this.$bvModal.show('paiement')
            }, 50);
        },
        correspondance(occupation) {
            this.occupation = occupation
            
            setTimeout(() => {
                this.$bvModal.show('correspondance')
            }, 50);
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
            const consommation = this._calcul_consommation(occupation, type)

            let variant = 'danger', title = 'Impayé'
            if (consommation == 0) {
                variant = 'secondary'
                title = 'Non consommé'
            }

            return `<span class="badge w-100 badge-${variant}">
                <b>${consommation}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },
        _display_loyer(occupation) {
            const loyers = occupation.loyers.filter(e => this.$dayjs(this.periodeCourante).diff(e.periode, 'month') == 0)

            let variant = 'danger', title = 'Impayé'
            if (loyers.length) {
                const totalPayer = loyers.reduce((accumulator, curr) => accumulator + curr.montantPayer)
                if (totalPayer != 0) {
                    if (totalPayer < occupation.loyerBase) {
                        variant = 'warning'
                        title = 'Avancé : ' + totalPayer + ' F'
                    }
                    else {
                        variant = 'success'
                        title = 'Payé'
                    }
                }
            }

            return `<span class="badge w-100 badge-${variant}">
                <b>${occupation.loyerBase}</b> F <br>
                <span class="small">${title}</span>
            </span>`
        },

        _find_periode_loyer(occupation) {
            if (occupation.modePaiement == 'prepayer') {
                return this.$dayjs(this.periodeCourante).add(1, 'month').format('MMMM YYYY')
            }
            return this.$dayjs(this.periodeCourante).format('MMMM YYYY')
        },


        getIndexesPeriode(periode, indexes) {
            return indexes.filter(e => this.$dayjs(periode).diff(e.periode, 'month') == 0)
        }
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
</style>
