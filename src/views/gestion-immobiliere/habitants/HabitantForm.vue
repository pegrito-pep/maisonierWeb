<template>
   <!--<b-modal id="modal-lg" size="lg" title="Formulaire d'ajout d'un Locataire" ref="habitantModal" :ok-disabled="true"  no-close-on-backdrop hide-header-close>
        <div>-->
            <b-overlay :show="showOverlay" rounded="sm">
                <form-wizard  title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                @on-loading="setLoading"
                shape="circle"
                color="#e74c3c">
                <tab-content title="Données personnelles"
                    icon="fa fa-user" 
                    :before-change="validateAsync">
                    <b-row>
                        <b-col v-show="!alreadyset"> 
                            <b-form-group label="Veuillez choisir le mode de création">
                                    <b-form-select v-model="selected" :options="modeCreations" v-on:change="changeForm"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col v-show="isCodeUtilisateur"> 
                            <b-row class="mt-20">
                                <b-col cols="11" sm="10"> 
                                    <b-form-input v-model="habitant.code"  id="input-large" size="lg" placeholder="Ex: Veuillez entrer le code de l'utilisateur" class="hightPadding" trim></b-form-input>
                                </b-col>
                                <b-col cols="1"> 
                                    <b-button  class="btn btn-icon btn-success mt-2" @click.prevent="getHabitantData" id="button-submit-habitant"><i class="fa fa-paper-plane"></i></b-button>
                                    <b-tooltip target="button-submit-habitant" noninteractive variant="success"><span> Envoyer</span></b-tooltip>
                                </b-col>
                            </b-row>
                        </b-col>
                        </b-row>
                        <transition enter-active-class="animated zoomIn">
                            <div v-if="step == 1">
                                <b-row>
                                    <b-col> 
                                        <b-form-group label="Nom(s) *">
                                            <b-form-input v-model="habitant.nom" placeholder="Ex: TAGNE SIPEUWO" trim :disabled="validated == 1" type="text"></b-form-input>
                                            <span v-if="!requiredNom" style="color:red;">Nom Obligatoire</span>
                                        </b-form-group>
                                    </b-col>
                                    <b-col> 
                                        <b-form-group label="Prénoms(s)">
                                            <b-form-input v-model="habitant.prenom" placeholder="Ex: Miguel Pedro" trim :disabled="validated == 1"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col> 
                                        <b-form-group label="Date de Naissance">
                                            <date-picker v-model="habitant.dateNaiss" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col> 
                                        <b-form-group label="Lieu de Naissance">
                                            <b-form-input v-model="habitant.lieuNaiss" trim></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col> 
                                        <b-form-group label="Numéro de Téléphone *">
                                            <b-form-input v-model="habitant.tel" placeholder="Ex: 699716645" trim :disabled="validated == 1" type="number"></b-form-input>
                                            <span v-if="!requiredTel" style="color:red;">Numéro de Téléphone obligatoire</span>
                                        </b-form-group>
                                    </b-col>
                                    <b-col> 
                                        <b-form-group label="Email">
                                            <b-form-input v-model="habitant.email" placeholder="Ex: tagnemiguel@gmail.com" trim :disabled="validated == 1" type="email"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </div>
                        </transition>
                </tab-content>
                <tab-content title="Photo de profil"
                            icon="fas fa-image"
                            :before-change="validateSecond">
                        <div class="text-center"> 
                            <img :src="habitant.avatar" class="rounded-circle" width="150">
                            <h4 class="card-title mt-10">{{ habitant.nom }}</h4>
                            <div class="imagesAnnonce border-dotted borderRadius">
                                <label for="imagesAnnonce" class="mr-2"><b>Photo de profil </b></label>                                           
                                <label>
                                    
                                    <b-img src="/img/camera.png" style="width: 3em; height: 3em"/>
                                    <input type="file"    
                                    accept=".png, .jpg, .jpeg"
                                    @change="onFileChange" style="display:none">
                                </label>                 
                            </div>
                        </div>
                </tab-content>
                <tab-content title="Autres informations"
                            icon="fas fa-info-circle"  
                    >
                        <b-row>
                            <b-col> 
                                <b-form-group label="Titre honorifique" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        id="radio-slots"
                                        v-model="habitant.titre"
                                        :options="options"
                                        :aria-describedby="ariaDescribedby"
                                        name="radio-options-slots"
                                    >
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                            <b-col> 
                            <b-form-group label="Proféssion">
                                    <b-form-input v-model="habitant.profession" placeholder="Ex: Développeur Informatique" trim></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col> 
                                <b-form-group label="Autre numéro de télephone">
                                    <b-form-input v-model="habitant.tel2" placeholder="Ex: 670142547" trim type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col> 
                                <b-form-group label="Autre adresse mail">
                                    <b-form-input v-model="habitant.email2" placeholder="Ex: pedrospi@yahoo.com" trim type="email"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col> 
                                <b-form-group label="Numéro Pièce D'identité">
                                    <b-form-input v-model="habitant.cni" placeholder="Ex: 114989895" trim type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col> 
                                <b-form-group label="Autre numéro de télephone">
                                    <b-form-input v-model="habitant.tel3" placeholder="Ex: 671202344" trim type="number"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                </tab-content>
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard>                  
	      </b-overlay>
        <!--</div>
    </b-modal>-->
</template>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

