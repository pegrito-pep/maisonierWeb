<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <form-wizard  title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
            @on-loading="setLoading"
            shape="circle"
            color="#e74c3c">
            <tab-content title="Habitation"
                icon="fas fa-info-circle" 
                   :before-change="validateFirst" 
                >
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
            </tab-content>
            <tab-content title="Loyer"
                icon="fas fa-balance-scale-right" 
                :before-change="validateAsync">
                <b-row>
                    <b-col>
                        <!--<CustomInputGroup :class="!requiredLoyer ? 'is-red' : ''"   label="Loyer" description="Combien devra payer le résident" placeholder="Ex: 45000" v-model="occupation.loyer" />-->
                            <b-form-group label="Loyer" description="Combien devra payer le résident">
                                <b-form-input :class="!requiredLoyer ? 'is-red' : ''" type="number"  v-model="occupation.loyer" placeholder="Ex: 45000" trim></b-form-input>
                                <span v-if="!requiredLoyer" style="color:red;">Ce champ est obligatoire</span>
                            </b-form-group>
                        
                    </b-col>
                    <b-col>
                        <!--<CustomSelectGroup label="Mode de paiement" description="Le résident devra t-il payer son loyer courant avant ou après l'avoir consommé" v-model="occupation.mode" :options="payoptions"  />-->
                        <div class="form-group">
                            <label>Mode de paiement</label>
                            <v-select label="text" :options="payoptions" v-model="occupation.mode" :reduce="mode => mode.value" :class="!requiredMode ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredMode" style="color:red;">Ce champ est obligatoire</span>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <!--<CustomInputGroup label="Nombre de mois d'avance" description="Combien de mois le locataire a t-il avancé" placeholder="Ex: 6" v-model="occupation.avance" min="1" type="number" />-->
                        <b-form-group label="Nombre de mois d'avance" description="Combien de mois le locataire a t-il avancé">
                                <b-form-input :class="!requiredAvance ? 'is-red' : ''" type="number"  v-model="occupation.avance" placeholder="Ex: 6" trim></b-form-input>
                                <span v-if="!requiredAvance" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                     <b-col>
                        <!--<CustomInputGroup label="Caution" description="somme versée faisant office de caution" placeholder="Ex: 25000" v-model="occupation.caution" min="1" type="number" />-->
                        <b-form-group label="Caution" description="somme versée faisant office de caution">
                                <b-form-input :class="!requiredCaution ? 'is-red' : ''" type="number"  v-model="occupation.caution" placeholder="Ex: 25000" trim></b-form-input>
                                <span v-if="!requiredCaution" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                </b-row>
          
            </tab-content>
            <tab-content title="charges"
                icon="ik ik-settings"
                :before-change="validateSecond">
                <b-row>
                    <b-col>
                        <!--<CustomSelectGroup label="Facturation d'eau" description="Comment s'effectuera la facturation en eau de ce résident" v-model="occupation.eau" :options="eauoptions"  />-->
                         <div class="form-group">
                            <label>Facturation d'eau</label>
                            <v-select label="text" :options="eauoptions" v-model="occupation.eau" :reduce="eau => eau.value" :class="!requiredEau ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredEau" style="color:red;">Ce champ est obligatoire</span>
                        </div>
                    </b-col>
                    <b-col>
                        <!--<CustomInputGroup :label="occupation.eau == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'eau'" description="" placeholder="Ex: 1500" v-model="occupation.puEau" min="0" type="number" />-->
                        <b-form-group :label="occupation.eau == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'eau'" description="">
                            <b-form-input :class="!requiredPuEau ? 'is-red' : ''" min="0" type="number"  v-model="occupation.puEau" placeholder="Ex: 1500" trim></b-form-input>
                            <span v-if="!requiredPuEau" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="occupation.eau == 'index'">
                        <!--<CustomInputGroup label="Index initial" description="Index du compteur d'eau à l'entrée du locataire" placeholder="Ex: 095" v-model="occupation.indexEau" min="0" type="number" />-->
                        <b-form-group label="Index initial" description="Index du compteur d'eau à l'entrée du locataire">
                            <b-form-input :class="!requiredIndex ? 'is-red' : ''" min="0" type="number"  v-model="occupation.indexEau" placeholder="Ex: 095" trim ></b-form-input>
                            <span v-if="!requiredIndex" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <!--<CustomSelectGroup label="Facturation d'électricité" description="Comment s'effectuera la facturation en électricité de ce résident" v-model="occupation.energie" :options="eauoptions"  />-->
                        <div class="form-group">
                            <label>Facturation d'électricité</label>
                            <v-select label="text" :options="eauoptions"  v-model="occupation.energie" :reduce="eau => eau.value" :class="!requiredELectricite ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredELectricite" style="color:red;">Ce champ est obligatoire</span>
                        </div>
                    </b-col>
                    <b-col>
                        <!--<CustomInputGroup :label="occupation.energie == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'energie'" description="L'exemple suggéré suppose une consommation par forfait" placeholder="Ex: 2500" v-model="occupation.puEnergie" min="0" type="number" />-->
                        <b-form-group :label="occupation.energie == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'électricité'" description="L'exemple suggéré suppose une consommation par index">
                                <b-form-input :class="!requiredPuEnergie ? 'is-red' : ''" type="number" min="0"  v-model="occupation.puEnergie" placeholder="Ex: 150" trim></b-form-input>
                                <span v-if="!requiredPuEnergie" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="occupation.energie == 'index'">
                        <!--<CustomInputGroup label="Index initial" description="Index du compteur d'energie à l'entrée du locataire" placeholder="Ex: 095" v-model="occupation.indexEnergie" min="0" type="number" />-->
                        <b-form-group label="Index initial" description="Index du compteur d'électricité à l'entrée du locataire">
                            <b-form-input :class="!requiredPuEnergie ? 'is-red' : ''" type="number" min="0"  v-model="occupation.indexEnergie" placeholder="Ex: 095" trim></b-form-input>
                            <span v-if="!requiredPuEnergie" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </b-col>
                </b-row>
            </tab-content>

            <tab-content title="Contrat"
                        icon="fas fa-file-contract"  
                >
                
            </tab-content>
            <div class="leloader" v-if="loadingWizard"></div>
        </form-wizard>                  
    </b-overlay>
