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
                        <div class="float-md-right d-flex">
                            <paginatorTop :offset="offset" :libelle='$t("data.logements")' :total="logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" class="mr-2 d-flex justify-content-center align-items-center" />
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
                        <span class="h4 d-inline-flex ml-2">{{$t('data.indexes_pas_de_indexes')}}</span>
                    </b-alert> 
                    <b-row v-else>
                        <b-col lg="3" md="6" sm="12" v-for="logement in items" :key="logement.idLogement" > 
                            <b-card :title="logement.refLogement" :sub-title="logement.sousTypeLogement.libelleSousType" class="position-relative">
                                <div class="row text-white py-1 rounded" style="background: #191c22;">
                                    <p class="col-12 h6">{{$t('data.indexes_du_mois_de')}} {{ $dayjs(periodeCourante).subtract(1, 'month').format('MMMM YYYY') }}</p>
                                    <div class="col-lg-6 col-md-6 col-sm-12">{{$t('data.indexes_eau')}}: <span class="font-weight-bold" style="font-size: 16px"> {{ logement.indexeMois.eau }} </span> </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12">{{$t('data.indexes_electricite')}}: <span class="font-weight-bold" style="font-size: 16px"> {{ logement.indexeMois.energie }} </span></div>
                                </div>
                                <hr>
                                <h6 class="font-weight-bold">{{$t('data.indexes_entrez_nouveaux_indexes')}}</h6>
                                <b-form-group :label="$t('data.indexes_indexes_eau')">
                                    <b-input-group>
                                        <b-form-input size="sm" type="number" min="0" v-model="logement.indexeMois.eau" />
                                        <b-input-group-append>
                                            <b-button size="sm" variant="outline-danger" :id="'popover-eau-'+logement.idLogement"><i class="fa fa-list"></i></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group :label="$t('data.indexes_indexes_electricite')" style="margin-top: -25px;">
                                    <b-input-group>
                                        <b-form-input type="number" min="0" v-model="logement.indexeMois.energie" />
                                        <b-input-group-append>
                                            <b-button variant="outline-danger" :id="'popover-energie-'+logement.idLogement"><i class="fa fa-list"></i></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                                <button @click='submitSingleIndex(logement.idLogement)' class="btn" style="background: #f5365c; color: #fff;">{{$t('data.batiment_form_wizard_bouton_enregistrer')}}</button>
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
                                        <b-form-group :label="$t('data.indexes_mois_passe') +' ('+$dayjs(logement.indexePassee.periode).format('MMMM YYYY')+')'">
                                            <b-form-input size="sm" min="0" type="number" v-model="logement.indexePassee.eau" />
                                        </b-form-group>
                                    </div>
                                </b-popover>
                                <b-popover :title="$t('data.indexes_popover_indexe_precedent')" :target="'popover-energie-'+logement.idLogement" triggers="click blur" placement="auto">
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
                                        <b-form-group :label="$t('data.indexes_mois_passe') +'('+$dayjs(logement.indexePassee.periode).format('MMMM YYYY')+')'">
                                            <b-form-input size="sm" min="0" type="number" v-model="logement.indexePassee.energie" />
                                        </b-form-group>
                                    </div>
                                </b-popover>
                            </b-card>
                        </b-col>
                    </b-row>
                    <hr>
                    <div class="d-flex justify-content-between align-items-start">
                        <paginator :offset="offset" :total="logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" /> 
                        <b-button v-if="canAddIdexes" class="position-fixed validate btn-icon" variant="danger" :disabled="submitted" @click.prevent="submitForm" v-b-tooltip.left="$t('data.cite_valider_cite')"><b-spinner small v-if="submitted" /><i v-else class="fa fa-check fa-lg"></i></b-button>
                    </div>
                </b-overlay>
            </div>
        </div>
        
  </div>
</template>
<script>
    import SearchForm from "@/components/parts/SearchForm.vue";
    const php  = require ( 'phpjs' ) ; 

export default {
  name: "releves-indexes",
  components: {
      SearchForm,
  },
  data: () => ({
    search: null,
    showOverlay: true,
    submitted: false,
    currentPage: 1,
    perPage: 10,
    logements:[],
    trueLogements:[],
    periode: {annee: null, mois: null},
    permissions: storage.get("userPermissions")
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
        canAddIdexes(){
            if(this.permissions.includes("add_indexes")){
                return true;
            }
            return false;
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
                mois.push({ value: i, text: this.$dayjs(date).format('MMM') })
            }

            return mois
        },
        periodeCourante() {
            let periode = this.periode.mois + 1
            if (periode < 10) {
                periode = '0'+periode
            }
            return this.periode.annee + '-' +  periode + '-01'
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

        submitSingleIndex(idLogement){
            this.submitForm(idLogement, true)
        },

        submitForm(idLogement= null, isSingle=false) {
            this.submitted = true 

            let periode = this.periode.mois + 1
            if (periode < 10) {
                periode = '0' + periode
            }
            periode = this.periode.annee + '-' + periode + '-01'
            let data = { periode, indexes: [] }

            if (isSingle){
                let single = this.trueLogements.filter(logement => logement.idLogement === idLogement)[0];
                data.indexes.push({
                    idLogement: single.idLogement,
                    eau: [single.indexeMois.eau, single.indexePassee.eau],
                    energie: [single.indexeMois.energie, single.indexePassee.energie]
                })
            }
            else{
                this.trueLogements.forEach(elt => {
                    if (null != elt.indexeMois.eau || null != elt.indexeMois.energie) {
                        data.indexes.push({
                            idLogement: elt.idLogement,
                            eau: [elt.indexeMois.eau, elt.indexePassee.eau],
                            energie: [elt.indexeMois.energie, elt.indexePassee.energie]
                        })
                    }
                });
            }
            console.log('data',data);
            axios.post('indexes/add-multiple', data).then(response => {
                App.notifySuccess(response.message)
                this.showOverlay = true 
                this.submitted = false
                this.getLogements()
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message || 'Impossible de joindre le serveur')
            });
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
                let indexesCourants = elt.indexes.filter(e => this.$dayjs(periode).diff(e.periode, 'month') == 0).sort((a, b) => b.idIndexe - a.idIndexe),
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
                    energie: php.empty(iEnergie) ? null: iEnergie.nouveau,
                    periode: periodePassee
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

<style scoped>
button.validate{
    bottom: 1em;
    right: 1em;
    width: 3em;
    height: 3em;
    box-shadow: 3px 1px 1px gray;
}
</style>