import notif from "@/plugins/notif.js";
export default {
    name:'add-habitant',
    data:()=>({
        validated:0,
        options: [
          { text: 'Monsieur', value: 'M' },
          { text: 'Mme', value: 'Mme' },
          { text: 'Mademoiselle', value: 'Mlle'},
        ],
        time:"",
        showOverlay:false,
        isCodeUtilisateur:false,
        alreadyset:false,
        habitant:{
            nom:"",
            prenom:"",
            dateNaiss:"",
            lieuNaiss:"",
            profession:"",
            cni:"",
            email:"",
            email2:"",
            tel:"",
            tel2:"",
            tel3:"",
            titre:'M',
            code:"",
            avatar:"http://localhost:8080/img/default.png"
            //avatar:"http://localhost:8080/img/default.png"
        },
        step:0,
        showAddPicture:false,
        selected: null,
        modeCreations: [
          { value: '2', text: 'Utilisateur entidaté' },
          { value: '1', text: 'Code Utilisateur' },
        ],
        loadingWizard: false,
        check:true,
        check2:true,
        requiredNom:true,
        requiredTel:true,
    }),
    components: {
        FormWizard,
        TabContent,
        DatePicker
    },
    props:["action"],
    methods: {
        photo_upload: function(e, file){
            console.log(e,file)
        },
        //méthodes liées au form-wizard
        setLoading: function(value) {
                this.loadingWizard = value
        },
            
        validateAsync:function() {
            return new Promise((resolve, reject) => {
                
                if(!this.habitant.nom || !this.habitant.tel){
                    if(!this.habitant.nom){this.requiredNom=false;}
                    else {this.requiredNom=true;}
                    if(!this.habitant.tel){this.requiredTel=false;}
                    else{this.requiredTel=true;}
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
                    
                   if(!this.habitant.tel){
                        this.check2=false
                    }else{
                        this.check2=true
                    }
                setTimeout(() => {
                    resolve(this.check2)
                }, 1000)
                })
        },
        changeForm(){
            console.log("entrée ici")
            let commande=this.selected
            console.log("valeur sélectionnée",commande)
            if(commande==='1'){
                this.isCodeUtilisateur=true;
                this.step=0;
            }
            if(commande==='2'){
                this.step=1;
                this.isCodeUtilisateur=false
            }

        },
        resetModal() {
            this.habitant = {
                nom: '', prenom: '', profession: '', cni: '', tel: '',
                email: '', email2: '', code: '', titre: '', dateNaiss: '', lieuNaiss: ''
        
            }
            this.$refs['habitantModal'].hide();
            setTimeout(() => {
                this.$emit('closeModal');
            }, 500);
        },

        //obtention des données d'un habitant à partir de son code utilisateur
        getHabitantData(){
            this.showOverlay=true
            axios.get('utilisateurs/'+this.habitant.code).then((response) => {
                if(response.success){
                    this.habitant.avatar = response.result.avatar
                    this.habitant.nom = response.result.nom
                    this.habitant.prenom = response.result.prenom
                    this.habitant.tel = response.result.tel
                    this.habitant.dateNaiss = response.result.dateNaiss
                    this.habitant.email=response.result.email
                    this.habitant.isCertified=response.result.isCertified
                    this.step=1;
                    this.validated=1
                    this.alreadyset=true;
                }else{
                    console.log("user inexistant")
                    return App.alertError(response.message || 'Utilisateur Inexistant')
                   //return App.confirm(`Utilisateur Inexistant`);
                }
            })
             this.showOverlay=false
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        //methode qui gère le changement de la photo de profil
        async onFileChange(e){
            const avatarUser=e.target.files[0];;
            this.habitant.avatar=await this.getBase64(avatarUser)
            console.log("avatar", this.habitant.avatar);
           /* const file=e.target.files[0];
            this.habitant.avatar=URL.createObjectURL(file);*/
        },
        //validation formulaire d'ajout/modification d'una annonce
        onComplete(){
            this.showOverlay=true;
            let data={
                nom:this.habitant.nom, prenom:this.habitant.prenom, cni:this.habitant.cni, 
                tel:this.habitant.tel, tel2:this.habitant.tel2, tel3:this.habitant.tel3, 
                email:this.habitant.email, email2:this.habitant.email2, profession:this.habitant.profession,
                titre:this.habitant.titre, dateNaiss:this.habitant.dateNaiss, lieuNaiss:this.habitant.lieuNaiss,
                code:this.habitant.code, avatar: this.habitant.avatar
            }
            axios.post("locataires",data).then(response =>{
                this.habitant.nom=null;this.habitant.prenom=null; this.habitant.dateNaiss=null;
                this.habitant.lieuNaiss=null;this.habitant.profession=null; this.habitant.dateNaiss=null;
                this.habitant.cni=null;this.habitant.email=null; this.habitant.email2=null;
                this.habitant.tel=null;this.habitant.tel2=null; this.habitant.titre='M';
                this.habitant.code=null;this.habitant.avatar="http://localhost:8080/img/default.png"; this.habitant.titre='M';
                notif.success(response.message);
                this.$emit("habitantAdded", response.result);
            })
            .catch(error => 
            {
                notif.error(error.message);
                this.showOverlay=false;
            });
            },
             

    },

}
</script>
<style scoped>
.is-red{
    border-color:red;
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
.hightPadding{
    padding: 1em!important;
}
</style>