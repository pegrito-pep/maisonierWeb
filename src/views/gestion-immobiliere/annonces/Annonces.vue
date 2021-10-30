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
                            <btnAdd  message="Nouvelle Annonce" v-b-modal.annonceForm />
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                    <b-overlay :show="showOverlay" rounded="sm">
                        <b-alert variant="info" class="text-center" show v-if="!annonces.length">
                            <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                            <span class="h4 d-inline-flex ml-2">Aucune annonce créée pour le moment</span>
                        </b-alert> 
                        <b-row v-else class="layout-wrap">
                            <b-col v-for="(annonce, i) in items" :key="annonce.idAnnonce || i" sm="12" md="6" lg="3" class="animated flipInX mb-4">
                                <annonce-component @makeDuplication="duplicateAnnonce" @makeUpdate="updateAnnonce" @deleted="removeAnnonce" :annonce="annonce" @showDetails="showDetails" />
                            </b-col>
                        </b-row>
                        <paginator hr="top" :offset="offset" :total="annonces.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                    </b-overlay>
                </div>
        </div>

                <!-- MODALE POUR AFFICHER LES DETAILS D'UNE ANNONCE -->
        <div v-if="annonce" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Détails de l'annonce : <b>{{ annonce.titreAnnonce }}</b>.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-annonce  :annonce="annonce" />
                    </div>
                </div>
            </div>
        </div>
  
        <!--MODAL POUR AJOUTER OU MODIFIER UNE ANNONCE-->
            <b-modal id="annonceForm" size="lg" hide-footer no-close-on-backdrop>
            <template #modal-title>
            <span class="ml-4 text-form-annone">{{ title }}</span>
            </template>
            <div>
                <annonce-form @annonceAdded="pushAnnonce" @annonceUpdated="editAnnonces" @createLogementFirst="goToLogement" :action="action" :editAnnonce="editAnnonce"/>
            </div>
            </b-modal>

        <!--MODAL POUR DUPLIQUER UNE ANNONCE -->
           <div v-if="annonce">
                <b-modal
                    v-model="duplication.enabled"
                   
                    @ok="validateDuplication"
                    @hidden="resetDuplicationForm"
                >
                    <template #modal-title>
                         Dupplication de l'annonce de titre <br><code>"{{ annonce.titreAnnonce }}"</code>
                    </template>
                    <template #modal-footer="{ ok }">
                    <b-button size="sm" variant="danger" @click="ok()" :disabled="duplication.submitted">
                        Valider
                        <b-spinner v-if="duplication.submitted" small />
                    </b-button>
                    </template>
                    <div class="jumbotron pt-10 pb-10">
                    <!--<p>La duplication de cette annonce consistera à l'appliquer à tous les logements du batiment auquel cette dernière est liée.
                        Pour notre cas, il s'agit de tous les logements du batiments<span>{{ annonce.logement.batiment.nomBatiment }}</span>
                    </p>-->
                    <p>La duplication de cette annonce consistera à l'appliquer à tous les logements du batiment auquel cette dernière est liée.
                        Pour notre cas, il s'agit de tous les logements du batiment
                    </p>
                    </div>
                    <!--<b-form-group description="Entrez le nombre de logement à générer" label="Nombre de clone">
                    <b-form-input
                        v-model="clone.nbr"
                        type="number"
                        :min="1"
                        :class="{'is-invalid' : duplication.error}"
                    />
                    </b-form-group>-->
                    <!--<b-form-group
                    description="Selectionnez le batiment auquel sera rataché les logements générés"
                    label="Batiment"
                    >
                    <b-form-select v-model="duplication.idBatiment">
                        <b-form-select-option :value="null">Pas de batiment</b-form-select-option>
                        <b-form-select-option-group v-for="(c, i) in cites" :key="i" :label="c.nomCite">
                        <b-form-select-option
                            v-for="(b, j) in c.batiments"
                            :key="j"
                            :value="b.idBatiment"
                        >{{ b.nomBatiment }}</b-form-select-option>
                        </b-form-select-option-group>
                    </b-form-select>
                    </b-form-group>-->
                </b-modal>
    </div>
    </div>
