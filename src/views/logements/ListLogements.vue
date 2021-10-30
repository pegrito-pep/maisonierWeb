<template>
  <div class="container-fluid">
    <!--page header start -->
    <div class="row">
      <div class="col-md-12">
        <div class="mb-2 clearfix">
          <div class="collapse d-md-block display-options" id="displayOptions">
            <div class="d-block d-md-inline-block">
              <div class="btn-group d-inline-block float-md-left mr-1 mb-1 ">
                <b-form-select v-model="filtre_categories"  style="height: 40px; width: 260px; border-radius: 5px; box-shadow: none">
                  <b-form-select-option :value="null">Filtre de catégories</b-form-select-option>
                  <b-form-select-option-group
                    v-for="(tl, i) in typesLogements"
                    :key="i"
                    :label="tl.libelleType"
                  
                  >
                    <b-form-select-option
                      v-for="(stl, j) in tl.sousTypesLogement"
                      :key="j"
                      :value="stl.idSousType"
                    >{{ stl.libelleSousType }}</b-form-select-option>
                  </b-form-select-option-group>
                </b-form-select>
              </div>
              <SearchForm v-model="search" />
            </div>

            <div class="float-md-right">
              
              <btnAdd  message="Ajouter un logement" v-b-modal.logementForm/>

              <b-button
                v-b-tooltip.top="'Télécharger un fichier modèle pour l\'import de logements en masse'"
                v-b-modal.modal-prevent-closing
                @click.prevent="loadCsv"
                class="btn btn-info ml-4 dispose"
                style="height:45px;"
              >
                <i class="fa fa-download"></i>
              </b-button>

              <!--traitement import liste de logements-->
              <flatfile-button
                class="mt-2"
                :licenseKey="licenseKey"
                :customer="customer"
                :settings="settings"
                :onData="onData"
                type="logement"
              >Ajout de logements en masse</flatfile-button>
            </div>
          </div>
        </div>
        <div class="separator mb-20"></div>
        <b-overlay :show="showOverlay" rounded="sm">
          <b-alert variant="info" class="text-center" show v-if="!logements.length">
            <i class="fa fa-exclamation-triangle fa-3x"></i>
            <br />
            <span class="h4 d-inline-flex ml-2">Aucun logement enregistré pour le moment</span>
          </b-alert>
          <b-row v-else class="layout-wrap">
            <b-col
              v-for="(logement, i) in items"
              :key="logement.idLogement || i"
              lg="4"
              cols="12"
              sm="6"
              class="animated flipInX mb-4"
            >
              <logement
                @makeClone="cloneLogement"
                @makeUpdate="updateLogement"
                @deleted="removeLogement"
                :logement="logement"
                @showDetails="showDetails"
              />
            </b-col>
          </b-row>
          <paginator
            hr="top"
            :offset="offset"
            :total="logements.length || 0"
            :limit="perPage"
            :page="currentPage"
            @pageChanged="(page) => {currentPage = page}"
            @limitChanged="(limit) => {perPage = limit}"
          />
        </b-overlay>
      </div>
    </div>

    <!-- MODALE POUR AFFICHER LES DETAILS D'UN LOGEMENT -->
    <div
      v-if="logement"
      class="modal fade edit-layout-modal"
      id="editLayoutItem"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLayoutItemLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLayoutItemLabel">
              Détails du logement :
              <b>{{ logement.refLogement }}</b>.
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-2">
            <details-logement :logement="logement" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="logement">
      <b-modal
        v-model="clone.enabled"
        :title="'Clonner le logement ' + logement.refLogement"
        @ok="validateClone"
        @hidden="resetCloneForm"
      >
        <template #modal-footer="{ ok }">
          <b-button size="sm" variant="danger" @click="ok()" :disabled="clone.submitted">
            Valider
            <b-spinner v-if="clone.submitted" small />
          </b-button>
        </template>
        <div class="jumbotron pt-10 pb-10">
          <p>Le clonnage de logement vous permet d'ajouter une multitude de logement en se servant d'un logement pré-existant pour générer de nouveaux.</p>
        </div>
        <b-form-group description="Entrez le nombre de logement à générer" label="Nombre de clone">
          <b-form-input
            v-model="clone.nbr"
            type="number"
            :min="1"
            :class="{'is-invalid' : clone.error}"
          />
        </b-form-group>
        <b-form-group
          description="Selectionnez le batiment auquel sera rataché les logements générés"
          label="Batiment"
        >
          <b-form-select v-model="clone.idBatiment">
            <b-form-select-option :value="null">Pas de batiment</b-form-select-option>
            <b-form-select-option-group v-for="(c, i) in cites" :key="i" :label="c.nomCite">
              <b-form-select-option
                v-for="(b, j) in c.batiments"
                :key="j"
                :value="b.idBatiment"
              >{{ b.nomBatiment }}</b-form-select-option>
            </b-form-select-option-group>
          </b-form-select>
        </b-form-group>
      </b-modal>
    </div>
    <!--MODAL POUR AJOUTER OU MODIFIER UN LOGEMENT-->
    <b-modal id="logementForm" ref="logement-form" size="lg" :title="title" ok-title="Fermer" ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
        <div>
            <add-logement @logementAdded="addedLogement" @editSuccessfull="editSuccessfull" :editLogement="logement" :action='action' @closeLogementModal="resetLogementFormProps"/>
        </div>
    </b-modal>

    <load-csv v-if="commandeLoadCsv" />
  </div>
