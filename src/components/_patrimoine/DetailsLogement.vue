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
          :class="{'active' : section == 'localisation'}"
          @click.prevent="section = 'localisation'"
        >Localisation</a>
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{'active' : section == 'photos'}"
          @click.prevent="section = 'photos'"
        >Photos</a>
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
          :class="{'active' : section == 'depenses'}"
          @click.prevent="section = 'depenses'"
        >Dépenses liées au logement</a>
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade show active">
        <b-container
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
        </b-container>
        <b-container fluid v-if="section == 'localisation'">
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
        </b-container>
        <b-container fluid v-if="section == 'caracteristiques'">
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
        </b-container>
        <div
          v-if="section == 'annonces'"
          style="height: 75vh; overflow-y: auto; overflow-x: hidden"
        >
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
        <div v-if="section == 'depenses'">
          <b-alert variant="info" show v-if="!logement.depenses.length">
            <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
            <span class="h4 d-inline-flex ml-2">Aucune dépense enregistrée pour le moment</span>
          </b-alert>
          <div v-if="logement.depenses.length>0" style="height: 75vh;">
            <b-row>
              <paginator
                no-control
                hr="bottom"
                :total="logement.depenses.length"
                :limit="perPage"
                :page="currentPage"
                @pageChanged="(page) => {currentPage = page}"
                @limitChanged="(limit) => {perPage = limit}"
              />
            </b-row>
            <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
              <b-row class="layout-wrap">
                <b-col v-for="(depense, i) in itemsDepenses" :key="depense.idDepense || i" cols="6">
                  <depense @deleted="removeDepense" :depense="depense" :source="source" is-sub />
                </b-col>
              </b-row>
            </div>
            <depense-form
              @depenseAdded="pushDepense"
              v-if="commandeDepense"
              :action="action"
              :logement="logement"
              @closeDepenseModal="onCloseSet"
            />
          </div>
          <div>
            <b-button variant="danger" @click.prevent="defineDepense" v-b-modal.modal-lg>
              <i class="fa fa-plus-circle"></i> Nouvelle dépense
            </b-button>
          </div>
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
const php = require("phpjs");
export default {
  components: {
    VueEasyLightbox,
    VueUploadMultipleImage,
    Depense,
    DepenseForm
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
    action: "",
    currentPage: 1,
    perPage: 10,
    source: 2
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
    console.log(this.logement);
  },
  methods: {
    pushDepense(newDepense) {
      this.logement.depenses.unshift(newDepense);
      this.commandeDepense = false;
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
    /**
     *traitement de l'appel à l'ajout d'une dépense dans le détail de la cité
     */
    defineDepense() {
      console.log("enter", this.logement);
      (this.action = "add"), (this.commandeDepense = true);
    },
    onCloseSet() {
      this.commandeDepense = false;
    }
  }
};
</script>

<style>
</style>