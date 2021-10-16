<template>
        <b-overlay :show="showOverlay" rounded="sm">
            <b-row>
                <b-col>
                    <b-form-group label="Loyer" description="Combien devra payer le résident" >
                        <b-form-input v-model="loyer" placeholder="Ex: 45000" trim></b-form-input>
                </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Mode de paiement" description="Le résident devra t-il payer son loyer courant avant ou après l'avoir consommé">
                        <b-form-radio-group v-model="occupation.mode" name="radio-options-slots" :options="[
                            { text: 'Prépayé', value: 'prepayer' }, { text: 'Postpayé', value: 'postpayer' }
                        ]"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Facturation d'eau" description="Comment s'effectuera la facturation en eau de ce résident">
                        <b-form-select v-model="occupation.eau" class="mb-1" :options="[
                            { value: 'index', text: 'Index' }, { value: 'forfait', text: 'Forfait' },
                        ]" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group :label="occupation.eau == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'eau'" description="L'exemple suggéré suppose une facturation par index du compteur">
                        <b-form-input min="0" v-model="occupation.puEau" placeholder="Ex: 150" trim type="number" />
                    </b-form-group>
                </b-col>
                <b-col v-if="occupation.eau == 'index'">
                    <b-form-group label="Index initial" description="Index du compteur d'eau à l'entrée du locataire">
                        <b-form-input min="0" v-model="indexEau" placeholder="Ex: 095" trim type="number" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Facturation d'électricité" description="Comment s'effectuera la facturation en électricité de ce résident">
                    <b-form-select class="mb-1" v-model="occupation.energie" :options="[
                            { value: 'index', text: 'Index' }, { value: 'forfait', text: 'Forfait' },
                        ]" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group :label="occupation.energie == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'energie'" description="L'exemple suggéré suppose une consommation par forfait">
                        <b-form-input min="0" v-model="occupation.puEnergie" placeholder="Ex: 2500" trim type="number" />
                    </b-form-group>
                </b-col>
                <b-col v-if="occupation.energie == 'index'">
                    <b-form-group label="Index initial" description="Index du compteur d'energie à l'entrée du locataire">
                        <b-form-input min="0" v-model="indexEnergie" placeholder="Ex: 095" trim type="number" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="mb-4">
                <b-col>
                    <b-form-group label="Quel est le logement concerné par l'occupation">
                        <div style="height: 10.5em">
                            <v-select :options="logements" v-model="occupation.idLogement" :reduce="logement => logement.idLogement" label="refLogement"  @input="setSlide_logement" />
                            <b-carousel :interval="0" controls v-model="selected_index_logement" ref="logementCarousel">
                                <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0" 
                                    v-for="(logement, i) in logements" :key="i" :img-src="empty(logement.photos) ? '/img/bgHousing.jpg' : logement.photos[0].image"
                                />
                            </b-carousel>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Qui est le résident pour lequel l'occupation est défini">
                        <div style="height: 10.5em">
                            <v-select :options="locataires" v-model="occupation.idLocataire" :reduce="locataire => locataire.idLocataire" label="nomLocataire"  @input="setSlide_locataire" :disabled="disabled" />
                            <!--<v-select :options="locataires" v-model="occupation.idLocataire" label="nomLocataire"  @input="setSlide_locataire"  :class="{ disabled: disabled == true }" />-->
                            <b-carousel :interval="0" controls v-model="selected_index_locataire" ref="locataireCarousel" v-if="provenance =='1'">
                                <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0"
                                    v-for="(locataire, i) in locataires" :key="i" :img-src="locataire.avatar"
                                />
                            </b-carousel>
                            <b-carousel :interval="0" controls v-model="selected_index_locataire" ref="locataireCarousel" v-if="provenance =='2'">
                                <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0"
                                  :img-src="locataire.avatar"
                                />
                            </b-carousel>
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col>
                    <b-form-group label="Date de debut du bail">
                        <date-picker v-model="occupation.debut" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                    </b-form-group>
                </b-col>
                <b-col class="mt-4">
                     <b-form-checkbox v-model="occupation.endLastBail" switch>
                        <span class="fa-lg">Mettre fin au bail précédent</span>
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <hr>
             <div class="float-right"><b-button @click.prevent="submitModal" variant="primary">Valider</b-button></div>
        </b-overlay>

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

import notif from "@/plugins/notif.js";
const php = require("phpjs");

