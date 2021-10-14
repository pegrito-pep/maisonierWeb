<template>
  <div class="container-fluid">
    <!--page header start -->
    <page-description title="Rélévés d'indexes" description="Rélévés des indexes d'eau et d'énergie" icon="clipboard-list" :path="['Finance', 'Rélévés d\'indexes']" />
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
                    <b-alert variant="info" class="text-center" show v-if="!logements.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Vous n'avez défini aucun logement pour le moment</span>
                    </b-alert> 
                    <b-row v-else>
                        <b-col cols="3" v-for="logement in items" :key="logement.idLogement"> 
                            <b-card :title="logement.refLogement" :sub-title="logement.sousTypeLogement.libelleSousType">
                                <hr>
                                <b-form-group label="Indexe eau">
                                    <b-input-group>
                                        <b-form-input size="sm" type="number" min="0" v-model="logement.indexeMois.eau" />
                                        <b-input-group-append>
                                            <b-button size="sm" variant="outline-danger" :id="'popover-eau-'+logement.idLogement"><i class="fa fa-list"></i></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group label="Indexe lumière">
                                    <b-input-group>
                                        <b-form-input type="number" min="0" v-model="logement.indexeMois.energie" />
                                        <b-input-group-append>
                                            <b-button variant="outline-danger" :id="'popover-energie-'+logement.idLogement"><i class="fa fa-list"></i></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>

                                <b-popover title="Indexes précedents" :target="'popover-eau-'+logement.idLogement" triggers="click blur" placement="auto">
                                    <div style="overflow-y:auto; overflow-x: hidden; max-height: 15em">
                                        <div v-for="(indexe, i) in logement.iEau" :key="i" class="text-muted mb-1">
                                            <h6 class="border-bottom small">{{ $dayjs(indexe.periode).format('MMMM YYYY') }}</h6>
                                            <b-row>
                                                <b-col class="truncate">N: <b>{{ indexe.nouveau }}</b> m<sup>3</sup></b-col>
                                                <b-col class="truncate">A: <b>{{ indexe.ancien }}</b> m<sup>3</sup></b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                    <div class="jumbotron pt-10 pb-1 px-2 mb-0 mt-2">
                                        <b-form-group label="Mois passé"><b-form-input size="sm" min="0" type="number" v-model="logement.indexePassee.eau" /></b-form-group>
                                    </div>
                                </b-popover>
                                <b-popover title="Indexes précedents" :target="'popover-energie-'+logement.idLogement" triggers="click blur" placement="auto">
                                    <div style="overflow-y:auto; overflow-x: hidden; max-height: 15em">
                                        <div v-for="(indexe, i) in logement.iEnergie" :key="i" class="text-muted mb-1">
                                            <h6 class="border-bottom small">{{ $dayjs(indexe.periode).format('MMMM YYYY') }}</h6>
                                            <b-row>
                                                <b-col class="truncate">N: <b>{{ indexe.nouveau }}</b> kw</b-col>
                                                <b-col class="truncate">A: <b>{{ indexe.ancien }}</b> kw</b-col>
                                            </b-row>
                                        </div>
                                    </div>
                                    <div class="jumbotron pt-10 pb-1 px-2 mb-0 mt-2">
                                        <b-form-group label="Mois passé"><b-form-input size="sm" min="0" type="number" v-model="logement.indexePassee.energie" /></b-form-group>
                                    </div>
                                </b-popover>
                            </b-card>
                        </b-col>
                    </b-row>
                    <hr>
                    <div class="d-flex justify-content-between align-items-start">
                        <paginator :offset="offset" :total="logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" /> 
                        <b-button variant="danger" :disabled="submitted" @click.prevent="submitForm">Valider <b-spinner small v-if="submitted" /></b-button>

                    </div>
                </b-overlay>
            </div>
        </div>
        
  </div>
</template>
<script>
  const php  = require ( 'phpjs' ) ; 

