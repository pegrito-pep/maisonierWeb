<template>
    <div>
        <b-row>
            <b-col cols="4" md="4" sm="12">
                <div class="card">
                    <div class="card-body d-flex justify-content-around">
                        <div class="text-center"> 
                              <b-img v-bind="mainProps" :src="user.avatar" rounded="circle" alt="Circle image"></b-img>
                        </div>
                        <div class="text-center" style="padding-top:15%;"> 
                            <h4 class="card-title">{{ user.nom + ' ' + user.prenom }}</h4>
                            <h4 class="card-title">{{$t('data.preferences_compte_bailleur')}}</h4>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                </div>
            </b-col>
            <b-col cols="4"  md="8" sm="12">
                <div class="card">
                    <div class="card-body d-flex justify-content-around">
                        <div class="text-center"> 
                              <b-img v-bind="mainProps" src="/img/logo-m0.png" rounded="circle" alt="Circle image"></b-img>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="text-center"> 
                                <h4 class="card-title">{{$t('data.preferences_accueil')}}</h4>
                                <h4 class="card-title">{{$t('data.preferences_accueil_explications')}}</h4>
                            </div>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="4" md="5" sm="12">
                <div class="card overflow-hidden px-2 py-3">
                    <h4 class="m-1 font-weight-bold">{{$t('data.preferences_mes_preferences_actuelles')}}</h4>
                    <hr>
                    <div class="row mx-2 mt-2" id="layout-wrap"  ref="themeCont">
                        <div class="col-xl-6 col-md-6 col-xs-12 page-header">
                            <div class="row">
                                <div class="d-flex page-header-title">
                                    <i class="fa fa-language bg-red"></i>
                                    <div class="d-block">
                                        <h5 v-if="localeActuelle =='fr'">Langue</h5>
                                        <h5 v-if="localeActuelle =='en'">English</h5>
                                        <span  v-if="localeActuelle =='fr'" class="w-100 font-weight-bold">Français</span>
                                        <span v-if="localeActuelle =='en'" class="w-100 font-weight-bold">English</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-xs-12 page-header">
                            <div class="row">
                                <div class="d-flex page-header-title">
                                    <i class="fas fa-dollar-sign bg-red"></i>
                                    <div class="d-block">
                                        <h5>{{$t('data.preference_devise')}}</h5>
                                        <span class="font-weight-bold">Franc CFA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div class="page-header">
                                <div class="row align-items-end">
                                    <div class="col-lg-12">
                                        <div class="page-header-title">
                                            <i class="fas fa-dollar-sign bg-red"></i>
                                            <div class="d-inline">
                                                <h5>{{$t('data.preference_devise')}}</h5>
                                                <span>{{$t('data.preference_devise_actuelle')}} : </span><span class="font-weight-bold">Franc CFA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                    </div>
                      <b-form-group label-cols="6" label-cols-lg="6" :label="$t('data.preferences_prix_unitaire_eau')" label-for="input-default" class="m-1">
                        <b-form-input id="input-eau" v-model="puEau" :disabled="true"></b-form-input>
                     </b-form-group>
                     <b-form-group label-cols="6" label-cols-lg="6" :label="$t('data.preferences_prix_unitaire_electricite')" label-for="input-default" class="m-1">
                        <b-form-input id="input-electricite" v-model="puElectricite" :disabled="true"></b-form-input>
                     </b-form-group>
                </div>
            </b-col>
            <b-col lg="8" md="7" sm="12" class="pb-0">
                <div class="card pb-2">
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                         <li class="nav-item">
                            <!--<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-profile" aria-selected="false">{{ $t('data.profile_activite')}}</a>-->
                            <a class="nav-link font-weight-bold  active" id="pills-profile-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-profile" aria-selected="false">{{$t('data.preferences_mise_a_jour')}}</a>
                        </li>
                        <li class="nav-item">
                            <!--<a class="nav-link  active" id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting-tab" aria-selected="false"> {{ $t('data.profile_mes_informations') }} </a>-->
                            <a class="nav-link font-weight-bold " id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting-tab" aria-selected="false">{{$t('data.preferences_certifier_mes_informations')}} </a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="current-month" role="tabpanel" aria-labelledby="pills-timeline-tab">
                            <div class="card-body">
                                    <form class="form-horizontal">
                                        <transition enter-active-class="animated zoomIn">
                                            <div>
                                                <b-row>
                                                    <b-col>
                                                        <div class="form-group">
                                                          <p class="my-4">{{$t('data.preference_choisir_langue')}}</p>
                                                          <v-select :options="langues" :reduce="langue => langue.locale" v-model="localeSet" label="libelle">
                                                                <template v-slot:option="option">
                                                                     <div class="d-flex">
                                                                        <country-flag :country='option.country' size='normal'/>
                                                                        <div class="d-flex justify-content-center align-items-center">
                                                                            {{ option.libelle }}
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                           </v-select>
                                                        </div>
                                                    </b-col>
                                                    <b-col>
                                                        <div class="form-group">
                                                          <p class="my-4">{{$t("data.preference_choisir_devise")}}</p>
                                                          <v-select :options="devises" :reduce="devise => devise.device" v-model="devise" label="title">
                                                                <template v-slot:option="option">
                                                                    <div class="d-flex">
                                                                        <div class="w-10">
                                                                            <i :class="option.icon" style="font-size: 36px; color: #f5365c;"></i>
                                                                        </div>
                                                                        <div class="d-flex justify-content-center align-items-center">
                                                                            {{ option.title }}
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                          </v-select>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col>
                                                        <b-form-group :label="$t('data.preferences_prix_unitaire_eau')">
                                                            <b-form-input v-model="puEau" type="number"></b-form-input>
                                                        </b-form-group>
                                                    </b-col>
                                                    <b-col>
                                                        <b-form-group :label="$t('data.preferences_prix_unitaire_electricite')">
                                                            <b-form-input type="number" v-model="puElectricite"></b-form-input>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </transition>
                                        <button class="btn float-right mb-1" style="background-color: #f5365c; color: #fff" :disabled="submittedPreferences" @click.prevent="sendUserDataForm">{{$t('data.cite_valider_cite')}}<b-spinner class="ml-1" v-if="submittedPreferences" small></b-spinner></button>
                                    </form>
                            </div>              
                        </div>
                            <div class="tab-pane fade" id="previous-month" role="tabpanel" aria-labelledby="pills-setting-tab">
                                <div class="card-body">
                                    <b-container class="my-3">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item"><a class="nav-link" :class="{'active' : tab_infos == 'infosActuelles'}" @click.prevent="tab_infos = 'infosActuelles'" data-toggle="pill" href="#">{{$t('data.preferences_mes_informations')}}</a></li>
                                            <li class="nav-item"><a class="nav-link" :class="{'active' : tab_infos == 'infosCertification'}" @click.prevent="tab_infos = 'infosCertification'" data-toggle="pill" href="#">{{$t("data.preferences_certifier_mon_compte")}}</a></li>
                                        </ul>
                            <!--DIV DES INFORMATIONS ACTUELLE-->
                            <div class="tab-content">
                                <div class="tab-pane fade show active">
                                   <div v-if="tab_infos == 'infosActuelles'" class="card-body">
                                        <h4 class="border-bottom h1"></h4>
                                        <b-row class="mb-1 row">
                                            <div class="text-dark pt-2 rounded col-lg-6 col-md-12 col-sm-12 my-2" style="background: #fff;">
                                                <dl class="row" >
                                                    <dd class="mt-1 col-6 h6 font-weight-bold ">{{$t('data.profile_nom')}}</dd>
                                                    <dt class="mt-1 col-6"> <span class="" style="">{{ user.nom }}</span> </dt>
                                                    <dd class="mt-1 col-6 h6 font-weight-bold">{{$t('data.profile_prenom')}}</dd>
                                                    <dt class="mt-1 col-6"><span class="" style=""> {{ user.prenom }}</span></dt>
                                                    <dd class="mt-1 col-6 h6 font-weight-bold">{{$t('data.profile_address_phone')}}</dd>
                                                    <dt class="mt-1 col-6">{{ user.tel }}</dt>
                                                    <dd class="mt-1 col-12 h6 font-weight-bold">{{$t('data.profile_address_cni')}}</dd>
                                                    <!--<dt class="mt-1 col-6" v-if="user.profil.cni!=null&&user.profil.cni!=''">{{ user.profil.cni }}</dt>-->
                                                </dl>
                                            </div>
   
                                        </b-row>
                                    </div>
                                     <div v-if="tab_infos =='infosCertification'">
                                           <b-form inline class="m-2">
                                               <img-inputer v-model="certifData.cniAvant" theme="light" size="small" style="margin-right:5em"
                                                                    :bottom-text="$t('data.cite_bottom_text')" icon="img" :placeholder="$t('data.preferences_photo_avant_cni')"
                                                                @onChange="onFileCNIAvantChange"/>
                                                <img-inputer v-model="certifData.cniArriere" theme="light" size="small"  style="margin-right:2em"
                                                                    :bottom-text="$t('data.cite_bottom_text')" icon="img" :placeholder="$t('data.preferences_photo_arriere_cni')"
                                                                @onChange="onFileCNIArriereChange"/>
                                                <button class="btn btn-success" @click.prevent="sendCertifData">{{$t('data.habitant_form_envoyer')}}<b-spinner v-if="submittedCerifdata" small></b-spinner></button>
                                           </b-form>
                        
                                    </div>
                                </div>
                               
                            </div>
                            <!--FIN DIV DES INFORMATIONS ACTUELLE-->
                        </b-container>  
                                
                                </div>
                            </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex"

