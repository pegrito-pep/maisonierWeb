<template>
    <div>
        <page-description title="Profil" description="Profil utilisateur" icon="user" :path="[]" />
        <b-row>
            <b-col lg="4" md="5">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center"> 
                            <b-img :src="user.avatar" rounded="circle" width="150" />
                            <h4 class="card-title mt-10">{{ user.profil.titre + ' ' + user.nom + ' ' + user.prenom }}</h4>
                            <p class="card-subtitle font-weight-bold" :class="user.isCertified ? 'text-succes' : 'text-danger'">{{ user.code }}
                            <b-button v-if="!user.isCertified" class="btn-icon my-1" variant="warning" id="certified-infos"><i class="fa fa-envelope" aria-hidden="true"></i></b-button></p>
                             <b-tooltip target="certified-infos" placement="right" noninteractive variant="success"><h4>Certifier mes informations</h4>
                             celà consiste à envoyer mes informations pour étude aux administrateurs de la plateforme.
                             Bien vouloir cliquer sur le bouton pour certifier vos infomations</b-tooltip>
                            <div class="row text-center justify-content-md-center">
                                <div class="col-4" id="nombre-locataires" v-b-tooltip.top="'Le nombre de mes locataires'"><a href="javascript:void(0)" class="link"><i class="ik ik-user"></i> <font class="font-medium">254</font></a></div>
                                <div class="col-4" id="nombre-logements-libres"><a href="javascript:void(0)" class="link"><i class="ik ik-image"></i> <font class="font-medium">02</font></a></div>
                                <b-tooltip target="nombre-logements-libres" placement="bottom" noninteractive variant="danger">Le nombre de mes logements libres et sans annonce publié</b-tooltip>
                            </div>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                    <div class="card-body"> 
                        <small class="text-muted d-block">E-mail</small>
                        <h6>{{ user.email }}</h6> 
                        <small class="text-muted d-block pt-10">N° Téléphone</small>
                        <h6>{{ user.tel }}</h6> 
                        <small class="text-muted d-block pt-30">Le maisonier sur les reseaux sociaux</small>
                        <br>
                        <button class="btn btn-icon btn-facebook" id="facebook-maisonier"><i class="fab fa-facebook-f"></i></button>
                        <b-tooltip target="facebook-maisonier" placement="top" noninteractive variant="primary">Accéder à la page Facebook du Maisonier</b-tooltip>
                        <button class="btn btn-icon btn-twitter ml-1" id="twitter-maisonier"><i class="fab fa-twitter"></i></button>
                        <b-tooltip target="twitter-maisonier" placement="bottom" noninteractive variant="secondary">Accéder au compte Twitter du Maisonier</b-tooltip>
                        <button class="btn btn-icon btn-instagram ml-1" id="instagram-maisonier"><i class="fab fa-instagram"></i></button>
                        <b-tooltip target="instagram-maisonier" placement="top" noninteractive variant="success">Accéder au compte Instagram du Maisonier</b-tooltip>
                        <button class="btn btn-icon ml-1" id="youtube-maisonier" style="background:#E90D39"><i class="fab fa-youtube" style="color:white"></i></button>
                        <b-tooltip target="youtube-maisonier" placement="right" noninteractive variant="danger">Accéder à la chaine youtube du Maisonier</b-tooltip>
                    </div>
                </div>
            </b-col>
            <b-col lg="8" md="7">
                <div class="card">
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-timeline-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-timeline" aria-selected="true">Activité</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#last-month" role="tab" aria-controls="pills-profile" aria-selected="false">Mes informations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting" aria-selected="false">Mise à jour</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="current-month" role="tabpanel" aria-labelledby="pills-timeline-tab">
                            <div class="card-body">
                                <div class="profiletimeline mt-0">
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/img/users/1.jpg" alt="user" class="rounded-circle"> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <p>assign a new task <a href="javascript:void(0)"> Design weblayout</a></p>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/img/big/img2.jpg" class="img-fluid rounded"></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/img/big/img3.jpg" class="img-fluid rounded"></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/img/big/img4.jpg" class="img-fluid rounded"></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/img/big/img5.jpg" class="img-fluid rounded"></div>
                                                </div>
                                                <div class="like-comm"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/img/users/2.jpg" alt="user" class="rounded-circle"> </div>
                                        <div class="sl-right">
                                            <div> <a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <div class="mt-20 row">
                                                    <div class="col-md-3 col-xs-12"><img src="/img/big/img6.jpg" alt="user" class="img-fluid rounded"></div>
                                                    <div class="col-md-9 col-xs-12">
                                                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. </p> <a href="javascript:void(0)" class="btn btn-success"> Design weblayout</a>
                                                    </div>
                                                </div>
                                                <div class="like-comm mt-20"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/img/users/3.jpg" alt="user" class="rounded-circle"> </div>
                                        <div class="sl-right">
                                            <div>
                                                <a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <p class="mt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper </p>
                                            </div>
                                            <div class="like-comm mt-20"> 
                                                <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/img/users/4.jpg" alt="user" class="rounded-circle"> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <blockquote class="mt-10">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="last-month" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 col-6"> <strong>Full Name</strong>
                                        <br>
                                        <p class="text-muted">Johnathan Deo</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Mobile</strong>
                                        <br>
                                        <p class="text-muted">(123) 456 7890</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Email</strong>
                                        <br>
                                        <p class="text-muted">johnathan@admin.com</p>
                                    </div>
                                    <div class="col-md-3 col-6"> <strong>Location</strong>
                                        <br>
                                        <p class="text-muted">London</p>
                                    </div>
                                </div>
                                <hr>
                                <p class="mt-30">Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries </p>
                                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <h4 class="mt-30">Skill Set</h4>
                                <hr>
                                <h6 class="mt-30">Wordpress <span class="pull-right">80%</span></h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width:80%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">HTML 5 <span class="pull-right">90%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width:90%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">jQuery <span class="pull-right">50%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                                <h6 class="mt-30">Photoshop <span class="pull-right">70%</span></h6>
                                <div class="progress  progress-sm">
                                    <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%;"> <span class="sr-only">50% Complete</span> </div>
                                </div>
                            </div>
                        </div>
                            <div class="tab-pane fade " id="previous-month" role="tabpanel" aria-labelledby="pills-setting-tab">
                            <div class="card-body">
                                <form class="form-horizontal" @submit.prevent="sendUserDataForm">
                                    <transition enter-active-class="animated zoomIn">
                                        <div>
                                            <b-row>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-name">Nom(s)</label>
                                                        <input type="text" class="form-control" placeholder="Ex: TAGNE" id="example-name" v-model="updateUser.nom">
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-name">Prénom(s)</label>
                                                        <input type="text" class="form-control" placeholder="Ex: Miguel Pedro" id="example-name" v-model="updateUser.prenom">
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-email">Email</label>
                                                        <input type="email" class="form-control" placeholder="Ex: tagnemiguel@gmail.com" id="example-email" v-model="updateUser.email">
                                                    </div>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-phone">N° de Téléphone</label>
                                                        <input type="tel" id="example-phone" placeholder="Ex: 693803726" class="form-control" v-model="updateUser.tel">
                                                    </div>
                                                </b-col>
                                            </b-row>
                                             <b-row>
                                                <b-col>
                                                     <b-form-group label="Date de Naissance">
                                                        <date-picker v-model="updateUser.dateNaiss" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                                                     </b-form-group>
                                                </b-col>
                                                <b-col>
                                                    <div class="form-group">
                                                        <label for="example-phone">Proféssion</label>
                                                        <input type="text" id="example-phone" placeholder="Ex: Architecte" class="form-control" v-model="updateUser.profession">
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <b-form-group label="Photo de profil" class="ml-4">
                                                        <div class="photo-cite d-flex justify-content-center align-items-center border rounded-circle mx-auto" :style="'background-image: url('+updateUser.photo+');'" >
                                                            <b-button variant="light" @click.prevent="$refs.photoCite.click()" class="btn-icon"><i class="fa fa-camera-retro fa-lg text-muted"></i></b-button>
                                                            <input type="file" class="d-none" ref="photoCite" @change="onFileSelected">
                                                        </div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col>
                                                    <b-row>
                                                        <b-col>
                                                            <b-form-group class="ml-4" label="Genre" v-slot="{ ariaDescribedby }">
                                                            <b-form-radio-group
                                                                id="radio-slots"
                                                                v-model="updateUser.genre"
                                                                :options="options"
                                                                :aria-describedby="ariaDescribedby"
                                                                name="radio-options-slots"
                                                            >
                                                            </b-form-radio-group>
                                                        </b-form-group>
                                                        </b-col>
                                                        
                                                    </b-row>
                                                    <b-row>
                                                        <b-col>
                                                            <div class="form-group">
                                                                <label for="example-phone">N° de Téléphone secondaire</label>
                                                                <input type="tel" id="example-phone" placeholder="Ex: 667134414" class="form-control" v-model="updateUser.tel2">
                                                            </div>
                                                        </b-col>
                                                      
                                                    </b-row>
                                                    <b-row>
                                                        <b-col>
                                                            <div class="form-group">
                                                                <label for="example-email">Email Secondaire</label>
                                                                <input type="email" class="form-control" placeholder="Ex: laplace@yahoo.fr" id="example-email" v-model="updateUser.email2">
                                                            </div>
                                                        </b-col>
                                                        
                                                    </b-row>
                                                </b-col>
                                            </b-row>
       
                                        </div>
                                    </transition>
                                    <button type="button" class="btn btn-secondary btn-rounded mr-4" @click="activeUpdateForm">Modifier mon mot de passe</button>
                                    <transition enter-active-class="animated zoomIn">
                                        <div v-if="step ==2">
                                            <div class="form-group">
                                                <label for="example-password">Mot de passe Actuel</label>
                                                <input type="password" value="password" class="form-control" name="example-password" id="example-password" v-model="actualmdp">
                                            </div>
                                            <div class="form-group">
                                                <label for="example-password">Nouveau mot de passe</label>
                                                <input type="password" value="password" class="form-control" name="example-password" id="example-password" v-model="newmdp">
                                            </div>
                                        </div>
                                    </transition>
                                    <button class="btn btn-success" type="submit">Mettre à jour<b-spinner v-if="submitted" small></b-spinner></button>
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
            nom:'', prenom:'',tel:'',tel2:'',email:'',email2:'',profession:'',dateNaiss:'',genre:'',
            photo:''
        },
        actualmdp:"",
        newmdp:"",
        url:null,
        options: [
          { text: 'Monsieur', value: 'M' },
          { text: 'Mme', value: 'Mme' },
          { text: 'Mademoiselle', value: 'Mlle'},
        ]

    }),
    components: {
        DatePicker
    },
     computed: { 
        ...mapGetters(['user'])
    },
    ...mapState(['user']),
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
                    avatar:this.updateUser.photo,
                    email:this.updateUser.email,
                    tel:this.updateUser.tel
                }
                axios.put('account/profil', personalData).then(response => {
                    this.submitted = false
                    this.updateUser.nom='';this.updateUser.prenom='';this.updateUser.dateNaiss='';
                    this.updateUser.photo='';this.updateUser.email='';this.updateUser.email2='';this.updateUser.tel2='';
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)
                })

            
            if (this.step == 2) {
                axios.put('update-password', {mdp: this.actualmdp, code: this.newmdp}).then(response => {
                    App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)    
                })
                
            }
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