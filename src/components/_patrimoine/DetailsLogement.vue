<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{ active: section == 'caracteristiques' }"
          @click.prevent="section = 'caracteristiques'"
          >{{$t('data.logement_detail_caracteristiques')}}</a
        >
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{ active: section == 'annonces' }"
          @click.prevent="section = 'annonces'"
          >{{$t('data.logement_detail_annonces')}}</a
        >
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{ active: section == 'depenses' || section == 'add-depense' }"
          @click.prevent="section = 'depenses'"
          >{{$t('data.logement_detail_depenses')}}</a
        >
      </li>
      <li class="nav-item">
        <a
          data-toggle="tab"
          href="#"
          class="nav-link"
          :class="{ active: section == 'locataire' }"
          @click.prevent="section = 'locataire'"
          >{{$t('data.logement_detail_locataires')}}</a
        >
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade show active">

        <b-container fluid v-if="section == 'caracteristiques'">
          <!--LOGEMENT SUR LA MAP -->
          <b-row
            class="rounded text-white py-2"
            style="margin: 0; background: #f5365c"
          >
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
                {{$t('data.logement_detail_localisation_pays')}}:
                <b class="font-weight-bold">{{ logement.adresse != null ? logement.adresse.pays : (logement.batiment != null ? logement.batiment.adresse.pays : '') }}</b>
              </span>
            </b-col>
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
                {{$t('data.logement_detail_localisation_ville')}}:
                <b class="font-weight-bold">{{ logement.adresse != null ? logement.adresse.ville : (logement.batiment != null ? logement.batiment.adresse.ville : '') }}</b>
              </span>
            </b-col>
            <b-col lg="4" md="6" sm="12">
              <span class="d-inline-block w-100 my-1">
               {{$t('data.logement_detail_localisation_quartier')}}:
                <b class="font-weight-bold">{{ logement.adresse != null ? logement.adresse.quartier : (logement.batiment != null ? logement.batiment.adresse.quartier : '') }}</b>
              </span>
            </b-col>
          </b-row>
          <b-container class="mt-4 p-0">
            <GmapMap
              :center="{
                lat: parseFloat(logement.adresse != null ? logement.adresse.lat : (logement.batiment != null ? logement.batiment.adresse.lat || 0 : 0)),
                lng: parseFloat(logement.adresse != null ? logement.adresse.lon : (logement.batiment != null ? logement.batiment.adresse.lon || 0 : 0)),
              }"
              :zoom="16"
              class="w-100"
              style="height: 340px"
            >
              <gmap-custom-marker :marker="marker">
                <img src="/img/mapMarker.png" />
              </gmap-custom-marker>
            </GmapMap>
          </b-container>
          <hr />
          
          <h2 class="text-capitalize font-weight-bold fs-4">
            {{$t('data.logement_detail_caracteristiques_approfondies')}}
          </h2>
          <b-row>
            <b-col cols="12">
              <span class="d-inline-block w-100 my-1">
                 {{ $t('data.logement_detail_type_logement')}} :
                <b>{{ logement.sousTypeLogement.libelleSousType }}</b>
              </span>
              <span class="d-inline-block w-100 text-muted">
                {{$t('data.logement_detail_date_du_poste')}} :
                <small>{{ logement.createdAt.slice(0, 10) }}</small>
              </span>
            </b-col>

            <b-col cols="12">
              <b-badge
                class="m-1 background"
                v-for="(c, i) in caracteristiques"
                :key="c.idCaracteristique || i"
              >
                <b class="fa-lg">{{ c.valeur }}</b>
                {{ c.libelleCaracteristique }}
              </b-badge>
            </b-col>
          </b-row>
          <div class="jumbotron pt-10 pb-10 mt-2 mb-0">
            <p class="description">{{ logement.descLogement }}</p>
          </div>
          <h2 class="text-capitalize font-weight-bold fs-4 my-4">{{$t('data.logement_detail_photos')}}</h2>

          <div class="row my-4">
            <div v-if="!photos.length" class="col-md-12">
              <div id="logement-main-img">
                <div class="logement-preview">
                  <img src="/img/imagelogementdefault-.jpg" alt="" />
                </div>
              </div>
            </div>
            <div v-if="photos.length == 1" class="col-md-12">
              <div id="logement-main-img">
                <div class="logement-preview">
                  <img :src="photos[0]" alt="" />
                </div>
              </div>
            </div>
            <div v-if="photos.length > 1" class="col-md-3">
              <div id="logement-imgs">
                <div
                  class="logement-preview logement-image"
                  v-for="(photo, i) in newPhotos"
                  :key="i"
                >
                  <img :src="photo" alt="Pas de photo" />
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
          </div>
          <p class="mt-5"></p>
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">{{$t('data.logement_detail_tableau_libelle')}}</th>
                <th scope="col">{{$t('data.logement_detail_tableau_valeur')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{$t('data.logement_detail_titre_etat_logement')}}</td>
                <td>
                  <b-badge
                    v-if="logement.etatLogement"
                    class="mt--1 mr-2 btn bg-badge background rounded-pill"
                  >
                    <small class="fa-sm">{{$t('data.logement_etat_occupe')}}</small>
                  </b-badge>
                  <b-badge
                    v-else
                    class="mt--1 mr-2 btn bg-badge bg-danger rounded-pill"
                  >
                    <small class="fa-sm">{{$t('data.logement_etat_libre')}}</small>
                  </b-badge>
                </td>
              </tr>

              <tr>
                <td>{{$t('data.logement_detail_prix_min_logement')}}</td>
                <td>
                  {{ logement.prixMin }}
                  FCFA
                </td>
              </tr>
              <tr>
                <td>{{$t('data.logement_detail_prix_max_logement')}}</td>
                <td>
                  {{ logement.prixMax }}
                  FCFA
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </b-container>
        <div
          v-if="section == 'annonces'"
          style="height: 75vh; overflow-y: auto; overflow-x: hidden"
        >
          <b-alert
            variant="info"
            show
            class="text-center"
            v-if="!logement.annonces.length"
          >
            <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
            <span class="h4 d-inline-flex ml-2"
              >{{$t('data.Aucune annonce enregistrée pour le moment')}}</span
            >
          </b-alert>
          <b-row>
            <b-col
              cols="12"
              v-for="(annonce, i) in logement.annonces"
              :key="annonce.idAnnonce || i"
            >
              <div class="card p-0 shadow">
                <div class="card-body p-0 d-flex">
                  <b-img
                    :src="photos[i] || photos[0]"
                    style="height: 8em; width: 8em"
                  ></b-img>
                  <div class="ml-2 p-2">
                    <div>
                      <b-badge
                        :variant="annonce.publish ? 'success' : 'danger'"
                        >{{
                          annonce.publish
                            ? "Déja publiée"
                            : "Pas encore publiée"
                        }}</b-badge
                      >&nbsp;
                      <b-badge variant="light">
                        <i class="fa fa-clock"></i>
                        {{$t('data.logement_detail_annonce_creee_le')}}
                        {{ $date(annonce.createdAt).format("DD.MM.YYYY") }}
                      </b-badge>
                    </div>
                    <h5 class="my-2">
                      <a href="#" class="text-red">{{
                        annonce.titreAnnonce
                      }}</a>
                    </h5>
                    <b-badge
                      v-for="(tag, i) in annonce.tags.split(',')"
                      :key="i"
                      variant="secondary"
                      >{{ tag }}</b-badge
                    >
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-container v-if="section == 'depenses' || section == 'add-depense'">
          <div v-if="section == 'depenses'">
            <div class="d-flex justify-content-between border-bottom pb-1 mb-2">
              <div>
                <paginator
                  v-if="logement.depenses.length"
                  no-control
                  :total="logement.depenses.length"
                  :limit="perPage"
                  :page="currentPage"
                  @pageChanged="
                    (page) => {
                      currentPage = page;
                    }
                  "
                  @limitChanged="
                    (limit) => {
                      perPage = limit;
                    }
                  "
                />
              </div>
              <b-button
                size="sm"
                variant="outline-secondary"
                @click.prevent="section = 'add-depense'"
                >{{$t('data.logement_detail_ajouter_depense')}}</b-button
              >
            </div>
            <b-alert variant="info" show v-if="!logement.depenses.length">
              <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
              <span class="h4 d-inline-flex ml-2"
                > {{$t('data.logement_detail_pas_de_depense')}} </span
              >
            </b-alert>
            <div v-else style="height: 75vh">
              <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                <b-row class="layout-wrap">
                  <div
                    v-for="(depense, i) in itemsDepenses"
                    :key="depense.idDepense || i"
                    class="col-12 list-item list-item-thumb"
                  >
                    <depense
                      @deleted="removeDepense"
                      :depense="depense"
                      :source="source"
                      is-sub
                    />
                  </div>
                </b-row>
              </div>
            </div>
          </div>
          <div v-show="section == 'add-depense'">
            <depense-form
              :logement="logement"
              @cancel="section = 'depenses'"
              @depenseAdded="addedDepense"
              :provenance="provenance"
              :action="action"
            />
          </div>
        </b-container>

        <div
          v-if="section == 'locataire'"
          style="height: 38em; overflow-y: auto"
        >
          <b-alert
            variant="info"
            show
            class="text-center"
            v-if="!logement.occupations.length"
          >
            <i class="fa fa-exclamation-triangle fa-3x"></i> <br />
            <span class="h4 d-inline-flex ml-2"
              >{{$t('data.logement_detail_pas_de_locataire_dans_le_logement')}}</span
            >
          </b-alert>
          <b-card
            v-for="(occupation, i) in logement.occupations"
            :key="occupation.idOccupation || i"
            img-fluid
            :img-src="occupation.locataire.avatar || '/img/profile-picture.jpg'"
            img-height="250em"
            img-width="200em"
            img-left
            class="mb-3"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-badge
                class="w-90"
                variant="success"
                v-if="occupation.dateFin == null"
                >{{$t('data.logement_detail_bail_en_cours')}}</b-badge
              >
              <b-badge class="w-90" variant="danger" v-else
                >{{ $t('data.logement_detail_bail_termine_le')}}
                {{ $date(occupation.dateFin).format("DD MMMM YYYY") }}</b-badge
              >
              <b-dropdown
                size="sm"
                right
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content
                  ><i class="fa fa-ellipsis-h"></i
                ></template>
                <!--<b-dropdown-item :to="{name: 'habitants', query: {target: occupation.locataire.idLocataire}}">Détails du locataire</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'details-occupation', params: {id: occupation.idOccupation}}">Détails de l'occupation</b-dropdown-item>-->
                <b-dropdown-item
                  @click.prevent="goToDetailLocataire(occupation)"
                  >{{$t('data.logement_detail_details_du_locataire')}}</b-dropdown-item
                >
                <b-dropdown-item
                  @click.prevent="goToDetaiOccupation(occupation)"
                  >{{$t('data.logement_detail_details_de_occupation')}}</b-dropdown-item
                >
              </b-dropdown>
            </div>
            <hr class="mt-1" />
            <dl class="row text-muted">
              <dd class="my-1 col-1"><i class="fa fa-user"></i></dd>
              <dt
                class="my-1 col-11 truncate"
                v-b-tooltip.left="$t('data.logement_detail_tooltip_nom_et_prenom')"
              >
                {{
                  occupation.locataire.titre +
                  " " +
                  occupation.locataire.nomLocataire +
                  " " +
                  occupation.locataire.prenomLocataire
                }}
              </dt>
              <dd class="my-1 col-1"><i class="fa fa-phone"></i></dd>
              <dt
                class="my-1 col-11 truncate"
                v-b-tooltip.left="$t('data.occupation_numero_telephone')"
              >
                {{ occupation.locataire.tel }}
              </dt>
              <dd v-if="occupation.locataire.email" class="my-1 col-1"><i class="fa fa-envelope"></i></dd>
              <dt v-if="occupation.locataire.email" class="my-1 col-11 truncate" :v-b-tooltip.left="$t('data.occupation_email')">
                {{ occupation.locataire.email }}
              </dt>
              <dd v-if="occupation.locataire.cniLocataire" class="my-1 col-1"><i class="fa fa-id-card"></i></dd>
              <dt v-if="occupation.locataire.cniLocataire"
                class="my-1 col-11 truncate"
                v-b-tooltip.left="$t('data.occupation_numero_cni')"
              >
                {{ occupation.locataire.cniLocataire }}
              </dt>
              <dd v-if="occupation.locataire.dateNaiss" class="my-1 col-1"><i class="fas fa-birthday-cake"></i></dd>
              <dt v-if="occupation.locataire.dateNaiss"
                class="my-1 col-11 truncate"
                v-b-tooltip.left="$t('data.occupation_date_naissance')"
              >
                {{
                  $dayjs(occupation.locataire.dateNaiss).format("DD MMMM YYYY")
                }}
              </dt>
              <dd class="my-1 col-1"><i class="fa fa-calendar"></i></dd>
              <dt
                class="my-1 col-11 truncate"
                v-b-tooltip.left="$t('data.occupation_informations_date_debut_bail')"
              >
                {{ $dayjs(occupation.dateDeb).format("dddd, DD MMMM YYYY") }}
              </dt>
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
import GmapCustomMarker from "vue2-gmap-custom-marker";
const php = require("phpjs");
export default {
  components: {
    VueEasyLightbox,
    VueUploadMultipleImage,
    Depense,
    DepenseForm,
    GmapCustomMarker,
  },
  props: {
    logement: { type: Object, required: true },
  },
  data: () => ({
    section: "caracteristiques",
    /**
     * Données manipuler par la section des photos
     */
    section_photo: {
      index: 0,
      visible: false,
      images: [],
    },
    //données manipulées pour l'ajout d'une dépense
    commandeDepense: false,
    action: "add",
    currentPage: 1,
    perPage: 10,
    source: 2,
    provenance: "2",
    marker: {
      lat: "",
      lng: "",
    },
    currentPicture: "",
    newPhotos: [],
  }),
  computed: {
    photos() {
      return this.logement.photos.map((elt) => elt.image);
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
    this.marker.lat = this.logement.adresse.lat;
    this.marker.lng = this.logement.adresse.lon;
  },
  methods: {
    /**Méthode permettant de voir le détails du locataire
     * directement à partir du détail du logement
     */
    goToDetailLocataire(occupation) {
      console.log("locataire", occupation);
      $("#editLayoutItem").modal("hide");
      setTimeout(() => {
        this.$router.push({
          name: "habitants",
          query: { target: occupation.locataire.idLocataire },
        });
      }, 100);
    },
    /**Méthode permettant de voir l'occupation
     * directement à partir du détail du logement
     */
    goToDetaiOccupation(occupation) {
      console.log("locataire", occupation);
      $("#editLayoutItem").modal("hide");
      setTimeout(() => {
        this.$router.push({
          name: "occupations",
          query: { target: occupation.idOccupation },
        });
      }, 100);
    },

    /**
     * réponse à l'évènement d'ajout d'une dépense
     * dans le détail de la cité, la réponse consiste juste à mettre à jour la liste des dépenses d'un logement
     */
    addedDepense() {
      axios
        .get(`logements/${this.logement.idLogement}/depenses`)
        .then((response) => response.result || [])
        .then((depenses) => {
          this.logement.depenses = depenses;
          this.section = "depenses";
        });
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
        (elt) => elt.idDepense != idDepense
      );
      this.$emit("depensesChanged", this.logement.depenses);
    },

    onCloseSet() {
      this.commandeDepense = false;
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
    goDown() {},
  },
};
</script>

<style scoped>
#logement-main-img {
  height: 350px;
  width: 100%;
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
.logement-preview:nth-child(2) {
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
.background {
  background: #f5365c;
}
p.description::first-letter {
  font-size: 40px;
  text-transform: uppercase;
}
</style>