import notif from "@/plugins/notif.js";
import Vue from 'vue'

import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

Vue.component('ImgInputer', ImgInputer)

import SearchForm from "@/components/parts/SearchForm.vue";
import PreferenceComposant from "@/components/templates/PreferenceComposant.vue";
const php = require("phpjs");
//import i18n from '@/plugins/i18n';
import CountryFlag from 'vue-country-flag'

export default {
    data:() =>({
        //données de certification
        certifData:{
            cniAvant:'',
            cniArriere:''
        },
        tab_infos: 'infosActuelles',

        language:{
            submitted: false,
        },
        setDevise:{
            submitted: false,
        },
        //données des preferences 
        devise:'F',
        localeActuelle:null,
        localeSet:'fr',
        trueParametres:[],
        parametres:[],
        mainProps: {width: 150, height: 150, class: 'm1' },
        search: null,
        devises: [
        {
          title: '  Franc CFA',
          icon: 'fa fa-database',
          device: 'F'
        },
        {
          title: '  Euro',
          icon: 'fa fa-book',
          device: '€'
        },
        {
          title: '  Dollar',
          icon: 'fas fa-dollar-sign',
          device: '$'
        },
        {
          title: '  naira',
          icon: 'fa fa-pencil',
          device: '₦'
        }
        ],
    langues:[
        {
          libelle: 'Francais',
          country: 'cm',
          locale: 'fr'
        },
        {
          libelle: 'Anglais',
          country: 'gb',
          locale: 'en'
        }
    ],
    submittedPreferences:false,
    submittedCerifdata:false,
    //autres preferences
    puEau:0,
    puElectricite:0
    }),
    components: {
        SearchForm,
        PreferenceComposant,
        CountryFlag
    },
      watch: {
        search(value) {
        this.parametres = !php.empty(value)
            ? this.trueParametres.filter(elt =>
                elt.libelle.toLowerCase().includes(value.toLowerCase())
            )
            : this.trueParametres;
        }
  },
     computed: { 
        ...mapGetters(['user']),
       ...mapState('locale', ['locale']),
        currentLocale() {
            return this.locale.toUpperCase()
        }
    },
    mounted() {
        this.localeActuelle= this.$i18n.locale
    },
    created() {
        this.$i18n.locale = this.locale
  },
    methods: {
        //MISE a JOUR PREFERENCES
        sendUserDataForm(){
            console.log('langue',this.localeSet,' devise', this.devise);
                  this.submittedPreferences = true
                  
                const preferences={
                    langue:this.localeSet,
                    devise:this.devise,
                    puEau:this.puEau,
                    puElectricite:this.puElectricite,
                }

                axios.put('account/preferences', preferences).then(response => {
                    this.submittedPreferences = false
                        this.$i18n.locale = response.result.langue
                        this.localeActuelle=response.result.langue;
                        this.setLocale(response.result.langue)
                        storage.set('devise',response.result.devise)
                        console.log("response ok", response.result)
                   
                }).catch(error => {
                    this.submittedPreferences = false
                    App.notifyError(error.message)
                })

        },
        async onFileCNIAvantChange(e){
            const fileCniAvant=e.target.files[0];
            this.certifData.cniAvant=await this.getBase64(fileCniAvant)
        },
        async onFileCNIArriereChange(e){
            const fileCniArriere =e.target.files[0];
            this.certifData.cniArriere=await this.getBase64(fileCniArriere)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        sendCertifData(){
            this.submittedCerifdata=true
            axios.post("certifier",this.certifData).then(response =>{
                this.certifData.cniAvant='';this.certifData.cniArriere='';
                return App.notifySuccess(response.message)
            })
            .catch(error => {
                this.submittedCerifdata=false;
                notif.error(error.message);
            });
        },
        ...mapMutations('locale', ['setLocale']),
        validateLangue(){
            //i18n.locale = this.locale;
            this.$i18n.locale = this.localeSet
            this.localeActuelle=this.localeSet;
            this.setLocale(this.localeSet)
        },
        validateDevise(){
            console.log('devise to set', this.devise);
            storage.set('devise',this.devise)
        }
      
    }
    
}
</script>
<style scoped>
.photo-cite {
    width: 8.5em;
    height: 8.5em;
    background-size: cover;
}
.photo-cite button {
    cursor: pointer;
}
</style>