<template>
  <div class="container-fluid">
    <!--page header start -->
    <page-description
      title="Dépenses"
      description="Gestion de vos dépenses"
      icon="home"
      :path="['Staitstiques', 'Mes Dépenses']"
    />
    <div class="row">
      <div class="col-md-12">
        <div class="mb-2 clearfix">
          <div class="collapse d-md-block display-options" id="displayOptions">
            <div class="d-block d-md-inline-block">
              <div class="btn-group float-md-left mr-1 mb-1">
                <b-form-select v-model="filtre_categories" size="sm" style="box-shadow: none">
                  <b-form-select-option :value="null">Filtre de catégories</b-form-select-option>
                  <b-form-select-option-group
                    v-for="(cite, i) in cites"
                    :key="i"
                    :label="cite.nomCite"
                  >
                    <b-form-select-option
                      v-for="(batiment, j) in cite.batiments"
                      :key="j"
                      :value="batiment.nomBatiment"
                    >{{ batiment.nomBatiment }}</b-form-select-option>
                  </b-form-select-option-group>
                </b-form-select>
              </div>
              <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <form action onsubmit="return false">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Recherche..."
                    v-model="search"
                  />
                  <button type="submit" class="btn btn-icon">
                    <i class="ik ik-search"></i>
                  </button>
                </form>
              </div>
            </div>

            <div class="float-md-right">
              <b-button variant="danger" @click.prevent="addDepense" v-b-modal.modal-lg>
                <i class="fa fa-plus-circle"></i> Nouvelle dépense
              </b-button>

            </div>
          </div>
        </div>
        <div class="separator mb-20"></div>
        <b-overlay :show="showOverlay" rounded="sm">
          <b-alert variant="info" class="text-center" show v-if="!depenses.length">
            <i class="fa fa-exclamation-triangle fa-3x"></i>
            <br />
            <span class="h4 d-inline-flex ml-2">Aucune dépense enregistrée pour le moment</span>
          </b-alert>
          <b-row v-else class="layout-wrap">
            <b-col
              v-for="(depense, i) in depenses"
              :key="depense.idDepense || i"
              lg="4"
              cols="12"
              sm="6"
              class="animated flipInX mb-4"
            >
              <depense
                @makeUpdate="updateDepense"
                @deleted="removeDepense"
                :depense="depense"
                :soure="source"
                @showDetails="showDetails"
              />
            </b-col>
          </b-row>
          <paginator
            hr="top"
            :offset="offset"
            :total="depenses.length || 0"
            :limit="perPage"
            :page="currentPage"
            @pageChanged="(page) => {currentPage = page}"
            @limitChanged="(limit) => {perPage = limit}"
          />
        </b-overlay>
      </div>
    </div>

    <!-- MODALE POUR AFFICHER LES DETAILS D'UNE  DEPENSE -->
    <div
      v-if="depense"
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
              Détails de la dépense:
              <b>{{ depense.motif }}</b>.
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-2">
            <details-depense :depense="depense" />
          </div>
        </div>
      </div>
    </div>
    <depense-form @depenseAdded="pushDepense" v-if="commandeDepense" :action="action" :cite="cite" :batiment="batiment" :logement="logement" @resetdepenseForm="onCloseSet" />
  </div>
</template>
<script>
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
/*import DetailsLogement from "@/components/_patrimoine/DetailsLogement.vue";*/

const php = require("phpjs");

export default {
  name: "depenses",
  components: {
    DepenseForm,
    Depense
  },
  data: () => ({
    //données liées au composant dépense
    commandeDepense: false,
    cite:null,
    batiment:null,
    logement:null,
    source:0,

    search: null,
    showOverlay: true,
    currentPage: 1,
    perPage: 10,
    action:'',
    depenses: [],
    trueDepenses: [],
    depense: null,

    typesLogements: [],
    filtre_categories: null,

    cites: [],
    clone: {
      enabled: false,
      submitted: false,
      error: false,
      nbr: null,
      idBatiment: null
    },

  }),
  computed: {
    /**
     * Elements affichés avec prise en charge de la pagination
     */
    items() {
      return php.array_slice(this.depenses, this.offset, this.perPage);
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
      this.depenses = !php.empty(value)
        ? this.trueDepenses.filter(elt => elt.idSousType == value)
        : this.trueDepenses;
    },
    search(value) {
      this.depenses = !php.empty(value)
        ? this.trueDepenses.filter(elt =>
            elt.nomLogement.toLowerCase().includes(value.toLowerCase())
          )
        : this.trueDepenses;
    }
  },
  beforeMount() {
    this.getDepenses();
  },
  mounted() {

    /*this.$root.$on("depenseAdded", newDepense => {
      this.depenses.unshift(newDepense);
    });*/
  },
  methods: {
    pushDepense(){
      this.getDepenses();
    },
    /**
     * reception de l'évènement émis de fermeture du modal d'ajout d'un logement
     * ceci permet de re-initialiser le composant(formwizard) d'ajout d'un logement de manière appropriée
     */
    onCloseSet() {
      this.commandeDepense = false;
    },
    //recupération de la liste des logements
    async getDepenses(begin) {
      this.showOverlay = true;
      this.depenses = this.trueDepenses = await axios
        .get("depenses")
        .then(response => response.result || []);
      this.showOverlay = false;
      if (begin !== false) {
        this.cites = await axios.get("cites").then(response => response.result || [])
        
      }
      this.autoDetailsTarget();
    },
    /**
     * Affiche automatiquement les details d'une dépense au chargement
     * ceci est utilise dans le cas où on a cliqué sur la dépense en etant sur le details d'une cité, d'un batiment ou d'un logement
     */
    autoDetailsTarget() {
      const target = this.$route.query.target || null;
      if (target) {
        const depense = this.trueDepenses.filter(
          elt => elt.idDepense == target
        )[0];
        if (depense) {
          this.showDetails(depense);
          window.history.replaceState(
            {},
            "",
            window.location.href.split("?")[0]
          );
        }
      }
    },


    addDepense() {
      this.action="add";
      this.commandeDepense = true;
    },
    updateDepense(depense) {
      console.log("depense", depense);
    },
    removeDepense(depense) {
      console.log("depense", depense);
    },

    /**
     * Affiche les details d'un logement
     *
     * @param {Object} depense
     */
    showDetails(depense) {
      this.depense = depense;
      setTimeout(() => {
        $("#editLayoutItem").modal("show");
        $("#editLayoutItem").on("hide.bs.modal", e => {
          this.depense = null;
        });
        $("#editLayoutItem").on("hidden.bs.modal", e => {
          this.depense = null;
        });
      }, 100);
    },

  }
};
</script>
