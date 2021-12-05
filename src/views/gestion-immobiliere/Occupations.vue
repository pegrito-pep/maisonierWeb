<template>
  <div class="container-fluid position-relative">
      
    <!--page header start -->
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="d-flex justify-content-between align-items-center">               
                        <span class="h5"><b class="text-danger font-weight-bold h3">{{ trueOccupations.length }}</b> occupation{{ trueOccupations.length > 1 ? 's' : '' }} au total</span>
                        <div class="d-flex align-items-center justify-content-end">
                      
                            <btnAdd v-if="canCreateoccupation"  :message="$t('data.occupation_creer_un_bail')" v-b-modal.occupationForm/>
                            <b-button-group v-if="canviewoccupations"  class="mt-n1">
                                <b-button variant="outline-light" class="text-danger" @click.prevent="goTo('prev')"><i class="fa fa-2x fa-chevron-left"></i></b-button>
                                <b-button variant="outline-light" class="text-danger" @click.prevent="goTo('next')"><i class="fa fa-2x fa-chevron-right"></i></b-button>
                                <b-button variant="outline-light" class="text-danger" @click.prevent="toogleList"><i class="fa fa-2x fa-search" id="toogleList"></i></b-button>
                            </b-button-group>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">{{$t('data.occupation_pas_de_occupation')}}</span>
                    </b-alert> 
                    <div v-else>
                        <occupation v-if="!empty(occupation)" :occupation="occupation" @change="selectLogement" @makeUpdate="setUpdateOccupation" />
                    </div>
                </b-overlay>
            </div>

            <div id="mySidenav" class="occupations-sidenav py-2">
                <h5 class="text-center text-white border-bottom py-1">{{$t('data.occupation_occupations_disponibles')}}</h5>
                <form action="" class="container" onSubmit="return false">
                    <b-form-input placeholder="Recherche..." v-model="search" ref="inputText1" />
                </form>
                <b-container class="my-2" style="height: 76%; overflow-y: auto">
                    <b-list-group>
                        <b-list-group-item class="mb-1 p-1" :class="{'active' : item.idOccupation == occupation.idOccupation}" v-for="(item, i) in items" :key="item.idOccupation || i" @click.prevent="selectLogement(item)">
                            <dl class="d-flex m-0">
                                <dt class="pl-1 col-1"><i class="fa fa-home"></i></dt>
                                <dd class="col-11 pl-1 truncate">{{ item.logement.refLogement }} / <span class="text-muted small">{{ item.logement.sousTypeLogement.libelleSousType }}</span></dd>
                            </dl>
                            <dl class="d-flex m-0">
                                <dt class="pl-1 col-1"><i class="fa fa-user"></i></dt>
                                <dd class="col-11 pl-1 truncate">{{ item.locataire.nomLocataire + ' ' + item.locataire.prenomLocataire }}</dd>
                            </dl>
                            <div class="text-center">
                                <div v-if="item.dateFin == null">
                                    <!--<b-badge variant="success" >{{$t('data.occupation_bail_en_cours')}}</b-badge>-->
                                     <b-button variant="danger">Clôturer le bail</b-button>
                                </div>
                                
                                <b-badge variant="danger" v-else>{{$t('data.occupation_bail_termine_le')}} {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</b-badge>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </b-container>
                <div class="m-auto w-100 d-flex justify-content-center">
                    <paginator no-control :offset="offset" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />
                </div>
            </div>
        </div>
        <!-- MODALE POUR AFFICHER LES DETAILS D'UNE OCCUPATION -->
        
     
        <!--MODAL POUR AJOUTER OU MODIFIER UNE OCCUPATION-->
        <!--<b-modal id="occupationForm" size="lg" hide-footer no-close-on-backdrop>
            <template #modal-title>
            <span class="ml-4 text-form-occupation">{{ title }}</span>
            </template>
            <div>
                <occupation-form class="animated flipInX" @occupationAdded="addedOccupation" :action="action" :provenance="provenance" @createLogementSecond="goToLogement" @createLocataire="gotToLocataire"/>
            </div>
        </b-modal>-->
        
        <!--MODAL POUR AJOUTER OU MODIFIER UNE OCCUPATION-->
        <!--<b-modal id="occupationForm" ref="occupation-form" size="xl" :title="title" hide-footer no-close-on-backdrop hide-header-close>-->
            <b-modal id="occupationForm" ref="occupation-form" size="xl" :title="title" hide-footer no-close-on-backdrop @close="resetOccupationFormProps">
            <template #modal-title>
                <span class="ml-4 text-form-occupation">{{ title }}</span>
            </template>
            <div>
                <occupation-form  @occupationAdded="addedOccupation" @editOccupation="occupationEdited" :action="action" :provenance="provenance" :editOccupation="occupationToEdit"   @createLogementSecond="goToLogement" @createLocataire="gotToLocataire" @closeOccupationModal="resetOccupationFormProps"/>
            </div>
        </b-modal>
  </div>
</template>
<script>
  //import OccupationForm from "@/components/_gestion-immobiliere/OccupationForm.vue";
  import OccupationForm from "@/views/gestion-immobiliere/occupations/OccupationForm.vue";

import Occupation from './occupations/Occupation.vue';
import SearchForm from "@/components/parts/SearchForm.vue";

  const php  = require ( 'phpjs' ) ; 

export default {
  name: "list-occupations",
  components: {
      OccupationForm,
  //  DetailsOccupation,
    Occupation,
    SearchForm,
  },
  data: () => ({
     title:"Ouverture du contrat de bail",
     action:"add",
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     occupation: {},
     occupationToEdit:null,
     occupations:[],
     trueOccupations:[],
     provenance:1,
    permissions: storage.get("userPermissions")

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
        },
        canCreateoccupation(){
            if(this.permissions.includes("create_occupation")){
                return true;
            }
            return false;  
        },
        canviewoccupations(){
            if(this.permissions.includes("list_occupations")){
                return true;
            }
            return false; 
        }
    },
     watch: {
        search(value) {
            value = value.toLowerCase()
            this.occupations = !php.empty(value) ? this.trueOccupations.filter(elt => {
                return elt.logement.refLogement.toLowerCase().includes(value) || (elt.locataire.nomLocataire + ' ' + elt.locataire.prenomLocataire).toLowerCase().includes(value)
            }) : this.trueOccupations
        }
    },

    beforeMount() {
        this.getOccupations()
    },
    mounted() {
        setTimeout(() => {
            $('#editLayoutItem').modal('hide')
        }, 100);
    },
    methods: {
        occupationEdited(){
          this.action='add';
          this.title="Ouverture du contrat de bail";
          this.$bvModal.hide('occupationForm');
          this.occupation=null;
          this.getOccupations();
        },
        empty: (value) => php.empty(value),
        toogleList() {
            const btn = $('#toogleList')
            if (btn.hasClass('fa-search')) {
                btn.removeClass('fa-search').addClass('fa-times')
            }
            else {
                btn.addClass('fa-search').removeClass('fa-times')
            }
            $('#mySidenav').toggleClass('active')
            $('#mySidenav input:text').focus()
        },

        goTo(step) {
            const count = this.occupations.length

            let index = this.occupations.findIndex((elt) => elt.idOccupation == this.occupation.idOccupation)
            if (step == 'prev') {
                index--
            }
            else {
                index++
            }
            if (index >= count) {
                index = 0
            }
            if (index < 0) {
                index = count - 1
            }
            this.selectLogement(this.occupations[index])
        },
        selectLogement(occupation) {
            if (php.empty(occupation)) {
                return
            }
            this.showOverlay = true 
            axios.get('occupations/' + occupation.idOccupation).then(response => {
                this.occupation = response.result
                let href = window.location.href.split('/'), last = href[href.length - 1]
                if (last == 'occupations') {
                    href.push(this.occupation.idOccupation)
                }
                else {
                    href[href.length - 1] = this.occupation.idOccupation
                }
                window.history.pushState({}, '', href.join('/'));
                
                this.showOverlay = false
            })
            $('#mySidenav').removeClass('active')
            $('#toogleList').addClass('fa-search').removeClass('fa-times')
        },
      
        /**ecoute évènement émis;
        * fermetire formulmaire de création d'une occupation
        * redirection vers la création d'un logement
       */
        goToLogement(){
            this.$bvModal.hide('occupationForm');
            setTimeout(() => {
                    this.$router.push({name: 'logements', query: {target: "call-logement"}}) 
                }, 50);
        },
        /**ecoute évènement émis;
        * fermetire formulmaire de création d'une occupation
        * redirection vers la création d'un locataire
       */
        gotToLocataire(){
            this.$bvModal.hide('occupationForm');
            setTimeout(() => {
                     this.$router.push({name: 'habitants', query: {target: "call-habitant"}}) 
                }, 50);
        },
        addedOccupation(){
            this.getOccupations()
            this.$bvModal.hide('occupationForm');
        },
    //recupération de la liste des logements
     getOccupations() {
            axios.get('occupations').then(response => response.result || []).then(occupations => {
                this.occupations = this.trueOccupations = occupations
                let index = occupations.findIndex(elt => elt.idOccupation == this.$route.params.id)
                if (index == -1) {
                    index = 0
                }
                this.showOverlay = false
                this.selectLogement(occupations[index] || {})
            })
     },

      removeOccupation(occupation) {
           console.log("occupation",occupation)
      },

     //edit de l'occupation
     setUpdateOccupation(occupation){
        this.action='edit'
        console.log("occupation", occupation);
        this.occupationToEdit=occupation
        this.$refs['occupation-form'].show();
        this.title="Edition du contrat de bail"
     },
     //methode pour fermer le modal de creation / edit d'une occupation
     resetOccupationFormProps(){
          this.action='add'
          this.title="Ouverture du contrat de bail"
          this.$bvModal.hide('occupationForm')
          /*this.occupation = {
                loyer: null, mode: null, energie: "index", eau: "index",
                puEnergie: null, puEau: null, idLogement: null, idLocataire: null, debut: null, indexEnergie: 0,
                indexEau: 0, endLastBail: false, avance: 1, contrats: null, dureeBail: 0,
                caution: 1
         }*/
            this.occupationToEdit=null;
     }
      
    
    
  }

};
</script>
<style>
html, body {
    overflow-x: hidden;
}
</style>
<style scoped>

    .text-form-occupation {
        font-size: 1.3em;
        color: #212121ef;
        font-weight: 800;
        text-align: center;
        margin-top: 2px;
    }
    .occupations-sidenav {
        height: 45em;
        border-radius: 5px 0 0 5px;
        width: 0;
        position: absolute;
        z-index: 100;
        top: 5%;
        right: 0;
        background-color: #111;
        overflow: hidden;
        transition: 0.5s;
    }
    .occupations-sidenav.active {
        width: 300px
    }
    .occupations-sidenav .list-group-item:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.8);
    }
    .occupations-sidenav .list-group-item.active {
        background: #f5365c;
        border-color: #f5365c;
    }


.occupations-sidenav a:hover {
  color: #f1f1f1;
}
.list-group-item.active {
    background: rgb(245, 54, 92) !important;
    border: none;
}
.list-group-item.active .text-muted {
    color: #fff !important;
}

.pagination .page-item.active .page-link {
    background-color: red !important;
    color: #fff;
}


@media screen and (max-height: 450px) {
  .occupations-sidenav {padding-top: 15px;}
  .occupations-sidenav a {font-size: 18px;}
}
.modal-dialog {
    max-width: 70%!important;
}
</style>
