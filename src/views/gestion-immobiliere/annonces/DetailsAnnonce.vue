<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#caracteristiques"
          class="nav-link"
          :class="{ active: section == 'caractéristiques' }"
          @click.prevent="section = 'caracteristiques'"
          >Caractéristiques</a
        >
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#propositions"
          class="nav-link"
          :class="{ active: section == 'propositions' }"
          @click.prevent="section = 'propositions'"
          >Propositions</a
        >
      </li>
      
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade show active">
        <b-container fluid v-if="section == 'caracteristiques'">
          <!--Annonce SUR LA MAP -->
          <h2 class="text-capitalize font-weight-bold fs-4">Localisation</h2>
          <b-row
            class="rounded text-white py-2"
            style="margin: 0; background: #f5365c"
          >
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
                Pays:
                <b class="font-weight-bold">{{
                  annonce.logement.adresse.pays
                }}</b>
              </span>
            </b-col>
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
                Ville:
                <b class="font-weight-bold">{{
                  annonce.logement.adresse.ville
                }}</b>
              </span>
            </b-col>
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
                Quartier:
                <b class="font-weight-bold">{{
                  annonce.logement.adresse.quartier
                }}</b>
              </span>
            </b-col>
          </b-row>
          <b-container class="mt-4 p-0">
            <div class="map-container">
              <GmapMap
                :center="{
                  lat: parseFloat(annonce.logement.adresse.lat),
                  lng: parseFloat(annonce.logement.adresse.lon),
                }"
                :zoom="14"
                class="w-100"
                style="height: 340px"
              >
                <gmap-custom-marker :marker="marker">
                  <!--<img src="/img/mapMarker.png" @mouseover="showCoordonates"/>-->
                  <img
                    src="/img/mapMarker.png"
                    @mouseenter="showCoordonates"
                    @mouseleave="hidecoordonates"
                  />
                </gmap-custom-marker>
              </GmapMap>
              <div v-show="dvisible" class="mini-composant">
                <div class="internal">
                  <p>
                    Pays: <span>{{ annonce.logement.adresse.pays }}</span>
                  </p>
                  <p>
                    Ville: <span>{{ annonce.logement.adresse.ville }}</span>
                  </p>
                  <p>
                    Quartier: <span>{{ annonce.logement.adresse.quartier }}</span>
                  </p>
                </div>
              </div>
            </div>
          </b-container>
          <hr />
          <vue-easy-lightbox
            :visible="section_photo.visible"
            :imgs="photos"
            :index="section_photo.index"
            @hide="section_photo_handleHide"
          />
          <hr />
          <h2 class="text-capitalize font-weight-bold fs-4 my-4">
            Caractéristiques approfondies
          </h2>
          <b-row>
            <b-col cols="12">
              <span class="d-inline-block w-100 my-1 h6">
                Titre:
                <strong>{{ annonce.titreAnnonce }}</strong>
              </span>
              <span class="d-inline-block w-100 text-muted">
                Posté le :
                <small>{{ annonce.createdAt.slice(0, 10) }}</small>
              </span>
            </b-col>
            <b-col cols="12">
              <div>
                <b-badge
                  class="m-1 bg-badge background"
                  v-for="(c, i) in tags"
                  :key="c || i"
                >
                  <b class="fa-lg h6">{{ c }}</b>
                </b-badge>
              </div>
            </b-col>
          </b-row>
          <div class="jumbotron pt-0 pb-10 mt-2 mb-0">
            <p class="text-justify description">{{ annonce.descAnnonce }}</p>
          </div>
          <!--Annonce SUR LA MAP -->
          <h2 class="text-capitalize font-weight-bold fs-4 my-4">Photos</h2>

          <div class="row">
            <div v-if="photos.length > 1" class="col-md-3">
              <div id="logement-imgs">
                <div
                  class="logement-preview logement-image"
                  v-for="(photo, i) in newPhotos"
                  :key="i"
                >
                  <img :src="photo" alt="" />
                </div>

                <div class="icon-up" @click="goUp">
                  <i class="fa fa-chevron-up"></i>
                </div>
                <div class="icon-down" @click="goDown">
                  <i class="fa fa-chevron-down"></i>
                </div>
              </div>
            </div>
            <div v-if="photos.length > 1" class="col-md-9">
              <div id="logement-main-img">
                <div class="logement-preview">
                  <img :src="currentPicture" alt="" />
                </div>
              </div>
            </div>
            <div v-else class="col-md-12">
              <div id="logement-main-img">
                <div class="logement-preview">
                  <img :src="currentPicture" alt="" />
                </div>
              </div>
            </div>
          </div>
          
          <h2 class="text-capitalize font-weight-bold fs-4 my-4">
            Informations sur le logement
          </h2>
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Libellé</th>
                <th scope="col">Valeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Etat du logement</td>
                <td>
                  <b-badge
                    v-if="!annonce.logement.etatLogement"
                    class="mt--1 mr-2 btn bg-badge background rounded-pill"
                  >
                    <small class="fa-sm">Logement occupé</small>
                  </b-badge>
                  <b-badge
                    v-else
                    class="mt--1 mr-2 btn bg-badge bg-danger rounded-pill"
                  >
                    <small class="fa-sm">Logement libre</small>
                  </b-badge>
                </td>
              </tr>
              <tr>
                <td>Prix du logement</td>
                <td>
                  {{
                    (annonce.logement.prixMax + annonce.logement.prixMin) / 2
                  }}
                  FCFA
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </b-container>
        <b-container fluid v-if="section == 'propositions'">
          <!--Annonce SUR LA MAP -->
          <h2 class="text-capitalize font-weight-bold fs-4 mb-4">
            Propositions
          </h2>
          <!-- <hr /> -->
          <p class="btn btn-secondary position-relative rounded-pill mt-3 mr-2">
            proposition(s)
            <span
              class="
                position-absolute
                top-0
                start-100
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
            >
              {{ annonce.nbrPropostions }}
              <span class="visually-hidden"></span>
            </span>
          </p>
          <hr />
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
const php = require("phpjs");
import GmapCustomMarker from "vue2-gmap-custom-marker";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  components: {
    VueEasyLightbox,
    GmapCustomMarker,
  },
  props: {
    annonce: { type: Object, required: true },
  },
  data: () => ({
    section: "caracteristiques",
    /**
     * Données manipuler par la section des photos
     */
    marker: {
      lat: "",
      lng: "",
    },
    dvisible: false,
    section_photo: {
      index: 0,
      visible: false,
      images: [],
    },
    tags: [],
    currentPicture: "",
    newPhotos: [],
  }),
  computed: {
    latitude_5() {
      return Number(this.annonce.logement.adresse.lat).toFixed(5);
    },
    longitude_5() {
      return Number(this.annonce.logement.adresse.lon).toFixed(5);
    },
    photos() {
      return this.annonce.photos;
    },
    caracteristiques() {
      //return this.logement.caracteristiques
      return this.logement.caracteristiques.filter(
        (elt) => parseInt(elt.valeur) > 0
      );
    },
    itemsDepenses() {
      return php.array_slice(this.logement.depenses, this.offset, this.perPage);
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
  },
  mounted() {
    this.newPhotos = this.photos.slice(0, 3);
    this.currentPicture = this.newPhotos[0];
  
    this.tags = this.annonce.tags.split(",");
    this.marker.lat = this.annonce.logement.adresse.lat;
    this.marker.lng = this.annonce.logement.adresse.lon;
  },
  methods: {
    /**
     * affiche les coordonnées de la position au survol sur le marker
     */
    showCoordonates() {
      //this.dvisible = !this.dvisible;
      this.dvisible = true;
    },
    hidecoordonates() {
      this.dvisible = false;
    },

    /**
     * Methodes relatives a la section des photos
     */
    section_photo_showImg(index) {
      // this.section_photo.index = index;
      // this.section_photo.visible = true;
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

    goUp() {
      let width = document.querySelector("#logement-main-img").offsetHeight / 3;
      let images = document.querySelectorAll(".logement-image");

      for (let i = 0; i < images.length; i++) {
        images[i].style.height = width + "px";
      }
      let index = this.photos.indexOf(this.currentPicture);

      this.newPhotos = this.photos.slice(index, index + 3);
      if (this.newPhotos.length < 3) {
        console.log("Taille incomplète !!!");
        let j = 0;
        while (this.newPhotos.length < 3) {
          this.newPhotos.push(this.photos[j]);
          j += 1;
        }
      }
      if (this.photos[index + 1]) {
        this.currentPicture = this.photos[index + 1];
      } else {
        this.currentPicture = this.photos[0];
      }
    },
    goDown() {
      
    },
  },
};
</script>

<style scoped>
.nav-item .active {
  background: #f5365c;
  color: #ffffff;
  font-weight: 600;
}
p.description::first-letter {
  font-size: 40px;
}
.background {
  background: #f5365c;
}
.current-picture {
  width: 24rem;
  height: 24rem;
}


.map-container {
  position: relative;
}
.mini-composant {
  width: 200px;
  height: auto;
  border-radius: 8px;
  background-color: #191c22;
  color: #fff;
  padding: 10px 20px;
  position: absolute;
  top: 21%;
  left: 43%;
}
.mini-composant .internal1 {
  width: 40%;
  float: left;
}
.mini-composant .internal2 {
  width: 60%;
  float: right;
}

/* =========================  new ================================= */

#logement-main-img {
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}

#logement-main-img .logement-preview,
#logement-main-img .logement-preview img {
  height: 100%;
  width: 100%;
}

#logement-imgs {
  overflow: hidden;
}

#logement-imgs .logement-preview {
  width: 100%;
  height: 8rem;
  overflow: inherit;
}
#logement-imgs .logement-preview img {
  width: 100%;
  height: 100%;
  transition: 1s all ease;
}
.logement-preview:nth-child(2){
  border: 2px solid blue;
  transition: 1s all ease;
}

.icon-up,
.icon-down {
  background: gray;
  padding: 5px;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  position: absolute;
  left: 50%;
}

.icon-up {
  top: 0;
  transform: translate(-50%, -50%);
}

.icon-down {
  display: none;
  bottom: 0;
  transform: translate(-50%, 50%);
}

.icon-up .fa,
.icon-down .fa {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding-top: 8px;
}
</style>