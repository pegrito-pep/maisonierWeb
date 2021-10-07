<template>
  <div class="container-fluid">
    <!--page header start -->
    <page-description title="Occupations" description="Gestion de vos occupations" icon="fas fa-users" :path="['Gestion Immobilière', 'Mes Occupations']" />
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
                            <b-button variant="danger"  @click.prevent="addOccupation"  v-b-modal.modal-lg><i class="fa fa-plus-circle"></i> Définir une occupation</b-button>
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
                                    <b-tr>
                                        <b-th>N°</b-th>
                                        <b-th>Logement</b-th>
                                        <b-th>Locataire</b-th>
                                        <b-th>Loyer de base</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="occupation in occupations" :key="occupation.idOccupation">
                                        <b-td class="p-2">{{ occupation.idOccupation }}</b-td>
                                        <b-td class="p-2">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.logement.refLogement }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">
                                                {{ occupation.logement.sousTypeLogement.libelleSousType  }}
                                                <span v-if="occupation.logement.batiment"> / Batiment : {{ occupation.logement.batiment.nomBatiment }}</span>
                                            </span>    
                                        </b-td>
                                        <b-td class="p-2">
                                            <span class="d-inline-block w-100 mb-1 font-weight-bold">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                                            <span class="d-inline-block w-100 mt-1 text-muted">{{ occupation.locataire.tel + ' / ' + occupation.locataire.email }}</span>    
                                        </b-td>
                                        <b-td class="p-2">
                                            <span class="d-inline-block w-100 mb-1"><b>{{ occupation.loyerBase + ' F' }}</b> / <small>{{ occupation.modePaiement }}</small></span>    
                                            <span class="d-inline-block w-100 mt-1">
                                                <span class="text-success" v-if="occupation.dateFin == null">Bail en cours</span>
                                                <span class="text-danger" v-else>Bail terminé</span>
                                            </span>    
                                        </b-td>
                                        <b-td><b-button :to="{name: 'details-occupation', params: {id: occupation.idOccupation}}" v-b-tooltip="'Voir les details'"><i class="fa fa-eye"></i></b-button></b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>
        <!-- MODALE POUR AFFICHER LES DETAILS D'UNE OCCUPATION -->
        <div v-if="occupation" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Détails de <b>{{ habitant.titre }}</b> <b>{{ habitant.nomLocataire }}</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <!-- <details-habitant :habitant="habitant" /> -->
                    </div>
                </div>
            </div>
        </div>
     
  
       <occupation-form v-if="commandeOccupation" action="add" @occupationAdded="addedOccupation" />
  </div>
</template>
<script>
  import OccupationForm from "@/components/_gestion-immobiliere/OccupationForm.vue";
//   import DetailsOccupation from '@/components/_patrimoine/DetailsOccupation.vue'

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-occupations",
  components: {
      OccupationForm,
  //  DetailsOccupation,
  },
  data: () => ({
     action:"add",
     commandeOccupation:false,
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 4,
     occupation: null,
     occupations:[],
     trueOccupations:[]

  }),
  computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.occupations, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },

    beforeMount() {
        this.getOccupations()
    },
    methods: {
        sendData(){
            
        },

        addOccupation(){
            this.action="add";
            this.commandeOccupation=true;
        },
        addedOccupation(){
            this.commandeOccupation=false;
            this.getOccupations()
        },
    //recupération de la liste des logements
     getOccupations() {
            axios.get('occupations').then(response => response.result || []).then(occupations => {
                this.occupations = this.trueOccupations = occupations
                this.showOverlay = false
            })
     },
     addHabitant(){
         this.commandeOccupation=true;
     },
     updateOccupation(occupation) {
           console.log("occupation",occupation)
      },
      removeOccupation(occupation) {
           console.log("occupation",occupation)
      },
      showDetails(occupation) {
        this.occupation = occupation
        setTimeout(() => {
            $('#editLayoutItem').modal('show')
            $('#editLayoutItem').on('hide.bs.modal', (e) => {
                this.occupation = null
            })
            $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                this.occupation = null
            })
        }, 100)          
      },
  
      
    
    
  }

};
</script>
