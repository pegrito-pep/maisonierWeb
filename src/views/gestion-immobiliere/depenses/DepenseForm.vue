<template>
  <b-modal
    id="modal-lg"
    size="lg"
    ok-only
    ok-title="Valider"
    ref="depense-modal"
    @hidden="resetModal"
    @ok="submitModal"
    :static="true"
  >
    <template #modal-title>
      <span class="ml-4 text-form-annone">Définir une dépense</span>
      <span class="ml-4 text-form-annone" v-if="action == 'edit'">Edition</span>
    </template>
    <b-overlay :show="showOverlayP" rounded="sm">
      <b-row>
        <b-col>
          <b-form-group
            label="Montant"
            description="à combien s'élève la dépense éffectuée?"
          >
            <b-form-input
              v-model="depense.montant"
              placeholder="Ex: 45000"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
            <b-form-group label="Date à laquelle la dépense a été éffectuée">
                <date-picker v-model="depense.date" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
            </b-form-group>                        
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            label="Motif"
            description="Pourquoi avez-vous éffectué cette dépense ?"
          >
            <b-form-input
              v-model="depense.motif"
              placeholder="Ex: Replacement ampoules cassées"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="responsable"
            description="Qui est celui qui a déclaré la dépense?"
          >
            <b-form-input
              v-model="depense.responsable"
              placeholder="Ex: Pedro"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="7">
          <b-form-group label="observations">
            <b-form-textarea
              class="mb-2"
              placeholder="C'est ici que vou pouvez décrire ce qui a engendré la dépense"
              rows="7"
              v-model="depense.observation"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col cols="5">
            <b-form-group label="joindre une photo">
                <img-inputer v-model="depense.photo" theme="light" size="xl" 
                        bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img" placeholder="joindre recu dépense"
                        @onChange="onrecuLoad"/>
            </b-form-group>
        </b-col>
      </b-row>
        <b-overlay :show="showOverlay" rounded="sm">
            <b-row>
                    <b-col>
                        <b-form-group label="Votre dépense concerne" v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id="radio-slots"
                                    v-model="commandeAction"
                                    :options="options"
                                    :aria-describedby="ariaDescribedby"
                                    name="radio-options-slots"
                                    :disabled="disableState"
                                    @change="setAction"
                                >
                                </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <transition enter-active-class="animated zoomIn">
                            <div class="form-group" v-if="showSelectCite">
                                    <label>Cité concernée</label>
                                     <v-select label="nomCite" :options="cites" v-model="id" :class="{ disabled: disabled == true }"></v-select>
                            </div>
                            <div class="form-group" v-if="showSelectBatiment">
                                    <label>Batiment concerné</label>
                                    <v-select label="nomBatiment" :options="batiments" v-model="id" :class="{ disabled: disabled == true }"></v-select>
                            </div>
                            <div class="form-group" v-if="showSelectLogement">
                                <label>Logement concerné</label>
                                <v-select label="refLogement" :options="logements"  v-model="id" :class="{ disabled: disabled == true }"></v-select>
                            </div>
                        </transition>
                    </b-col>
            </b-row>
        </b-overlay>
     </b-overlay>
  </b-modal>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