export default {
  name: "releves-indexes",
  data: () => ({
    search: null,
    showOverlay: true,
    submitted: false,
    currentPage: 1,
    perPage: 10,
    logements:[],
    trueLogements:[],


    popoverShow: false,
    periode: {annee: null, mois: null}

  }),
    watch: {
        search(value) {
            this.logements = !php.empty(value) ? this.trueLogements.filter(elt => elt.refLogement.toLowerCase().includes(value.toLowerCase())) : this.trueLogements
        }
    },
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.logements, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        },


        annees() {
            const current = this.$dayjs().format('YYYY')
            let annees = [current]

            for (let i = current; i > (current - 15); i--) {
                if (i != current) {
                    annees.push(i)
                    annees.push(i + 15)
                }
            }
            
            return annees.sort((a, b) => a - b)
        },
        mois() {
            let date = new Date, 
                mois = []
            for (let i = 0; i < 12; i++) {
                date.setMonth(i)
                mois.push({ value: i, text: php.ucfirst(this.$dayjs(date).format('MMMM')) })
            }

            return mois
        }
    },

    beforeMount() {
        this.periode = {
            mois: parseInt(this.$dayjs().format('M')) - 1,
            annee: parseInt(this.$dayjs().format('YYYY'))
        }
        this.getLogements()
    },
    methods: {
        onClose() {
            this.popoverShow = false
        },

        //recupération de la liste des logements
        getLogements() {
            axios.get('logements').then(response => response.result || []).then(logements => {
                
                this.logements = this.trueLogements = logements
                
                this.setIndexesMois(this.periode.mois, this.periode.annee)
                this.showOverlay = false
            })
        },

        submitForm() {
            this.submitted = true 

            let periode = this.periode.mois + 1
            if (periode < 10) {
                periode = '0' + periode
            }
            periode = this.periode.annee + '-' + periode + '-01'
            let data = { periode, indexes: [] }

            this.trueLogements.forEach(elt => {
                if (null != elt.indexeMois.eau || null != elt.indexeMois.energie) {
                    data.indexes.push({
                        idLogement: elt.idLogement,
                        eau: [elt.indexeMois.eau, elt.indexePassee.eau],
                        energie: [elt.indexeMois.energie, elt.indexePassee.energie]
                    })
                }
            })

            axios.post('indexes/add-multiple', data).then(response => {
                App.notifySuccess(response.message)
                this.showOverlay = true 
                this.submitted = false
                this.getLogements()
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message || 'Impossible de joindre le serveur')
            })
        },
        
        
        setIndexesMois(mois, annee) {
            let periodeCourante = mois + 1
            if (periodeCourante < 10) {
                periodeCourante = '0'+periodeCourante
            }
            periodeCourante = annee + '-' +  periodeCourante + '-01'

            this.trueLogements = this.setIndexesPeriode(periodeCourante, this.trueLogements)
            this.logements = this.setIndexesPeriode(periodeCourante, this.logements)
        },
        setIndexesPeriode(periode, logements) {
            let periodePassee = this.$dayjs(periode).subtract(1, 'month').format('YYYY-MM')+'-01'

            return logements.map(elt => {
                let indexesCourants = elt.indexes.filter(e => this.$dayjs(periode).diff(e.periode, 'month') == 0),
                    iEau = indexesCourants.find(e => e.typeIndexe == 'eau'),
                    iEnergie = indexesCourants.find(e => e.typeIndexe == 'energie')
                  
                elt.indexeMois = {
                    eau: php.empty(iEau) ? null : iEau.nouveau,
                    energie: php.empty(iEnergie) ? null: iEnergie.nouveau
                }

                indexesCourants = elt.indexes.filter(e => this.$dayjs(periodePassee).diff(e.periode, 'month') == 0)
                iEau = indexesCourants.find(e => e.typeIndexe == 'eau')
                iEnergie = indexesCourants.find(e => e.typeIndexe == 'energie')
                    
                elt.indexePassee = {
                    eau: php.empty(iEau) ? null : iEau.nouveau,
                    energie: php.empty(iEnergie) ? null: iEnergie.nouveau
                }

                indexesCourants = elt.indexes.filter(e => (this.$dayjs(periodePassee).diff(e.periode, 'month') > 0 && e.nouveau > 0))
                elt.iEau = indexesCourants.filter(e => e.typeIndexe == 'eau')
                elt.iEnergie = indexesCourants.filter(e => e.typeIndexe == 'energie')

                return elt
            })
        }
    }

};
</script>
