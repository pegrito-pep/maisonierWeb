<template>
    <div>
        <page-description title="Profil" description="Profil utilisateur" icon="user" :path="[]" />
        <b-row>
            <b-col lg="4" md="5">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center"> 
                            <!--<b-img :src="user.avatar" rounded="circle" width="150" />-->
                              <b-img v-bind="mainProps" :src="user.avatar" rounded="circle" alt="Circle image"></b-img>
                            <h4 class="card-title mt-10"><span v-if="user.profil.titre != ''">{{  user.profil.titre+' ' }}</span>{{ user.nom + ' ' + user.prenom }}</h4>
                            <p class="card-subtitle font-weight-bold" :class="user.isCertified ? 'text-succes' : 'text-danger'">{{ user.code }}
                            <b-button v-if="!user.isCertified" class="btn-icon my-1" variant="warning" id="certified-infos"><i class="ik ik-award" aria-hidden="true"></i></b-button></p>
                             <b-tooltip target="certified-infos" placement="right" noninteractive variant="danger"><h4>{{ $t('data.profile_nombre_locataire')}}</h4>
                             {{ $t('data.profile_certifier_informations_description')}}</b-tooltip>
                            <div class="row text-center justify-content-md-center">
                                <div class="col-4" id="nombre-locataires" v-b-tooltip.top="$t('data.profile_nombre_locataire')"><a href="javascript:void(0)" class="link"><i class="ik ik-user"></i> <font class="font-medium">254</font></a></div>
                                <div class="col-4" id="nombre-logements-libres"><a href="javascript:void(0)" class="link"><i class="fas fa-home"></i><font class="text-danger"> 02</font></a></div>
                                <b-tooltip target="nombre-logements-libres" placement="bottom" noninteractive variant="danger">{{$t('data.profile_nombre_logement_libre_sans_annonce_publie')}}</b-tooltip>
                            </div>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                    <div class="card-body"> 
                        <small class="text-muted d-block">{{ $t('data.profile_address_email')}}</small>
                        <h6>{{ user.email }}</h6> 
                        <small class="text-muted d-block pt-10">{{ $t('data.profile_address_phone') }}</small>
                        <h6>{{ user.tel }}</h6> 
                        <small class="text-muted d-block pt-30">{{ $t('data.profile_maisonier_sur_reseaux_sociaux') }}</small>
                        <br>
                        <button class="btn btn-icon btn-facebook" id="facebook-maisonier"><i class="fab fa-facebook-f"></i></button>
                        <b-tooltip target="facebook-maisonier" placement="top" noninteractive variant="primary"> {{ $t('data.profile_maisonier_facebook') }} </b-tooltip>
                        <button class="btn btn-icon btn-twitter ml-1" id="twitter-maisonier"><i class="fab fa-twitter"></i></button>
                        <b-tooltip target="twitter-maisonier" placement="bottom" noninteractive variant="secondary"> {{ $t('data.profile_maisonier_twitter') }} </b-tooltip>
                        <button class="btn btn-icon btn-instagram ml-1" id="instagram-maisonier"><i class="fab fa-instagram"></i></button>
                        <b-tooltip target="instagram-maisonier" placement="top" noninteractive variant="success">{{$t('data.profile_maisonier_instagram')}}</b-tooltip>
                        <button class="btn btn-icon ml-1" id="youtube-maisonier" style="background:#E90D39"><i class="fab fa-youtube" style="color:white"></i></button>
                        <b-tooltip target="youtube-maisonier" placement="right" noninteractive variant="danger">{{ $t('data.profile_maisonier_youtube')}}</b-tooltip>
                    </div>
                </div>
            </b-col>
            <b-col lg="8" md="7">
                <div class="card">
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                         <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-profile" aria-selected="false">{{ $t('data.profile_activite')}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  active" id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting-tab" aria-selected="false"> {{ $t('data.profile_mes_informations') }} </a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade" id="current-month" role="tabpanel" aria-labelledby="pills-timeline-tab">
                                            
                        </div>
                            <div class="tab-pane fade show active " id="previous-month" role="tabpanel" aria-labelledby="pills-setting-tab">
                            <div class="card-body">
                                <form class="form-horizontal" @submit.prevent="sendUserDataForm">
                                    <transition enter-active-class="animated zoomIn">
                                        <div>
                                            <b-row>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-name">{{$t('data.profile_nom')}}</label>
                                                       <input type="text" class="form-control" :placeholder="$t('data.profile_nom_exemple')" id="example-name" v-model="updateUser.nom">
                                                        <!-- <input type="text" class="form-control" placeholder="Ex: TAGNE" id="example-name" v-model="user.nom">-->
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-name">{{$t('data.profile_prenom')}}</label>
                                                       <input type="text" class="form-control" :placeholder="$t('data.profile_prenom_exemple')" id="example-name" v-model="updateUser.prenom">
                                                        <!-- <input type="text" class="form-control" placeholder="Ex: Miguel Pedro" id="example-name" v-model="user.prenom">-->
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-email">{{ $t('data.profile_address_email') }}</label>
                                                        <input type="email" class="form-control" :placeholder="$t('data.profile_address_email_exemple')" id="example-email" v-model="updateUser.email">
                                                        <!--<input type="email" class="form-control" placeholder="Ex: tagnemiguel@gmail.com" id="example-email" v-model="user.email">-->
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-phone">{{ $t('data.profile_address_phone') }}</label>
                                                        <input type="tel" id="example-phone" :placeholder="$t('data.Ex: 693803726')" class="form-control" v-model="updateUser.tel">
                                                        <!--<input type="tel" id="example-phone" placeholder="Ex: 693803726" class="form-control" v-model="user.tel">-->
                                                    </div>
                                                </b-col>
                                            </b-row>
                                             <b-row>
                                                <b-col>
                                                     <b-form-group :label="$t('data.profile_date_naissance')">
                                                       <date-picker v-model="updateUser.dateNaiss" :placeholder="$t('data.profile_selectionner_date')" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                                                         <!--<date-picker v-model="user.dateNaiss" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />-->
                                                     </b-form-group>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-phone"> {{ $t('data.profile_profession') }} </label>
                                                       <input type="text" id="example-phone" :placeholder="$t('data.profile_profession_exemple')" class="form-control" v-model="updateUser.profession">
                                                         <!--<input type="text" id="example-phone" placeholder="Ex: Architecte" class="form-control" v-model="user.profil.profession">-->
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <b-form-group :label="$t('data.profile_photo_profile')" class="ml-4">
                                                        <div class="photo-cite d-flex justify-content-center align-items-center border rounded-circle mx-auto" :style="'background-image: url('+updateUser.photo+');'" >
                                                        <!--<div class="photo-cite d-flex justify-content-center align-items-center border rounded-circle mx-auto" :style="'background-image: url('+updateUser.photo+');'" >-->
                                                            <b-button variant="light" @click.prevent="$refs.photoCite.click()" class="btn-icon"><i class="fa fa-camera-retro fa-lg text-muted"></i></b-button>
                                                            <input type="file" class="d-none" ref="photoCite" @change="onFileSelected">
                                                        </div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col>
                                                    <b-row>
                                                        <b-col>
                                                            <label for="example-phone"> {{ $t('data.profile_address_cni') }} </label>
                                                            <input type="tel" id="example-phone" placeholder="114978758" class="form-control" v-model="updateUser.cni">
                                                            <!--<b-form-group class="ml-4" :label="$t('data.profile_genre')" v-slot="{ ariaDescribedby }">
                                                           <b-form-radio-group
                                                                id="radio-slots"
                                                                v-model="updateUser.genre"
                                                                :options="options"
                                                                :aria-describedby="ariaDescribedby"
                                                                name="radio-options-slots"
                                                            >
                                                            </b-form-radio-group>
                                                        </b-form-group>-->
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col>
                                                            <div class="form-group">
                                                                <label for="example-phone"> {{ $t('data.profile_address_phone_secondaire') }} </label>
                                                                <input type="tel" id="example-phone" :placeholder="$t('data.profile_address_phone_exemple')" class="form-control" v-model="updateUser.tel2">
                                                                <!--<input type="tel" id="example-phone" placeholder="Ex: 667134414" class="form-control" v-model="user.profil.tel2">-->
                                                            </div>
                                                        </b-col>
                                                      
                                                    </b-row>
                                                    <b-row>
                                                        <b-col>
                                                            <div class="form-group">
                                                                <label for="example-email">{{$t('data.profile_address_email_secondaire')}} </label>
                                                                <input type="email" class="form-control" :placeholder="$t('data.profile_address_email_exemple')" id="example-email" v-model="updateUser.email2">
                                                                <!--<input type="email" class="form-control" placeholder="Ex: laplace@yahoo.fr" id="example-email" v-model="user.profil.email2">-->
                                                            </div>
                                                        </b-col>
                                                        
                                                    </b-row>
                                                </b-col>
                                            </b-row>
       
                                        </div>
                                    </transition>
                                    <button type="button" class="btn btn-secondary btn-rounded mr-4" @click="activeUpdateForm">{{$t('data.profile_modifier_mot_de_passe')}}</button>
                                    <transition enter-active-class="animated zoomIn">
                                        <div v-if="step ==2">
                                            <div class="form-group">
                                                <label for="example-password">{{$t('data.profile_mot_de_passe_actuel')}}</label>
                                                <input type="password" value="password" class="form-control" name="example-password" id="example-password" v-model="actualmdp">
                                            </div>
                                            <div class="form-group">
                                                <label for="example-password">{{ $t('data.profile_mot_de_passe_nouveau') }}</label>
                                                <input type="password" value="password" class="form-control" name="example-password" id="example-password" v-model="newmdp">
                                            </div>
                                        </div>
                                    </transition>
                                    <button class="btn btn-success" type="submit">{{ $t('data.profile_mot_de_passe_mettre_a_jour')}}<!--<b-spinner v-if="submitted" small></b-spinner>--></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