export default {
  name: "occupation-form",
    components: {
        DatePicker
    },
    props: {
        locataire: { type: Object},
        provenance: {type: Number, required: true, default: "1"},
        action: {type: String, required: true, default: "add"}
    },
  data: () => ({
    duree: [null, null],
    selected_index_logement: -1,
    selected_index_locataire: -1,
    selected_value: "",
    occupation: {
      loyer: "",
      mode: "",
      energie: "index",
      eau: "index",
      puEnergie: "",
      puEau: "",
      idLogement: "",
      idLocataire: "",
      debut:"",
      indexEnergie: 0,
      indexEau: 0,
      endLastBail: false
    },
    showOverlay: false,
    sendForm: false,
    logements: [],
    locataires: [],
    /*données manipulées du fait de l'appel du fait
    *de l'appel du formulaire de création d'un occupation 
    *à différents endroits
    */
   disabled:false,
   stateLocataire:null
  }),
  watch: {
    selected_index_logement(value) {
        const logement = this.logements[value]

        this.occupation.idLogement = logement.idLogement;
        this.indexEnergie = (logement.lastIndexEnergie) ? logement.lastIndexEnergie.nouveau : 0
        this.indexEau = (logement.lastIndexEau) ? logement.lastIndexEau.nouveau : 0
    },
     selected_index_locataire(value) {
      this.occupation.idLocataire = this.locataires[value].idLocataire;
    }
  },
    computed: {
        logementSelected() {
            return this.logements.find(elt => elt.idLogement == this.occupation.idLogement)
        },
        loyer: {
            get() {
                const logement = this.logementSelected
                if (!logement) {
                    return 0;
                }
                return (logement.prixMin + logement.prixMax) / 2
            },
            set(value) {
                this.occupation.loyer = value
            }      
        },
        indexEnergie: {
            get() {
                const logement = this.logementSelected
                if (logement && logement.lastIndexEnergie) {
                    return logement.lastIndexEnergie.nouveau
                }
                return 0
            },
            set(value) {
               this.occupation.indexEnergie = value
            }
        },
        indexEau: {
            get() {
                const logement = this.logementSelected
                if (logement && logement.lastIndexEau) {
                    return logement.lastIndexEau.nouveau
                }
                return 0
            },
            set(value) {
              this.occupation.indexEau = value
            }
        }
    },
  methods: {
    empty(val) {
        return php.empty(val)
    },

    /**
     * Set l'image du carousel lorsqu'on change le logement
     */
    setSlide_logement(value) {
        for (let index = 0; index < this.logements.length; index++) {
            const logement = this.logements[index]
            if (logement.idLogement == value) {
                this.$refs.logementCarousel.setSlide(index);
                this.indexEnergie = (logement.lastIndexEnergie) ? logement.lastIndexEnergie.nouveau : 0
                this.indexEau = (logement.lastIndexEau) ? logement.lastIndexEau.nouveau : 0
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
        energie: "index",
        eau: "index",
        puEnergie: "",
        puEau: "",
        idLogement: "",
        debut:"",
        indexEnergie: 0,
        indexEau: 0,
        endLastBail: false
      };
      if(this.provenance !=2){
        this.occupation.idLocataire=''
        this.occupation.idLogement=''
      }
    },

    //validation formulaire d'ajout/modification d'una annonce
    submitModal(bvModalEvt) {
        bvModalEvt.preventDefault();
        
        if (this.action == "add") {
            this.showOverlay = true;

            axios.post('occupations', this.occupation).then(response => {
                this.$emit('occupationAdded')
                this.resetModal();
                this.showOverlay = false;
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.showOverlay = false;
                return  App.alertError(error.message)
            })
        }
    },

   async getInitialiseData(){
     //this.showOverlay = true
        try {
            this.logements = await axios.get("logements").then(response => response.result || []);
            if (this.logements[0]) {
                const logement = this.logements[0]
                this.occupation.idLogement = logement.idLogement;

                if (logement.lastIndexEnergie) {
                    this.indexEnergie = logement.lastIndexEnergie.nouveau
                }
                if (logement.lastIndexEau) {
                    this.indexEau = logement.lastIndexEau.nouveau
                }
                this.loyer = (logement.prixMin + logement.prixMax) / 2
            }
        } catch (error) {
           notif.error(error.message);
        }
        if(this.provenance!=2){
            try {
            this.locataires = await axios.get("locataires").then(response => response.result || []);
            if (this.locataires[0]) {
                this.occupation.idLocataire = this.locataires[0].idLocataire;
            }
            } catch (error) {
            notif.error(error.message);
            }
        }
        
        //this.showOverlay = false
    },
  
  },
  async mounted() {
    await this.getInitialiseData();
    if(this.locataire !=null){
        this.provenance=2
        this.disabled=true;
      this.stateLocataire=this.locataire;
      this.occupation.idLocataire = this.locataire.idLocataire
    }
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
 .disabled {
    pointer-events:none;
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
 }
</style>