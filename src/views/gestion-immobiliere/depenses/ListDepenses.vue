<template>
  <div class="container-fluid">
    <!--page header start -->
    <page-description :path="[{label: $t('data.liste_depenses_mes_depenses'), route: 'depenses'},]" />
    <div class="row">
      <div class="col-md-12">
        <div class="mb-2 clearfix">
          <div class="collapse d-md-block display-options" id="displayOptions">
            <div class="d-block d-md-inline-block">
              <!--<div class="btn-group float-md-left mr-1 mb-1">
                <b-form-select v-model="filtre_categories" style="box-shadow: none; height: 40px; width: 260px;">
                  <b-form-select-option :value="null">{{$t("data.Filtre_de_categories")}}</b-form-select-option>
                  <b-form-select-option-group
            
                  >
                    <b-form-select-option
                  
                    ></b-form-select-option>
                  </b-form-select-option-group>
                </b-form-select>
              </div>-->
              <SearchForm v-model="search" />
            </div>

            <div class="float-md-right d-flex" v-if="canCreateDepense">
              <paginatorTop :offset="offset" :libelle='$t("data.depenses")' :total="depenses.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" class="mr-2 d-flex justify-content-center align-items-center" />
              <btnAdd  :message="$t('data.liste_depenses_ajouter_une_depense')" v-b-modal.depenseForm/>
            </div>
          </div>
        </div>
        <div class="separator mb-20"></div>
        <b-overlay :show="showOverlay" rounded="sm">
          <b-alert variant="info" class="text-center" show v-if="!depenses.length">
            <i class="fa fa-exclamation-triangle fa-3x"></i>
            <br />
            <span class="h4 d-inline-flex ml-2">{{$t('data.liste_depenses_pas_depenses')}}</span>
          </b-alert>
          <b-row v-else class="layout-wrap">
            <div v-for="(depense, i) in depenses" :key="depense.idDepense || i" class="col-xl-6 col-md-12 list-item list-item-thumb animated flipInX mb-2">
                <depense
                @makeUpdate="updateDepense"
                @deleted="removeDepense"
                :depense="depense"
                :soure="source"
                @showDetails="showDetails"
              />
            </div>
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
             {{$t('data.liste_depenses_details_depense')}}:
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
    <!--MODAL POUR AJOUTER OU MODIFIER UNE DEPENSE-->
    <b-modal id="depenseForm" size="lg" hide-footer no-close-on-backdrop>
        <template #modal-title>
          <span class="ml-4 text-form-depense">{{ title }}</span>
        </template>
        <div>
            <depense-form @depenseAdded="pushDepense" :action="action" />
        </div>
    </b-modal>
  </div>
</template>
<script>
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
/*import DetailsLogement from "@/components/_patrimoine/DetailsLogement.vue";*/
import SearchForm from "@/components/parts/SearchForm.vue";

const php = require("phpjs");

export default {
  name: "depenses",
  components: {
    DepenseForm,
    Depense,
    SearchForm,
  },
  data: () => ({
    //données liées au composant dépense
    cite:null,
    batiment:null,
    logement:null,
    source:0,
    title:"Définir une dépense",
    search: null,
    showOverlay: true,
    currentPage: 1,
    perPage: 10,
    action:'add',
    depenses: [],
    trueDepenses: [],
    depense: null,

    typesLogements: [],
    filtre_categories: null,
    permissions: storage.get("userPermissions")

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
    },
    canCreateDepense(){
      if(this.permissions.includes("create_depense")){
            return true;
        }
        return false;   
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
      console.log(this.depenses);
      this.depenses = !php.empty(value)
        ? this.trueDepenses.filter(elt =>
            elt.motif.toLowerCase().includes(value.toLowerCase())
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
      this.$bvModal.hide('depenseForm');
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
<style scoped>
.text-form-depense {
    font-size: 1.3em;
    color: #212121ef;
    font-weight: 800;
    text-align: center;
    margin-top: 2px;
}

</style>