</template>
<script>
import AddLogement from "@/views/logements/LogementForm.vue";
import LoadCsv from "@/views/logements/LoadCsv.vue";
import Logement from "@/components/_patrimoine/Logement.vue";
import DetailsLogement from "@/components/_patrimoine/DetailsLogement.vue";
import SearchForm from "@/components/parts/SearchForm.vue";

import { FlatfileButton } from "@flatfile/vuejs";
const php = require("phpjs");

export default {
  name: "logements",
  components: {
    AddLogement,
    Logement,
    DetailsLogement,
    FlatfileButton,
    LoadCsv,
    SearchForm,
  },
  data: () => ({
    //début données liées à l'import de plusieurs logements

    licenseKey: "6e79e3c9-a02b-44ba-b761-9f18a885e464",
    settings: {
      disableManualInput: true,
      type: "logement",
      title: "Ajout de logements en masse",
      displayEncoding: false,
      /* theme: {
                global: {
                    backgroundColor: "#212327",
                    textColor: "#c2c3c3",
                    primaryTextColor: "#c2c3c3",
                    secondaryTextColor: "#c2c3c3",
                    successColor: "#c2c3c3",
                    warningColor: "#c2c3c3",
                    fontFamily: "font"
                },
          },*/
      fields: [
        {
          label: "reférence",
          key: "ref",
          validators: [{ validate: "required" }]
        },
        { label: "description", key: "description" },
        {
          label: "Prix Minimal",
          key: "prixMin",
          validators: [{ validate: "required" }]
        },
        {
          label: "Prix Maximal",
          key: "prixMax",
          validators: [{ validate: "required" }]
        },
        {
          label: "Nom Sous-type de logement",
          key: "sousTypeLogement",
          validators: [{ validate: "required" }]
        },
        { label: "Nom Batiment", key: "batiment" },
        { label: "Pays", key: "pays", validators: [{ validate: "required" }] },
        {
          label: "Ville",
          key: "ville",
          validators: [{ validate: "required" }]
        },
        { label: "Quartier", key: "quartier" },
        { label: "Latitude", key: "lat" },
        { label: "Longitude", key: "lon" },
        { label: "Nombre de chambres", key: "nombreChambres" },
        { label: "Nombre de cuisines", key: "nombreCuisines" },
        { label: "Nombre de douches", key: "nombreDouches" },
        { label: "Nombre de salons", key: "nombreSalons" },
        { label: "Nombre de parkings", key: "nombreParkings" }
      ]
    },

    customer: {
      userId: "12345"
    },
    overrides: {
      manual: "Did you know you can type in an import below?",
      dropzone: {
        button: "Click me to upload some data."
      }
    },

    //fin données liées à l'import de plusieurs logements
    //propriétées, du fichier modèle

    commandeLoadCsv: false,
    search: null,
    showOverlay: true,
    currentPage: 1,
    perPage: 10,

    logements: [],
    trueLogements: [],
    logement: null,

    typesLogements: [],
    filtre_categories: null,
    title:"Ajouter un logement",
    action:'add',
    cites: [],
    clone: {
      enabled: false,
      submitted: false,
      error: false,
      nbr: null,
      idBatiment: null
    },

    housingToUpload: []
  }),
  computed: {
    /**
     * Elements affichés avec prise en charge de la pagination
     */
    items() {
      return php.array_slice(this.logements, this.offset, this.perPage);
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    }
  },
  watch: {
    /**
     * Filtre les logements en fonction du type de logement selectionné
     */
    filtre_categories(value) {
      this.logements = !php.empty(value)
        ? this.trueLogements.filter(elt => elt.idSousType == value)
        : this.trueLogements;
    },
    search(value) {
      this.logements = !php.empty(value)
        ? this.trueLogements.filter(elt =>
            elt.refLogement.toLowerCase().includes(value.toLowerCase())
          )
        : this.trueLogements;
    }
  },
  beforeMount() {
      /*setTimeout(() => {
          this.getHousing();
      }, 5000)*/
      this.getHousing();
  },
  mounted(){
    /*this.$root.$on('logement-modifie', (logement) => {
          this.logements = this.renameLogements(this.logements, logement);
          this.trueLogements = this.renameLogements(this.trueLogements, logement);
     }) */
  },
  methods: {
        /**
         * Methode permettant de reinitialiser les props du modal
         */
        resetLogementFormProps(){
          this.action='add'
          this.title="Ajouter un logement"
          this.$bvModal.hide('logementForm')
          this.logement=null
        },
        //traitement de l'évènement émis d'ajout d'un logement
        addedLogement() {
            this.getHousing(false);
            this.$bvModal.hide('logementForm')

        },
        editSuccessfull(){
          this.action='add';
          this.title="Ajouter un logement";
          this.$bvModal.hide('logementForm');
          this.logement=null;
          this.getHousing(false);
          /*this.showOverlay=true;
          this.logements = this.renameLogements(this.logements, logement);
          this.trueLogements = this.renameLogements(this.trueLogements, logement);
          this.showOverlay=false;*/
        },
      


    //recupération de la liste des logements
    async getHousing(begin) {
        this.showOverlay = true;
   
          this.logements = this.trueLogements = await axios.get("logements").then(response => response.result || []);
          this.autoAddTarget();
        this.showOverlay = false;
      
        if (begin !== false) {
            this.typesLogements = await axios.get("types-logements?all=true").then(response => response.result || []);
            this.cites = (await axios.get("cites").then(response => response.result || [])).filter(elt => elt.batiments.length > 0);
        }
        
        this.autoDetailsTarget();
    },
       /**
       * Affiche le modal de création d'un= logement directement au chargement de la page
       * ceci est utilisé lorsqu'on est arrivé ici en provenant de la homepage
       */
        autoAddTarget() {
            const formLogement = this.$route.query.formLogement || null;
            if (formLogement) {
                 this.$refs['logement-form'].show();
                window.history.replaceState(
                    {},
                    "",
                    window.location.href.split("?")[0]
                );
                
            }
        },
    /**
     * Affiche automatiquement les details d'un logement au chargement
     * ceci est utilise dans le cas où on a cliqué sur le batiment en etant sur le details d'une cité
     */
    autoDetailsTarget() {
      const target = this.$route.query.target || null;
      if (target) {
        const logement = this.trueLogements.filter(
          elt => elt.idLogement == target
        )[0];
        if (logement) {
          this.showDetails(logement);
          window.history.replaceState(
            {},
            "",
            window.location.href.split("?")[0]
          );
        }
      }
    },

    /**
     * Ouvre le formulaire de clonnage d'un logement
     */
    cloneLogement(logement) {
      this.clone.enabled = true;
      this.clone.idBatiment = logement.idBatiment;
      this.logement = logement;
    },
    /**
     * valide le clonnage d'un logement
     */
    validateClone(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.clone.error = false;

      if (php.empty(this.clone.nbr) || this.clone.nbr < 1) {
        this.clone.error = true;
        return;
      }
      this.clone.submitted = true;

      axios
        .post(`logements/${this.logement.idLogement}/clone`, this.clone)
        .then(response => {
          this.getHousing(false);
          this.resetCloneForm();
          return App.notifySuccess(response.message);
        })
        .catch(error => {
          this.clone.submitted = false;
          return App.alertError(error.message);
        });
    },
    /**
     * Reinitialise le formulaire de clonnage
     */
    resetCloneForm() {
      this.clone = {
        enabled: false,
        submitted: false,
        error: false,
        nbr: null,
        idBatiment: null
      };
    },

    loadCsv() {
      this.commandeLoadCsv = true;
    },
    updateLogement(logement) {
      this.action='edit'
      console.log("logement", logement);
      this.logement=logement
      this.title="édition du logement "+this.logement.refLogement;
      this.$refs['logement-form'].show()
    },
    removeLogement(logement) {
      console.log("logement", logement);
    },

    /**
     * Affiche les details d'un logement
     *
     * @param {Object} logement
     */
    showDetails(logement) {
      this.logement = logement;
      setTimeout(() => {
        $("#editLayoutItem").modal("show");
        $("#editLayoutItem").on("hide.bs.modal", e => {
          this.logement = null;
        });
        $("#editLayoutItem").on("hidden.bs.modal", e => {
          this.logement = null;
        });
      }, 100);
    },

    /**
     * Traitement de l'ajout de logements en masse
     */
    onData(result) {
      let errorState = false;

      for (let i = 0; i < result.$data.length; i++) {
        let adresse = {
          pays: result.$data[i].data.pays,
          ville: result.$data[i].data.ville,
          quartier: result.$data[i].data.quartier,
          lon: result.$data[i].data.lon,
          lat: result.$data[i].data.lat
        };
        let logement = {
          nom: result.$data[i].data.nom,
          ref: result.$data[i].data.ref,
          description: result.$data[i].data.description,
          prixMin: result.$data[i].data.prixMin,
          prixMax: result.$data[i].data.prixMax,
          idSousType: result.$data[i].data.sousTypeLogement,
          idBatiment: result.$data[i].data.batiment,
          adresse: adresse,
          caracteristiques: [
            {
              libelle: "chambre",
              valeur: result.$data[i].data.nombreChambres
            },
            {
              libelle: "salon",
              valeur: result.$data[i].data.nombreChambres
            },
            {
              libelle: "cuisine",
              valeur: result.$data[i].data.nombreChambres
            },
            {
              libelle: "douche",
              valeur:
                result.$data[i].data.nombreDouches != null
                  ? result.$data[i].data.nombreDouches
                  : 0
            },
            {
              libelle: "parkings",
              valeur:
                result.$data[i].data.nombreParkings != null
                  ? result.$data[i].data.nombreParkings
                  : 0
            }
          ]
        };
        console.log("logement final", logement);
        this.housingToUpload.push(logement);
      }
      return new Promise((resolve, reject) => {
        let result;

        for (let j = 0; j < this.housingToUpload.length; j++) {
          try {
            result = axios
              .post("logements", this.housingToUpload[j])
              .then(response => response.result);

            if (j == this.housingToUpload.length - 1) {
              this.getHousing(false);
            }
          } catch (error) {
            console.log(error);
          }
          if (!result) errorState = true;
        }
        setTimeout(() => {
          if (errorState) {
            reject("erreur produite");
            errorState = false;
          } else {
            resolve("import reussi");
          }
        }, 300);
      });
    }
  }
};
</script>
<style scoped>
.dispose {
  margin-top: -0.5em;
}
</style>