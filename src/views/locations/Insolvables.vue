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
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!insolvables.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun locataire insolvable n'a été trouvé</span>
                    </b-alert> 
                    <b-row v-else>
                        <b-col cols="12" md="3" lg="4" v-for="({habitant, impayerTotal, impayerLoyer, impayerEau, impayerEnergie, impayerCharges}, i) in insolvables" :key="habitant.idLocataire || i">
                            <b-card>
                                <b-row>
                                <b-col sm="auto" class="pr-0">
                                    <b-avatar :src="habitant.avatar" size="6em" />
                                </b-col>
                                <b-col>
                                    <h5 class="text-center">{{ habitant.nomLocataire + ' ' + habitant.prenomLocataire }}</h5>
                                    <h6 class="text-center text-muted">{{ habitant.tel }}</h6>
                                    <h6 class="text-center small text-muted mb-15">{{ habitant.cniLocataire }} / {{ habitant.profession }}</h6>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <hr>
                                    <dl class="row">
                                        <dd class="col-5 my-1">Loyer</dd><dt class="col-7 my-1">{{ impayerLoyer }} F</dt>
                                        <dd class="col-5 my-1">Eau</dd><dt class="col-7 my-1">{{ impayerEau }} F</dt>
                                        <dd class="col-5 my-1">Lumière</dd><dt class="col-7 my-1">{{ impayerEnergie }} F</dt>
                                        <dd class="col-5 my-1">Charges</dd><dt class="col-7 my-1">{{ impayerCharges }} F</dt>
                                        <dd class="col-5 my-1">Total</dd><dt class="col-7 my-1 text-danger h4">{{ impayerTotal }} F</dt>
                                    </dl>
                                    <b-button :to="{name: 'habitants', query: {target: habitant.idLocataire}}" size="sm" block variant="outline-secondary">Voir le dossier du locataire</b-button>
                                </b-col>
                            </b-row>
                            </b-card>
                            
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="insolvables.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>
    </div>
</template>

<script>
import SearchForm from '../../components/parts/SearchForm.vue'
const php  = require ( 'phpjs' ) ; 

export default {
  components: { SearchForm },
    name: 'Insolvables',
    data: () => ({
        insolvables: [],
        trueInsolvables: [],
        search: null,
        showOverlay: true,
        currentPage: 1,
        perPage: 10,
    }),

    watch: {
         search(value) {
      this.insolvables = !php.empty(value)
        ? this.trueInsolvables.filter(elt =>
            elt.nomLocataire.toLowerCase().includes(value.toLowerCase()) || elt.tel.toLowerCase().includes(value.toLowerCase())
          )
        : this.trueInsolvables;
    }
    },
     computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.insolvables, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    beforeMount() {
        this.getInsolvables()
    },
    methods: {
        getInsolvables() {
            axios.get('insolvables').then(response => response.result || []).then(insolvables => {
                this.insolvables = this.trueInsolvables = insolvables
                this.showOverlay = false
                console.log("Insolvables");
                console.log(this.inisolvables);
            })
        }
    }
}
</script>