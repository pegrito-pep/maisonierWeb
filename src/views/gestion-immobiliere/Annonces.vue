<template>
    <div class="container-fluid">
        <!--page header start -->
        <page-description title="Annonces" description="Gestion de vos annonces" icon="ad" :path="['Gestion immobilière', 'Mes annonces']" />
        
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
                            <b-button variant="danger"  @click.prevent="addAnnonce"  v-b-modal.modal-lg><i class="fa fa-plus-circle"></i> Nouvelle Annonce</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!annonces.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucune annonce crée pour le moment</span>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(annonce, i) in items" :key="annonce.idAnnonce || i" cols="6" class="animated flipInX mb-4">
                            <annonce-component @makeUpdate="updateAnnonce" @deleted="removeAnnonce" :annonce="annonce" @showDetails="showDetails" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="annonces.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>
  
        <add-annonce v-if="commandeAnnonce" action="add" @annonceAdded="addedAnnonce" />
    </div>
</template>
<script>
  import AddAnnonce from "@/components/_gestion-immobiliere/AddAnnonce.vue";
  import AnnonceComponent from '@/components/_gestion-immobiliere/Annonce.vue'

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-logements",
  components: {
    AddAnnonce,
    AnnonceComponent
  },
   watch: {
        search(value) {
            this.annonces = !php.empty(value) ? this.trueAnnonces.filter(elt => elt.titreAnnonce.toLowerCase().includes(value.toLowerCase())) : this.trueAnnonces
        }
    },
  data: () => ({
      action:"add",
     commandeAnnonce:false,
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     annonces:[],
     trueAnnonces:[]

  }),
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.annonces, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },

    beforeMount() {
        this.getAnnonces()
    },
    mounted(){
        this.$root.$on("annonceAdded", () => {
            this.getAnnonces();
            this.commandeAnnonce=false;
        });
        this.$root.$on("annonce-published-ok", () => {
            this.getAnnonces();
        });
    },
    methods: {
        addAnnonce(){
            this.action="add";
            this.commandeAnnonce=true;
        },
        addedAnnonce() {
            this.getAnnonces();
            this.commandeAnnonce=false;
        },
    
        //recupération de la liste des logements
        async getAnnonces() {
            try {
                this.annonces = this.trueAnnonces = await axios.get('annonces?my=true').then(response => response.result)
                console.log(this.annonces);
                this.showOverlay = false
            } catch (error) {
                
            }
        },
     updateAnnonce(annonce) {
           console.log("logement",logement)
      },
      removeAnnonce(annonce) {
           console.log("annonce",annonce)
      },
      showDetails(annonce) {
           console.log("annonce",annonce)
      }
      
    
    
  }

};
</script>
<style scoped>
     .max-H{
         height:450px;
     }
</style>