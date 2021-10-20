<template>
    <div class="container-fluid">
        <!--page header start -->
        <page-description title="Habitants" description="Gestion de vos résidents" icon="fas fa-users" :path="['Patrimoine immobilier', 'Mes Habitants']" />
        
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
                            <b-button variant="danger" v-b-modal.habitantForm><i class="fa fa-plus-circle"></i> Créer un habitant</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!habitants.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun habitant crée pour l'instant</span>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <!--<b-col v-for="(habitant, i) in habitants" :key="habitant.idHabitant || i" cols="6" class="animated flipInX mb-4">
                            <habitant-component @makeUpdate="updateHabitant" @deleted="removeHabitant" :habitant="habitant" @showDetails="showDetails" />
                            ok
                        </b-col>-->
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover table-bordered table-striped" id="sampleTable">
                                <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>Avatar</th>
                                    <th>Nom</th>
                                    <th>E-Mail</th>
                                    <th>N° Téléphone</th>
                                    <th>Proféssion</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="locataire in habitants" :key="locataire.idLocataire">
                                    <td>{{locataire.idLocataire}}</td>
                                    <td><b-avatar :src="locataire.avatar" /></td>
                                    <td>{{locataire.nomLocataire}}</td>
                                    <td>{{locataire.email}}</td>
                                    <td>{{locataire.tel}}</td>
                                    <td>{{locataire.profession}}</td>
                                    <td>
                                        <a href="#!" v-b-tooltip.top="'Modifier'"><i class="ik ik-edit f-16 mr-15 text-green"></i></a>
                                        <a href="#!" v-b-tooltip.top="'Supprimer'"><i class="ik ik-trash-2 f-16 mr-15 text-red"></i></a>
                                        <a href="#!" v-b-tooltip.top="'Détails'" @click.prevent="showDetails(locataire)"><i class="ik ik-eye f-16 text-blue"></i></a>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
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
   import DetailsHabitant from '@/views/gestion-immobiliere/habitants/DetailsHabitant.vue'

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-habitants",
  components: {
    HabitantForm,
    DetailsHabitant,
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
            const target = this.$route.query.target || null;
            if (target) {
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
                this.habitants = this.habitants = habitants
                this.autoAddTarget();
                this.showOverlay = false
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
        }
      
    
    
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