<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{'active' : section == 'caracteristiques'}"
          @click.prevent="section = 'caracteristiques'"
        >Caractéristiques</a>
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{'active' : section == 'annonces'}"
          @click.prevent="section = 'annonces'"
        >Annonces</a>
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{'active' : (section == 'depenses' || section == 'add-depense')}"
          @click.prevent="section = 'depenses'"
        >Dépenses</a>
      </li>
           <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{'active' : section == 'locataire'}"
          @click.prevent="section = 'locataire'"
        >Locataires</a>
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade show active">
        <!--<b-container
          fluid
          v-if="section == 'photos'"
          style="height: 75vh; overflow-y: auto; overflow-x: hidden"
        >
          <b-row class="layout-wrap">
            <b-col cols="4">
              <vue-upload-multiple-image
                @upload-success="section_photo_uploadImageSuccess"
                :data-images="section_photo.images"
              />
            </b-col>
            <b-col cols="4" v-for="(photo, i) in photos" :key="i">
              <div class="shadow list-item list-item-grid">
                <div class="card d-flex flex-row mb-3">
                  <a
                    class="d-flex card-img"
                    @click.prevent="() => section_photo_showImg(i)"
                    href="#"
                  >
                    <img
                      :src="photo"
                      alt
                      style="height: 15em"
                      class="list-thumbnail responsive border-0"
                    />
                  </a>
                  <div class="d-flex flex-grow-1 min-width-zero card-content">
                    <div class="list-actions">
                      <a href="#" @click.prevent="() => section_photo_showImg(i)">
                        <i class="ik ik-eye"></i>
                      </a>
                      <a href="#" class="list-delete">
                        <i class="ik ik-trash-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <vue-easy-lightbox
            :visible="section_photo.visible"
            :imgs="photos"
            :index="section_photo.index"
            @hide="section_photo_handleHide"
          />
        </b-container>-->
        <!--<b-container fluid v-if="section == 'details'">
          <b-row>
            <b-col cols="6">
              <span class="d-inline-block w-100 my-1">
                Pays:
                <b>{{ logement.adresse.pays }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Ville:
                <b>{{ logement.adresse.ville }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Quartier:
                <b>{{ logement.adresse.quartier }}</b>
              </span>
            </b-col>
            <b-col cols="6">
              <span class="d-inline-block w-100 my-1">
                Logitude:
                <b>{{ logement.adresse.lon }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Latitue:
                <b>{{ logement.adresse.lat }}</b>
              </span>
            </b-col>
          </b-row>
          <b-container class="mt-4 p-0">
            <GmapMap
              :center="{lat: parseFloat(logement.adresse.lat), lng: parseFloat(logement.adresse.lon)}"
              :zoom="14"
              class="w-100"
              style="height:340px;"
            />
          </b-container>
        </b-container>-->
        <b-container fluid v-if="section == 'caracteristiques'">
           <!--LOGEMENT SUR LA MAP -->
          <h2 class="text-center text-capitalize font-weight-bold fs-4">Localisation</h2>
          <b-row>
            <b-col cols="6">
              <span class="d-inline-block w-100 my-1">
                Pays:
                <b>{{ logement.adresse.pays }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Ville:
                <b>{{ logement.adresse.ville }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Quartier:
                <b>{{ logement.adresse.quartier }}</b>
              </span>
            </b-col>
            <b-col cols="6">
              <span class="d-inline-block w-100 my-1">
                Logitude:
                <b>{{ logement.adresse.lon }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Latitue:
                <b>{{ logement.adresse.lat }}</b>
              </span>
            </b-col>
          </b-row>
          <b-container class="mt-4 p-0">
            <GmapMap
              :center="{lat: parseFloat(logement.adresse.lat), lng: parseFloat(logement.adresse.lon)}"
              :zoom="16"
              class="w-100"
              style="height:340px;"
            >
            <gmap-custom-marker :marker="marker">
              <img src="/img/mapMarker.png" />
            </gmap-custom-marker>
            </GmapMap>  
          </b-container>
          <hr />
            <h2 class="text-center text-capitalize font-weight-bold fs-4">Photos</h2>
          <b-row class="layout-wrap">
            <b-col cols="4">
              <vue-upload-multiple-image
                @upload-success="section_photo_uploadImageSuccess"
                :data-images="section_photo.images"
                dragText="cliquer pour choisir des images"
                browseText="Vous pouvez choisir jusqu'à 5 images"
              />
            </b-col>
            <b-col cols="4" v-for="(photo, i) in photos" :key="i">
              <div class="shadow list-item list-item-grid">
                <div class="card d-flex flex-row mb-3">
                  <a
                    class="d-flex card-img"
                    @click.prevent="() => section_photo_showImg(i)"
                    href="#"
                  >
                    <img
                      :src="photo"
                      alt
                      style="height: 15em"
                      class="list-thumbnail responsive border-0"
                    />
                  </a>
                  <div class="d-flex flex-grow-1 min-width-zero card-content">
                    <div class="list-actions">
                      <a href="#" @click.prevent="() => section_photo_showImg(i)">
                        <i class="ik ik-eye"></i>
                      </a>
                      <a href="#" class="list-delete">
                        <i class="ik ik-trash-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <vue-easy-lightbox
            :visible="section_photo.visible"
            :imgs="photos"
            :index="section_photo.index"
            @hide="section_photo_handleHide"
          /> 
          <hr />
          <h2 class="text-center text-capitalize font-weight-bold fs-4">Caractéristiques approfondies</h2>
          <b-row>
            <b-col cols="7">
              <span class="d-inline-block w-100 my-1">
                Type de logement:
                <b>{{ logement.sousTypeLogement.libelleSousType }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Etat:
                <b-badge variant="danger" v-if="!logement.etatLogement">Libre</b-badge>
                <b-badge variant="success" v-else>Occupé</b-badge>
              </span>
            </b-col>
            <b-col cols="5">
              <span class="d-inline-block w-100 my-1">
                Prix minimal:
                <b>{{ logement.prixMin + ' F' }}</b>
              </span>
              <span class="d-inline-block w-100 my-1">
                Prix maximal:
                <b>{{ logement.prixMax + ' F' }}</b>
              </span>
            </b-col>
          </b-row>
          <div class="jumbotron pt-10 pb-10 mt-2 mb-0">
            <p>{{ logement.descLogement }}</p>
          </div>
          <hr />
          <div>
            <b-badge
              class="m-1"
              v-for="(c, i) in caracteristiques"
              :key="c.idCaracteristique || i"
              variant="secondary"
            >
              <b class="fa-lg">{{ c.valeur }}</b>
              {{ c.libelleCaracteristique }}
            </b-badge>
          </div>  
          <hr />
         
        </b-container>
        <div v-if="section == 'annonces'" style="height: 75vh; overflow-y: auto; overflow-x: hidden">
             <b-alert variant="info" show class="text-center" v-if="!logement.annonces.length">
                <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
                <span class="h4 d-inline-flex ml-2">Aucune annonce enregistrée pour le moment</span>
            </b-alert>
          <b-row>
            <b-col
              cols="12"
              v-for="(annonce, i) in logement.annonces"
              :key="annonce.idAnnonce || i"
            >
              <div class="card p-0 shadow">
                <div class="card-body p-0 d-flex">
                  <b-img :src="photos[i] || photos[0]" style="height: 8em; width: 8em"></b-img>
                  <div class="ml-2 p-2">
                    <div>
                      <b-badge
                        :variant="annonce.publish ? 'success' : 'danger'"
                      >{{ annonce.publish ? 'Déja publiée' : 'Pas encore publiée' }}</b-badge>&nbsp;
                      <b-badge variant="light">
                        <i class="fa fa-clock"></i>
                        Créée le {{ $date(annonce.createdAt).format("DD.MM.YYYY") }}
                      </b-badge>
                    </div>
                    <h5 class="my-2">
                      <a href="#" class="text-red">{{ annonce.titreAnnonce }}</a>
                    </h5>
                    <b-badge
                      v-for="(tag, i) in annonce.tags.split(',')"
                      :key="i"
                      variant="secondary"
                    >{{ tag }}</b-badge>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-container v-if="section == 'depenses' || section == 'add-depense'">
            <div v-if="section == 'depenses'">
                <div class="d-flex justify-content-between border-bottom pb-1 mb-2">
                    <div><paginator  v-if="logement.depenses.length" no-control
                        :total="logement.depenses.length"
                        :limit="perPage"
                        :page="currentPage"
                        @pageChanged="(page) => {currentPage = page}"
                        @limitChanged="(limit) => {perPage = limit}"
                    /></div>
                    <b-button size="sm" variant="outline-secondary" @click.prevent="section = 'add-depense'">Ajouter une dépense</b-button>
                </div>
                <b-alert variant="info" show v-if="!logement.depenses.length">
                    <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
                    <span class="h4 d-inline-flex ml-2">Aucune dépense enregistrée pour le moment</span>
                </b-alert>
                <div v-else style="height: 75vh;">
                    <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                        <b-row class="layout-wrap">
                            <div v-for="(depense, i) in itemsDepenses" :key="depense.idDepense || i" class="col-12 list-item list-item-thumb">
                                <depense @deleted="removeDepense" :depense="depense" :source="source" is-sub />
                            </div>
                        </b-row>
                    </div>
                </div>
            </div>
            <div v-show="section == 'add-depense'">
                <depense-form :logement="logement" @cancel="section = 'depenses'"  @depenseAdded="addedDepense" :provenance="provenance" :action="action"/>
            </div>
        </b-container>
         
        <div v-if="section == 'locataire'" style="height: 38em; overflow-y: auto">
            <b-alert variant="info" show class="text-center" v-if="!logement.occupations.length">
                <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                <span class="h4 d-inline-flex ml-2">Aucun locataire n'a occupé ce logement pour le moment</span>
            </b-alert>
            <b-card v-for="(occupation, i) in logement.occupations" :key="occupation.idOccupation || i" img-fluid :img-src="occupation.locataire.avatar || '/img/profile-picture.jpg'" img-height="250em" img-width="200em" img-left class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <b-badge class="w-90" variant="success" v-if="occupation.dateFin == null">Bail en cours</b-badge>
                    <b-badge class="w-90" variant="danger" v-else>Bail terminé le {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</b-badge>
                    <b-dropdown size="sm" right variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                        <!--<b-dropdown-item :to="{name: 'habitants', query: {target: occupation.locataire.idLocataire}}">Détails du locataire</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'details-occupation', params: {id: occupation.idOccupation}}">Détails de l'occupation</b-dropdown-item>-->
                        <b-dropdown-item @click.prevent="goToDetailLocataire(occupation)">Détails du locataire</b-dropdown-item>
                        <b-dropdown-item @click.prevent="goToDetaiOccupation(occupation)">Détails de l'occupation</b-dropdown-item>
                    </b-dropdown>
                </div>
                <hr class="mt-1">
                <dl class="row text-muted">
                    <dd class="my-1 col-1" ><i class="fa fa-user"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'nom et prénom'">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</dt>
                    <dd class="my-1 col-1"><i class="fa fa-phone"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'Numéro de téléphone'">{{ occupation.locataire.tel }}</dt>
                    <dd class="my-1 col-1"><i class="fa fa-envelope"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'Email'">{{ occupation.locataire.email }}</dt>
                    <dd class="my-1 col-1" ><i class="fa fa-id-card"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'Numéro de CNI'">{{ occupation.locataire.cniLocataire }}</dt>
                    <dd class="my-1 col-1"><i class="fas fa-birthday-cake"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'Date de naissance'">{{ $dayjs(occupation.locataire.dateNaiss).format('DD MMMM YYYY') }}</dt>
                    <dd class="my-1 col-1"><i class="fa fa-calendar"></i></dd>
                    <dt class="my-1 col-11 truncate" v-b-tooltip.left="'Date de début du bail'">{{ $dayjs(occupation.dateDeb).format('dddd, DD MMMM YYYY') }}</dt>
                </dl>
            </b-card>  
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
import GmapCustomMarker from 'vue2-gmap-custom-marker';
const php = require("phpjs");
export default {
  components: {
    VueEasyLightbox,
    VueUploadMultipleImage,
    Depense,
    DepenseForm,
    GmapCustomMarker
  },
  props: {
    logement: { type: Object, required: true }
  },
  data: () => ({
    section: "caracteristiques",
    /**
     * Données manipuler par la section des photos
     */
    section_photo: {
      index: 0,
      visible: false,
      images: []
    },
    //données manipulées pour l'ajout d'une dépense
    commandeDepense: false,
    action: "add",
    currentPage: 1,
    perPage: 10,
    source: 2,
    provenance:"2",
    marker:{
      lat:'',
      lng:''
    }
  }),
  computed: {
    photos() {
      return this.logement.photos.map(elt => elt.image);
    },
    caracteristiques() {
      //return this.logement.caracteristiques
      return this.logement.caracteristiques.filter(
        elt => parseInt(elt.valeur) > 0
      );
    },
    itemsDepenses() {
      return php.array_slice(
        this.logement.depenses,
        this.offset,
        this.perPage
      );
    },
     offset() {
        return (this.currentPage * this.perPage) - this.perPage
    }
  },
  mounted() {
    console.log('logement',this.logement);
    this.marker.lat=this.logement.adresse.lat;
    this.marker.lng=this.logement.adresse.lon;
  },
  methods: {
     /**Méthode permettant de voir le détails du locataire
     * directement à partir du détail du logement
     */
    goToDetailLocataire(occupation){
      console.log("locataire", occupation)
      $('#editLayoutItem').modal('hide')
      setTimeout(() => {
        this.$router.push({name: 'habitants', query: {target: occupation.locataire.idLocataire}})
      }, 100);
    },
    /**Méthode permettant de voir l'occupation
     * directement à partir du détail du logement
     */
    goToDetaiOccupation(occupation){
      console.log("locataire", occupation)
      $('#editLayoutItem').modal('hide')
      setTimeout(() => {
        this.$router.push({name: 'occupations', query: {target: occupation.idOccupation}})
      }, 100);
    },


          /**
         * réponse à l'évènement d'ajout d'une dépense
         * dans le détail de la cité, la réponse consiste juste à mettre à jour la liste des dépenses d'un logement
         */
         addedDepense() {
            axios.get(`logements/${this.logement.idLogement}/depenses`).then(response => response.result || []).then(depenses => {
                this.logement.depenses = depenses
                this.section = 'depenses'
            })
        },
    /**
     * Methodes relatives a la section des photos
     */
    section_photo_showImg(index) {
      this.section_photo.index = index;
      this.section_photo.visible = true;
    },
    section_photo_handleHide() {
      this.section_photo.visible = false;
    },
    section_photo_uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    /**
     * supprimer une dépense
     * ceci à pour but de  la marquer comme traitée en back
     */
    removeDepense(idDepense) {
      this.logement.depenses = this.logement.depenses.filter(
        elt => elt.idDepense != idDepense
      );
      this.$emit("depensesChanged", this.logement.depenses);
    },

    onCloseSet() {
      this.commandeDepense = false;
    }
  }
};
</script>

<style>
</style>