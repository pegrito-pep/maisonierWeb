<template>
  <b-modal
    id="modal-lg"
    size="lg"
    ok-only
    ok-title="Valider"
    ref="occupation-modal"
    @hidden="resetModal"
    @ok="submitModal"
    :title="action == 'add' ? 'Affecter une occupation' : 'Edition'"
  >
    <b-overlay :show="showOverlay" rounded="sm">
      <b-row>
        <b-col>
            <b-form-group label="Loyer" description="Combien devra payer le résident" >
                <b-form-input v-model="loyer" placeholder="Ex: 45000" trim></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Mode de paiement"
            description="Le résident devra t-il payer son loyer courant avant ou après l'avoir consommé"
          >
             <b-form-radio-group
                  id="radio-slots"
                  v-model="occupation.mode"
                  :options="options"
                  name="radio-options-slots"
              >
              </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Comment s'effectuera la facturation en eau de ce résident">
              <b-form-select
                v-model="occupation.eau"
                :options="optionscharges"
                class="mb-1"
              ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Comment s'effectuera la facturation en électricité de ce résident">
              <b-form-select
                v-model="occupation.energie"
                :options="optionscharges"
                class="mb-1"
              ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            label="Prix unitaire de l'energie"
            description="L'exemple suggéré suppose une consommation par forfait"
          >
            <b-form-input
              v-model="occupation.puEnergie"
              placeholder="Ex: 2500"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Prix unitaire de l'eau"
            description="l'exemple suggéré suppose une facturation par index du compteur"
          >
            <b-form-input
              v-model="occupation.puEau"
              placeholder="Ex: 150"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5">
          <b-form-group label="Quel est le logement concerné par l'occupation">
            <div style="height: 10.5em">
                <b-form-select
                v-model="occupation.idLogement"
                :options="logements"
                class="mb-1"
                @input="setSlide_logement"
                value-field="idLogement"
                text-field="refLogement"
                disabled-field="notEnabled"
              ></b-form-select>
              <b-carousel :interval="0" controls v-model="selected_index_logement" ref="logementCarousel">
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
        <b-col cols="7">
          <b-form-group label="Qui est le résident pour lequel l'occupation est défini">
            <div style="height: 10.5em">
              <b-form-select
                v-model="occupation.idLocataire"
                :options="locataires"
                class="mb-1"
                @input="setSlide_locataire"
                value-field="idLocataire"
                text-field="nomLocataire"
                disabled-field="notEnabled"
              ></b-form-select>
              <b-carousel :interval="0" controls v-model="selected_index_locataire" ref="locataireCarousel">
                <b-carousel-slide
                  style="height: 10.5em"
                  class="fluid w-100 responsive border-0"
                  v-for="(locataire, i) in locataires"
                  :key="i"
                  :img-src="locataire.avatar"
                />
              </b-carousel>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-overlay>
  </b-modal>
</template>
<script>
import notif from "@/plugins/notif.js";
const php = require("phpjs");

export default {
  name: "occupation-form",
  data: () => ({
    duree: [null, null],
    selected_index_logement: -1,
    selected_index_locataire: -1,
    selected_value: "",
    options: [
          { text: 'Prépayé', value: 'prepayer' },
          { text: 'Postpayé', value: 'postpayer' }
    ],
    optionscharges: [
          { value: 'index', text: 'Index' },
          { value: 'forfait', text: 'Forfait' },
    ],
    occupation: {
      loyer: "",
      mode: "",
      energie: "",
      eau: "",
      puEnergie: "",
      puEau: "",
      idLogement:"",
      debut:""
    },
    showOverlay: false,
    sendForm: false,
    logements: [],
    locataires: []
  }),
  watch: {
    selected_index_logement(value) {
      this.occupation.idLogement = this.logements[value].idLogement;
    },
     selected_index_locataire(value) {
      this.occupation.idLocataire = this.locataires[value].idLocataire;
    }
  },
    computed: {
        loyer: {
            get() {
                const logement = this.logements.filter(elt => elt.idLogement == this.occupation.idLogement)[0]
                if (!logement) {
                    return 0;
                }
                return (logement.prixMin + logement.prixMax) / 2
            },
            set(value) {
                this.occupation.loyer = value
            }      
        }
    },
  props: ["action"],
  methods: {
    empty(val) {
        return php.empty(val)
    },
    /**
     * Set l'image du carousel lorsqu'on change le logement
     */
    setSlide_logement(value) {
      for (let index = 0; index < this.logements.length; index++) {
        if (this.logements[index].idLogement == value) {
          this.$refs.logementCarousel.setSlide(index);
          break;
        }
      }
    },
    setSlide_locataire(value) {
      for (let index = 0; index < this.locataires.length; index++) {
        if (this.locataires[index].idLocataire == value) {
          this.$refs.locataireCarousel.setSlide(index);
          break;
        }
      }
    },

    resetModal() {
      this.occupation = {
        loyer: "",
        mode: "",
        energie: "",
        eau: "",
        puEnergie: "",
        puEau: "",
        idLogement: "",
        idLocataire: "",
        debut:""
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
      if (this.action == "add") {
        this.showOverlay = true;
          axios
            .post("annonces", this.annonce)
            .then(response => {
              notif.success(response.message);
              this.$refs["annonce-modal"].hide();
              this.$emit("annonceAdded");
              return App.notifySuccess(response.message);
            })
            .catch(error => {
              return App.alertError(error.message);
            });
            setTimeout(() => {
                this.showOverlay = false;
            }, 500);
            
      }
    },
   async getInitialiseData(){
     //this.showOverlay = true
        try {
           this.logements = await axios.get("logements").then(response => response.result || []);
        } catch (error) {
           notif.error(error.message);
        }
        try {
           this.locataires = await axios.get("locataires").then(response => response.result || []);
        } catch (error) {
           notif.error(error.message);
        }
        if (this.logements[0]) {
            this.occupation.idLogement = this.logements[0].idLogement;
        }
        if (this.locataires[0]) {
            this.occupation.idLogement = this.logements[0].idLogement;
        }
        //this.showOverlay = false
    },
  
  },
  async mounted() {
    await this.getInitialiseData();
  }
};
</script>
<style scoped>
@font-face {
  font-family: "font-1";
  src: url(/fonts/rampart-one-Font/RampartOne-Regular.ttf);
}
.text-form-annone {
  font-family: "font-1", sans-serif;
  font-size: 2.1em;
  color: #0a0701fa;
}
</style>