</template>
<script>
  import AnnonceForm from "./AnnonceForm.vue";
  import AnnonceComponent from './Annonce.vue';
  import DetailsAnnonce from './DetailsAnnonce.vue'
  import SearchForm from "@/components/parts/SearchForm.vue";

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-logements",
  components: {
    AnnonceForm,
    AnnonceComponent,
    SearchForm,
    DetailsAnnonce
  },
   watch: {
    search(value) {
        this.annonces = !php.empty(value) ? this.trueAnnonces.filter(elt => elt.titreAnnonce.toLowerCase().includes(value.toLowerCase())) : this.trueAnnonces
    }
    },
  data: () => ({
    action:"add",
    search: null,
    showOverlay: true,
    currentPage: 1,
    perPage: 10,
    annonces:[],
    trueAnnonces:[],
    title:'créer une annonce',
    duplication:{
      enabled: false,
      submitted: false,
      error: false,
      idBatiment: null
    },
    annonce: null,
    editAnnonce:null
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
        /*this.$root.$on("annonceAdded", () => {
            this.getAnnonces();
            this.commandeAnnonce=false;
        });*/
        this.$root.$on("annonce-published-ok", () => {
           
            this.getAnnonces();
            
        });


    },
    methods: {
        /**ecoute de l'évènement d'ajout d'une annonce et mise à jour
         * de la liste des annonces
         * 
         */
        pushAnnonce(){
            this.getAnnonces();
            this.$bvModal.hide('annonceForm')
        },
        addedAnnonce() {
            this.getAnnonces();
        },
         /**
         * Affiche les details d'un batiment
         * 
         * @param {Object} annonce
         */
        showDetails(annonce) {
            this.annonce = annonce
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.annonce = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.annonce = null
                })
            }, 100)          
        },
    
        //recupération de la liste des logements
        async getAnnonces() {
        
            try {
                this.annonces = this.trueAnnonces = await axios.get('annonces?my=true').then(response => response.result)
                console.log("=================================");
                console.log(this.annonces);
                console.log("=================================");
                this.showOverlay = false
            } catch (error) {
                
            }
        },
     updateAnnonce(annonce) {
        console.log('annonce',annonce)
        this.action = 'edit'
        this.title='edition de l\'annonce "'+annonce.titreAnnonce+'"'
        this.editAnnonce = annonce
        this.$bvModal.show('annonceForm')
      },
        /**
         * Retire une annonce de la pile des annonces
         * 
         * @param {Integer} idAnnonce
         */
        removeAnnonce(idAnnonce) {
            this.annonces = this.annonces.filter(elt => elt.idAnnonce != idAnnonce)
            this.trueAnnonces = this.trueAnnonces.filter(elt => elt.idAnnonce != idAnnonce)
        },
      /**ecoute évènement émis;
       * fermetire formulmaire de création d'une annonce
       * redirection vers la création d'un logement
       */
      goToLogement(){
          this.$bvModal.hide('annonceForm');
          setTimeout(() => {
                this.$router.push({name: 'logements', query: {target: "call-logement"}}) 
            }, 50);
      },
     /**
     * Ouvre le formulaire de duplication d'une annonce
     */
     duplicateAnnonce(annonce) {
      this.duplication.enabled = true;
      //this.duplication.idBatiment = annonce.idBatiment;
      this.annonce = annonce;
    },

    /**
     * valide la duplication d'une annonce
     */
    validateDuplication(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.duplication.error = false;

      /*if (php.empty(this.clone.nbr) || this.clone.nbr < 1) {
        this.duplication.error = true;
        return;
      }*/
      this.duplication.submitted = true;

      axios
        .post(`annonces/${this.annonce.idAnnonce}/duplicate`, this.duplication)
        .then(response => {
          this.getAnnonces
          this.resetDuplicationForm();
          return App.notifySuccess(response.message);
        })
        .catch(error => {
          this.duplication.submitted = false;
          return App.alertError(error.message);
        });
    },
    /**
     * Reinitialise le formulaire de duplication
     */
    resetDuplicationForm() {
      this.duplication = {
        enabled: false,
        submitted: false,
        error: false,
        idBatiment: null
      };
    },

    /**
     * ecoute edition annonce ok
     */
    /*editAnnonces(annonce){
         this.annonces = this.renameAnnonces(this.annonces, annonce)
            this.trueAnnonces = this.renameAnnonces(this.trueAnnonces, annonce)    
            this.$bvModal.hide('annonceForm')
    },*/
    editAnnonces(){
        this.$bvModal.hide('annonceForm')
         this.getAnnonces();
    },
     /**
         * Modifie les info d'une annonce dans la pile des annonces
         */
        renameAnnonces(annonces, annonce) {
            return annonces.map(elt => {
                if (elt.idAnnonce == annonce.idAnnonce) {
                    elt.titreAnnonce = annonce.titreAnnonce
                    elt.descAnnonce = annonce.descAnnonce
                    elt.etatAnnonce = annonce.etatAnnonce
                    elt.publish = annonce.publish
                    elt.tags = annonce.tags
                    elt.idLogement = annonce.idLogement
                }
                return elt
            })
        }
    
  }

};
</script>
<style scoped>
     .text-form-annone {
        font-size: 1.3em;
        color: #212121ef;
        font-weight: 800;
        text-align: center;
        margin-top: 2px;
     }
</style>