export default {
    data:() =>({
        submitted: false,
    
        step:1,
        updateUser:{
            nom:'', prenom:'',tel:'',tel2:'',email:'',email2:'',profession:'',dateNaiss:'',genre:'',cni:'',
            photo:''
        },
        actualmdp:"",
        newmdp:"",
        url:null,
        options: [
          { text: 'Monsieur', value: 'M' },
          { text: 'Mme', value: 'Mme' },
          { text: 'Mademoiselle', value: 'Mlle'},
        ],
         mainProps: {width: 150, height: 150, class: 'm1' }

    }),
    components: {
        DatePicker
    },
     computed: { 
        ...mapGetters(['user'])
    },
    //...mapState(['user']),
    mounted() {
        console.log("==================================================");
        console.log(this.user);
        console.log("==================================================");
        this.updateUser.nom = this.user.nom;
        this.updateUser.prenom = this.user.prenom;
        this.updateUser.email = this.user.email;
        this.updateUser.dateNaiss = this.user.dateNaiss;
        this.updateUser.profession = this.user.profil.profession;
        this.updateUser.tel = this.user.tel;
        this.updateUser.tel2 = this.user.profil.tel2;
    },
    methods: {
        /**
         * Selection avatar utilisateur conncecté
         */
        onFileSelected(event) {
            let file = event.target.files[0],
                    reader = new FileReader(),
                    updateUser = this.updateUser
                reader.onload = function() {
                    updateUser.photo = this.result
                    console.log("result", result)
                }
                reader.readAsDataURL(file)
        },
        activeUpdateForm(){
            this.step=2
            console.log("step",this.step)
        },
         sendUserDataForm(){
            this.submitted = true
            //if (this.step==1){
                const personalData={
                    nom:this.updateUser.nom,
                    prenom:this.updateUser.prenom,
                    dateNaiss:this.updateUser.dateNaiss,
                    cni:this.updateUser.cni,
                    avatar:this.updateUser.photo,
                    email:this.updateUser.email,
                    tel:this.updateUser.tel,
                    mdp:this.newmdp
                }
               /* const personalData={
                    nom:this.user.nom,
                    prenom:this.user.prenom,
                    dateNaiss:this.user.dateNaiss,
                    avatar:this.updateUser.photo,
                    email:this.user.email,
                    tel:this.user.tel,
                    mdp:this.newmdp
                }*/
                axios.put('account/profil', personalData).then(response => {
                    this.submitted = false
                    console.log("response ok", response)
                    this.updateUser.nom='';this.updateUser.prenom='';this.updateUser.dateNaiss='';
                    this.updateUser.photo='';this.updateUser.email='';this.updateUser.email2='';this.updateUser.tel2=''; this.updateUser.photo='';
                    this.actualmdp=''; this.newmdp=''; this.updateUser.genre='';
                    /*this.user.nom='';this.user.prenom='';this.user.tel='';this.user.dateNaiss='';
                    this.updateUser.photo='';this.user.email='';this.user.profil.email2='';this.user.profil.tel2='';*/
                    
                    /*this.user.nom=response.result.nom;this.user.prenom=response.result.prenom;
                    this.user.tel=response.result.tel;this.user.email=response.result.email;
                    this.user.avatar=response.result.avatar;*/
                    console.log('result',response.result);
                    this.$store.commit('user_data', response.result)
                    storage.set('user',response.result)
                    this.step=1
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)
                })

            
            /*if (this.step == 2) {
                axios.put('update-password', {mdp: this.actualmdp, code: this.newmdp}).then(response => {
                    App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)    
                })
                
            }*/
        },
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