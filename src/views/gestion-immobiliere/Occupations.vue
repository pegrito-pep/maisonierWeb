<template>
  <div class="container-fluid position-relative">
      
    <!--page header start -->
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                        <div class="d-flex align-items-center justify-content-end">
                            <btnAdd  message="Définir une occupation" v-b-modal.occupationForm/>
                            <b-button-group  class="mt-n1">
                                <b-button variant="outline-light" class="text-danger" @click.prevent="goTo('prev')"><i class="fa fa-2x fa-chevron-left"></i></b-button>
                                <b-button variant="outline-light" class="text-danger" @click.prevent="goTo('next')"><i class="fa fa-2x fa-chevron-right"></i></b-button>
                                <b-button variant="outline-light" class="text-danger" @click.prevent="toogleList"><i class="fa fa-2x fa-list-alt" id="toogleList"></i></b-button>
                            </b-button-group>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!occupations.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Vous n'avez défini aucune occupation pour le moment</span>
                    </b-alert> 
                    <div v-else>
                        <occupation :occupation="occupation" @change="getOccupations"/>
                    </div>
                </b-overlay>
            </div>

            <div id="mySidenav" class="occupations-sidenav py-2">
                <h5 class="text-center text-white border-bottom py-1">Occupations disponibles</h5>
                <form action="" class="container" onSubmit="return false">
                    <b-form-input placeholder="Recherche..." v-model="search" />
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
                                <dd class="col-11 pl-1 truncate">{{ item.locataire.titre + ' ' + item.locataire.nomLocataire + ' ' + item.locataire.prenomLocataire }}</dd>
                            </dl>
                            <div class="text-center">
                                <span class="small text-success" v-if="item.dateFin == null">Bail en cours</span>
                                <span class="small text-danger" v-else>Bail terminé le {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</span>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </b-container>
                <div class="d-flex justify-content-center w-100">
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
        
        <!--MODAL POUR AJOUTER OU MODIFIER UN LOGEMENT-->
        <b-modal id="occupationForm" ref="occupation-form" size="lg" :title="title" ok-title="Fermer" ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
            <template #modal-title>
                <span class="ml-4 text-form-occupation">{{ title }}</span>
            </template>
            <div>
                <occupation-form  @occupationAdded="addedOccupation" :action="action" :provenance="provenance"   @createLogementSecond="goToLogement" @createLocataire="gotToLocataire"/>
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
     title:"Affecter une occupation",
     action:"add",
     search: null,
     showOverlay: true,
     currentPage: 1,
     perPage: 10,
     occupation: null,
     occupations:[],
     trueOccupations:[],
     provenance:1

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
        toogleList() {
            const btn = $('#toogleList')
            if (btn.hasClass('fa-list-alt')) {
                btn.removeClass('fa-list-alt').addClass('fa-times')
            }
            else {
                btn.addClass('fa-list-alt').removeClass('fa-times')
            }
            $('#mySidenav').toggleClass('active')
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
            this.occupation = occupation
            let href = window.location.href.split('/'), last = href[href.length - 1]
            if (last == 'occupations') {
                href.push(this.occupation.idOccupation)
            }
            else {
                href[href.length - 1] = this.occupation.idOccupation
            }
            window.history.pushState({}, '', href.join('/'));
            $('#mySidenav').removeClass('active')
            $('#toogleList').addClass('fa-list-alt').removeClass('fa-times')
        },
        /**
        * affichage directe de l'occupation demandé
        * source="detailLogement"
        */
    autoDetailsTarget() {
      const target = this.$route.query.target || null;
      if (target) {
          console.log("occupation n", target)
        /*const logement = this.trueLogements.filter(
          elt => elt.idLogement == target
        )[0];
        if (logement) {
          this.showDetails(logement);
          window.history.replaceState(
            {},
            "",
            window.location.href.split("?")[0]
          );
        }*/
        window.history.pushState({}, '', '/'+target);
      }
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
                this.occupation = occupations[index] || {}
                this.showOverlay = false
                this.autoDetailsTarget()
            })
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


.occupations-sidenav a:hover {
  color: #f1f1f1;
}

@media screen and (max-height: 450px) {
  .occupations-sidenav {padding-top: 15px;}
  .occupations-sidenav a {font-size: 18px;}
}
</style>
