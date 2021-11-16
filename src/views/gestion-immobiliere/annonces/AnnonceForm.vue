<template>
  
    <b-overlay :show="showOverlay" rounded="sm">
      <div v-if="logements.length>0">
          <b-row>
          <b-col>
            <b-form-group
              label="Titre de l'annonce"
              description="Donnez un titre intuitif à votre annonce"
            >
              <b-form-input
                v-model="annonce.titre"
                placeholder="Ex: Grande chambre moderne à louer"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Tags"
              description="Ajouter des critères de recherche à votre annonce"
            >
              <b-form-input
                v-model="annonce.tags"
                placeholder="Ex: Appartement meublé, grande chambre"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="7">
            <b-form-group label="description">
              <b-form-textarea
                class="mb-2"
                placeholder="Caractériser votre annonce afin d'être bien reférencé"
                rows="8"
                v-model="annonce.description"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col cols="5">
            <b-form-group label="Veuillez selectionner le logement">
              <div style="height: 10.5em">
                <b-form-select
                  v-model="annonce.idLogement"
                  :options="logements"
                  class="mb-1"
                  @input="setSlide"
                  value-field="idLogement"
                  text-field="refLogement"
                  disabled-field="notEnabled"
                ></b-form-select>
                <b-carousel :interval="0" controls v-model="selected_index" ref="myCarousel">
                  <b-carousel-slide
                    style="height: 10.5em"
                    class="fluid w-100 responsive border-0"
                    v-for="(logement, i) in logements"
                    :key="i"
                    :img-src="empty(logement.photos) ? '/img/bgHousing.jpg' : logement.photos[0].image"
                  />
                </b-carousel>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox v-model="annonce.publish" switch>
                <span class="fa-lg" v-if="annonce.publish">Directement publier cette annonce ?</span>
                <span class="fa-lg" v-else>Spécifier la durée de validité</span>
            </b-form-checkbox>
          </b-col>
          <b-col>
            <!--<b-form-checkbox v-model="commande" switch>
              <span class="fa-lg">Spécifier la durée de validité ?</span>
            </b-form-checkbox>-->
          </b-col>
        </b-row>
        <transition enter-active-class="animated zoomIn"  leave-active-class="animated fadeOut zoomOut">
          <b-row v-if="!annonce.publish">
            <b-col>
              <b-form-group
                label="Date de début"
                description="Quand souhaitez-vous débuter la publication"
              >
                <b-form-datepicker locale="fr" v-model="duree[0]" :min="$date().format()"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Date de fin" description="Jusqu'à quand cette annonce est valable">
                <b-form-datepicker locale="fr" v-model="duree[1]" :min="$date().add(1, 'day').format()"></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
        </transition>
        <hr>
          <div class="float-right">
              <b-button variant="danger" @click="submitModal" class="ml-2" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>   
            <!--<b-button @click.prevent="submitModal" variant="primary">Valider</b-button>-->
            
            </div>
      </div>
      <div v-else>
        <b-row>
          <div class="text-center">
            <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
            <span class="h4 d-inline-flex ml-2">Aucun logement trouvé</span>
            <br>
            <b-button size="lg" class="my-2" variant="outline-info" @click.prevent="createLogement">créer un logement</b-button>
            <p>Une annonce concerne un logement du coup avant de pouvoir en créer une, vous devez préalablemenet creér au moins un logement</p>
          </div>
        </b-row>
      </div>
    </b-overlay>
</template>
<script>
import notif from "@/plugins/notif.js";
const php = require("phpjs");
export default {
  name: "annonce-form",
  data: () => ({
    duree: [null, null],
    selected_index: -1,
    selected_value: "",
    annonce: {
      titre: "",
      description: "",
      tags: "",
      idLogement: "",

      duree: "",
      publish: true
    },
    idAnnonce:'',
    showOverlay: false,
    sendForm: false,
    logements: [],
    commande:false,
    submitted:false
  }),
  watch: {
    selected_index(value) {
      this.annonce.idLogement = this.logements[value].idLogement;
    }
  },
  props: {
      action: {type: String, default: 'add'},
      editAnnonce: {type: Object, default: null}
    },

  methods: {
    /**
     * Set l'image du carousel lorsqu'on change le logement
     */
    setSlide(value) {
      for (let index = 0; index < this.logements.length; index++) {
        if (this.logements[index].idLogement == value) {
          this.$refs.myCarousel.setSlide(index);
          break;
        }
      }
    },
    empty(val) {
        return php.empty(val)
    },

    resetModal() {
      this.annonce = {
        titre: "",
        description: "",
        tags: "",
        idLogement: ""
      };
    },

    //validation formulaire d'ajout/modification d'una annonce
    submitModal(bvModalEvt) {
         this.annonce.duree = this.duree.join(",");
      bvModalEvt.preventDefault();
      if (php.empty(this.annonce.titre) || php.empty(this.annonce.description)|| php.empty(this.annonce.duree)) {
                return App.error('Un titre, une description et une durée sont obligatoires')
      }
      if (this.annonce.titre.length <20) {
        return App.error('Le titre doit contenir au moins 20 caractères')
      }
      if (this.annonce.description.length<200) {
        return App.error('La description doit contenir au moins 200 caractères')
      }
      this.submitted = true ;
      this.showOverlay = true;
      if (this.action == "add") {
        console.log("annonce",this.annonce)
        
          axios
            .post("annonces", this.annonce)
            .then(response => {
              notif.success(response.message);
              this.$emit("annonceAdded");
              this.submitted = false ;
              return App.notifySuccess(response.message);
            })
            .catch(error => {
              this.submitted = false ;
              return App.alertError(error.message);
            });
            setTimeout(() => {
                this.showOverlay = false;
            }, 500);
            
      }
      if (this.action == 'edit' && !php.empty(this.annonce)) {
            axios.put(`annonces/${this.idAnnonce}`, this.annonce).then(response => {
                //this.$emit('annonceUpdated', {response, idAnnonce: this.idAnnonce})
                this.$emit('annonceUpdated')
                this.submitted = false
                this.showOverlay = false;
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false
                this.showOverlay = false;
                return App.notifyError(error.message)
            })
        }
    },
   /* getAllHousing() {
      axios
        .get("logements")
        .then(response => response.result || [])
        .then(logements => {
          this.logements = logements;
          if (logements[0]) {
            this.annonce.idLogement = logements[0].idLogement;
          }
        });
    },*/
     //recupération de la liste des logements
    async getHousing() {
        this.showOverlay = true;
        if(storage.get('logements')!= null && storage.get('logements').length>0){
          this.logements=storage.get('logements')
        }else{
          this.logements = await axios.get("logements").then(response => response.result || []);
          storage.set('logements',this.logements)
        }
        if (this.editAnnonce!=null) {

                this.annonce.titre = this.editAnnonce.titreAnnonce
                this.annonce.description = this.editAnnonce.descAnnonce
                this.annonce.tags  = this.editAnnonce.tags
                this.annonce.idLogement = this.editAnnonce.idLogement
                this.idAnnonce=this.editAnnonce.idAnnonce

        }
           console.log('entrée 2', 'editAnnonce', this.editAnnonce)
        this.showOverlay = false;
    },
    /**emission évènement pour fermer le formulaire
     * de création d'une annonce et basculer à la création préalable d'un logement
     */
    createLogement(){
      this.$emit('createLogementFirst') 
    }
  },
  async mounted() {
    await this.getHousing();
  }
};
</script>