</template>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

  import CustomInputGroup from "@/components/parts/CustomInputGroup.vue";
import CustomSelectGroup from "@/components/parts/CustomSelectGroup.vue";

import notif from "@/plugins/notif.js";
const php = require("phpjs");

export default {
  name: "occupation-form",
    components: {
        DatePicker,
        CustomInputGroup,
        CustomSelectGroup,
        FormWizard,
        TabContent,
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
      endLastBail: false,
      avance: 1,
      caution:1
    },
    showOverlay: false,
    sendForm: false,
    logements: [],
    locataires: [],
    loadingWizard: false,
    check0:false,
    check:true,
    check2:true,
    requiredLoyer:true,
    requiredAvance:true,
    requiredCaution:true,
    requiredLoyer:true,
    requiredMode:true,
    requiredLogement:true,
    requiredLocataire:true,
    requiredELectricite:true,
    requiredEau:true,
    requiredPuEau:true,
    requiredPuEnergie:true,
    requiredIndex:true,
    /*données manipulées du fait de l'appel du fait
    *de l'appel du formulaire de création d'un occupation 
    *à différents endroits
    */
   disabled:false,
   stateLocataire:null,
   payoptions: [{ text: 'Prépayé', value: 'prepayer' }, { text: 'Postpayé', value: 'postpayer' }],
   eauoptions: [{ value: 'index', text: 'Index' }, { value: 'forfait', text: 'Forfait' },],
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
    },
    loyer(value)  {
        this.occupation.loyer = value
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
    /**emission évènement pour fermer le formulaire
     * de création d'une annonce et basculer à la création préalable d'un logement
     */
    createLogement(){
      this.$emit('createLogementSecond') 
    },
    /**emission évènement pour fermer le formulaire de création d'une occupation
     *  et basculer à la création préalable d'un locataire
     */
    createLocataire(){
      this.$emit('createLocataire') 
    },
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
    //méthodes liées au form-wizard
    setLoading: function(value) {
        this.loadingWizard = value
    },
    validateFirst:function() {
        return new Promise((resolve, reject) => {
            
            if(!this.occupation.idLogement || !this.occupation.idLocataire){
                if(!this.occupation.idLogement){this.requiredLogement=false;}
                else {this.requiredLogement=true;}
                if(!this.occupation.idLocataire){this.requiredLocataire=false;}
                else{this.requiredLocataire=true;}
        
                this.check0=false
            }else{
                this.check0=true
            }
        setTimeout(() => {
            resolve(this.check0)
        }, 1000)
        })
    },
    validateAsync:function() {
        return new Promise((resolve, reject) => {
            
            if(!this.occupation.loyer || !this.occupation.avance  || !this.occupation.mode || !this.occupation.caution){
                if(!this.occupation.loyer){this.requiredLoyer=false;}
                else {this.requiredLoyer=true;}
                if(!this.occupation.avance){this.requiredAvance=false;}
                else{this.requiredAvance=true;}
                if(!this.occupation.mode){this.requiredMode=false;}
                else{this.requiredMode=true;}
                if(!this.occupation.caution){this.requireCaution=false;}
                else{this.requireCaution=true;}
                this.check=false
            }else{
                this.check=true
                this.alreadyset=true;
            }
        setTimeout(() => {
            resolve(this.check)
        }, 1000)
        })
    },
    validateSecond:function() {
        return new Promise((resolve, reject) => {
            
            /*if(!this.habitant.tel){
                this.check2=false
            }else{
                this.check2=true
            }*/
        setTimeout(() => {
            resolve(this.check2)
        }, 1000)
        })
    },
    //validation formulaire d'ajout/modification d'ajout d'une occupation
    onComplete() {
        //bvModalEvt.preventDefault();
        
            console.log(this.occupation);
        if (this.action == "add") {
            this.showOverlay = true;

            axios.post('occupations', this.occupation).then(response => {
                this.$emit('occupationAdded')
                this.resetModal();
                console.log(response);
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
            //this.logements = await axios.get("logements").then(response => response.result || []);
    
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

.is-red{
    border-color:red;
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
     .leloader,
.leloader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.leloader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #e74c3c;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>