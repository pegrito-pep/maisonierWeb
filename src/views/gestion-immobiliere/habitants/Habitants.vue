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
                            <btnAdd  message="Ajouter un habitant" v-b-modal.habitantForm ref="buttonAdd"/>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!habitants.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun habitant crée pour l'instant</span>
                    </b-alert> 
                    <b-row v-else>
                        <b-col xs="12" sm="6" md="3" v-for="locataire in habitants" :key="locataire.idLocataire"> 
                            <div class="card">
                                <div class="text-center">
                                    <div class="card-body pb-0">
                                        <b-avatar :src="locataire.avatar" size="8em" />
                                    </div>
                                    <div class="card-body mt-0 px-0">
                                        <h4 class="truncate card-title blue">{{ locataire.nomLocataire + ' ' + locataire.prenomLocataire }}</h4>
                                        <h6 class="truncate card-subtitle text-muted">{{ locataire.tel }}</h6>
                                        <h6 class="truncate small card-subtitle text-muted">{{ locataire.profession }}</h6>
                                        <div class="mt-3 d-flex justify-content-center">
                                            <b-button-group>
                                                <b-button size="sm" v-b-tooltip.top="'Détails'" @click.prevent="showDetails(locataire)"><i class="ik f-16 ik-eye"></i></b-button>
                                                <b-button size="sm" v-b-tooltip.top="'Modifier'"><i class="ik f-16 ik-edit"></i></b-button>
                                                <b-button size="sm" v-b-tooltip.top="'Supprimer'"><i class="ik f-16 ik-trash-2"></i></b-button>
                                            </b-button-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="habitants.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>
        
        <!-- MODALE POUR AFFICHER LES DETAILS D'UN HABITANT -->
            <div v-if="locataire" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Dossier de  <b>{{ locataire.titre }}</b> <b>{{ locataire.nomLocataire }}</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-habitant :locataire="locataire" @showDetail="showOccupation"/>
                    </div>
                </div>
            </div>
        </div>
        
        <!--MODAL POUR AJOUTER OU MODIFIER UN LOGEMENT-->
        <b-modal id="habitantForm" ref="habitant-form" size="lg" :title="title" ok-title="Fermer" ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
            <div>
                <habitant-form @habitantAdded="addedHabitant" :action='action'/>
            </div>
        </b-modal>
    </div>
</template>

<script>
   import HabitantForm from "@/views/gestion-immobiliere/habitants/HabitantForm.vue";
   import DetailsHabitant from '@/views/gestion-immobiliere/habitants/DetailsHabitant.vue';
   import SearchForm from '@/components/parts/SearchForm.vue';

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-habitants",
  components: {
    HabitantForm,
    DetailsHabitant,
    SearchForm,
  },
  data: () => ({
     action:"add",
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 4,
     locataire: null,
     habitants:[],
     trueHabitants:[],
     title:"Ajouter un locataire"

  }),
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.habitants, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },

    beforeMount() {
        this.getHabitants()
    },
    mounted(){

     this.$root.$on('show-detail-occupation', (occupation) => {
         $('#editLayoutItem').modal('hide')
     })
    },
    methods: {
        //traitement de l'évènement émis d'ajout d'un locataire
        addedHabitant() {
            this.getHabitants();
            this.$bvModal.hide('habitantForm')
        },
            /**
         * Affiche le modal de création d'un locataire directement au chargement de la page
         * ceci est utilisé lorsqu'on est arrivé ici en provenant de la homepage
         */
        autoAddTarget() {
            const formHabitant = this.$route.query.formHabitant || null;
            if (formHabitant) {
                this.$refs['habitant-form'].show();
                window.history.replaceState(
                    {},
                    "",
                    window.location.href.split("?")[0]
                );
            }
        },
        //recupération de la liste des locataires
        getHabitants() {
            axios.get('locataires').then(response => response.result || []).then(habitants => {
                this.habitants = this.trueHabitants = habitants
                this.autoAddTarget();
                this.showOverlay = false
                this.autoDetailsTarget();
            })
            
        },
        updateHabitant(habitant) {
            console.log("habitant",habitant)
        },
        removeHabitant(habitant) {
            console.log("habitant",habitant)
        },
        showDetails(locataire) {
          console.log('locataire',locataire,' ')
            this.locataire = locataire
            console.log('locataire',locataire,' this.locataire',this.locataire)
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.locataire = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.locataire = null
                })
            }, 100)          
        },
        showOccupation(){
            $('#editLayoutItem').modal('hide')
        },
         /**
     * Affiche automatiquement les details d'un logement au chargement
     * ceci est utilise dans le cas où on a cliqué sur le batiment en etant sur le details d'une cité
     */
    autoDetailsTarget() {
      const target = this.$route.query.target || null;
      if (target) {
        const locataire =  this.habitants .filter(
          elt => elt.idLocataire == target
        )[0];
        if (locataire) {
          this.showDetails(locataire);
          window.history.replaceState(
            {},
            "",
            window.location.href.split("?")[0]
          );
        }
      }
    },
      
    
    
  }

};
</script>
<style scoped>
.resize{
    width:2em;
    height:2em;
    margin-right:1px; 
}
</style>