import notif from "@/plugins/notif.js";
const php = require("phpjs");
import Vue from 'vue'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
Vue.component('ImgInputer', ImgInputer)
export default {
  name: "depense-form",
  data: () => ({
   disabled:false,
   //permet de disable la sélection dans un appel extérieur
   disableState:false,
    options: [
          { text: 'une cité', value: 'cite' },
          { text: 'un batiment', value: 'batiment' },
          { text: 'un logement', value: 'logement' }
    ],
    depense: {
      montant: "",
      date: "",
      motif: "",
      responsable: "",
      obs: "",
      photo:""
    },
    id:"",
    commandeAction:"",
    showOverlay: false,
    showOverlayP:false,
    showSelectCite:false,
    showSelectBatiment:false,
    showSelectLogement:false,
    sendForm: false,
    cites: [],
    batiments:[],
    logements: []
  }),
  components: {
    DatePicker
  },
  props: {
        cite: { type: Object},
        batiment: { type: Object},
        logement: { type: Object},
        action: {type: String, required: true, default: "add"}
    },
  methods: {
      //methode de gestion du fichier accompagnant une dépense
      async onrecuLoad(e){
        const fileDepense=e;
        this.depense.photo=await this.getBase64(fileDepense)
        console.log("base64 obtenu", this.depense.photo);
      },
      async onFileCniProprietaireChange(e){
        const fileCniProprio=e;
        this.formData.photoCniProprietaire=await this.getBase64(fileCniProprio)
        console.log("url", this.formData.photoCniProprietaire);
    },
    /**
     * action à effectuer en fonction de l'entité sélectionné
     * par celui qui remplit le formulaire
     */
    async setAction(){
        this.showOverlay=true;
        if(this.commandeAction =='cite'){
            this.showSelectCite=true;
            this.showSelectBatiment=false;
            this.showSelectLogement=false;
            try {
                this.cites=await await axios.get("cites").then(response => response.result);
            } catch (error) {
                console.log(error)
            }
        }
        if(this.commandeAction =='batiment'){
            this.showSelectBatiment=true;
            this.showSelectCite=false;
            this.showSelectLogement=false;
            try {
                this.batiments=await await axios.get("batiments").then(response => response.result);
            } catch (error) {
                console.log(error)
            }
        }
        if(this.commandeAction =='logement'){
            this.showSelectLogement=true;
            this.showSelectCite=false;
            this.showSelectBatiment=false;
            try {
                this.logements=await await axios.get("logements").then(response => response.result);
            } catch (error) {
                console.log(error)
            }
        }
        this.showOverlay=false;
    },

    resetModal() {
      this.depense = {
        montant: '',
        date: '',
        motif: '',
        responsable: '',
        observation: ''
      };
      this.showOverlayP=false;
      this.showSelectCite=false; this.showSelectBatiment=false; this.showSelectLogement=false;
      this.id=null;
      this.commandeAction="";
      this.$emit("resetdepenseForm");
    },

    //validation formulaire d'ajout/modification d'une dépense
    submitModal(bvModalEvt) {
        
      bvModalEvt.preventDefault();
      if (php.empty(this.depense.montant) || php.empty(this.depense.motif)|| php.empty(this.id)) {
                return App.error('Un montant, un motif et l\'entité concernée par la dépense sont obligatoires')
      }
      if (this.depense.montant =='') {
        return App.error('Vous devez spécifier un montant')
      }
      if (this.depense.motif =='') {
        return App.error('Vous devez spécifier un motif')
      }
      if (this.id =='') {
        return App.error('Vous devez spécifier l\'entité concernée par la dépense')
      }
      if (this.action == "add") {
          this.showOverlayP = true;
         if(this.showSelectLogement){
              console.log("dépense",this.depense,"id",this.id.idLogement)
              axios.post('/logements/'+this.id.idLogement+'/depenses',this.depense).then(response =>{
                  notif.success(response.message);
                  this.$refs["depense-modal"].hide();
                  this.$emit("depenseAdded", response.result);
                  this.showOverlayP = false;
              })
              .catch(error => {
                 notif.error(error.message);
            });
          }
           if(this.showSelectCite){
              axios.post('/cites/'+this.id.idCite+'/depenses',this.depense).then(response =>{
                  notif.success(response.message);
                  this.$refs["depense-modal"].hide();
                  this.$emit("depenseAdded", response.result);
                  this.showOverlayP = false;
              })
              .catch(error => {
                 notif.error(error.message);
            });
          }
          if(this.showSelectBatiment){
              axios.post('/batiments/'+this.id.idBatiment+'/depenses',this.depense).then(response =>{
                  notif.success(response.message);
                  this.$refs["depense-modal"].hide();
                  this.$emit("depenseAdded", response.result);
                  this.showOverlayP = false;
              })
              .catch(error => {
                 notif.error(error.message);
            });
          }
            
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
    }
  },
  mounted(){
    if(this.cite !=null){
      this.commandeAction="cite";
      this.showSelectCite=true;
      this.id=this.cite;
      this.disabled=true;
      this.disableState=true;
    }
    if(this.batiment !=null){
      this.commandeAction="batiment";
      this.showSelectBatiment=true;
      this.id=this.batiment;
      this.disabled=true;
      this.disableState=true;
    }
     if(this.logement !=null){
      this.commandeAction="logement";
      this.showSelectLogement=true;
      this.id=this.logement;
      this.disabled=true;
      this.disableState=true;
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