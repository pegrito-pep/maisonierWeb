<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <b-row class="flex-row h-100 bg-white">
                <b-col xl="8" lg="6" md="5" class="d-md-block d-lg-block d-none p-0">
                <b-carousel :interval="4000" indicators background="#ababab">
                    <b-carousel-slide class="responsive border-0">
                    <template #img>
                        <div class="titre-overlay">
                        <h1 class="titre"><blockquote class="">{{$t('data.slide_1_titre')}}</blockquote></h1>
                        <p class="description">{{$t('data.slide_1_description')}}</p>
                        </div>
                        <div class="overlay"></div>
                        <img class="w-100 image" src="@/assets/img/cites.jpeg" />
                    </template>
                    </b-carousel-slide>
                    <b-carousel-slide class="responsive border-0">
                    <template #img>
                        <div class="titre-overlay">
                        <h1 class="titre"><blockquote class="">{{$t('data.slide_2_titre')}}</blockquote></h1>
                        <p class="description">{{$t('data.slide_2_description')}}</p>
                        </div>
                        <div class="overlay"></div>
                        <img class="w-100 image" src="@/assets/img/villa1.jpg" />
                    </template>
                    </b-carousel-slide>
                    <b-carousel-slide class="responsive border-0">
                    <template #img>
                        <div class="titre-overlay">
                        <h1 class="titre"><blockquote class="">{{$t('data.slide_3_titre')}}</blockquote></h1>
                        <p class="description">{{$t('data.slide_3_description')}}</p>
                        </div>
                        <div class="overlay"></div>
                        <img class="w-100 image" src="@/assets/img/appart-sejour (2).jpg" />
                    </template>
                    </b-carousel-slide>
                </b-carousel>
                </b-col>
                <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                    <b-overlay :show="showOverlay" rounded="sm">
                        <div class="authentication-form mx-auto">
                            <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                                <b-link :to="{name: 'home'}"><b-img src="@/assets/img/logo-m0.png" style="width: 4em; height: 4em"/></b-link>
                                <!--<h3 class="text-center mt-2 mb-0">Confirmer votre email</h3>-->
                                
                                    <span class="defineFont">{{$t('data.confirm_consulter_mail')}}</span>
                            
                            </div>
                            
                            <form action="" @submit.prevent="sendForm">
                                <!-- <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Code d'activation" required="" v-model="code">
                                    <i class="fa fa-key"></i>
                                </div> -->
                                <div id="otp" class="row code">
                                    <b-form-input type="text" maxlength="1" id="first" v-model="number1" class="form-control text-center"/>
                                    <b-form-input type="text" maxlength="1" id="second" v-model="number2" class="form-control text-center"/>
                                    <b-form-input type="text" maxlength="1" id="third" v-model="number3" class="form-control text-center"/>
                                    <b-form-input type="text" maxlength="1" id="fourth" v-model="number4" class="form-control text-center"/>
                                    <b-form-input type="text" maxlength="1" id="fifth" v-model="number5" class="form-control text-center"/>
                                    <b-form-input type="text" maxlength="1" id="sixth" v-model="number6" class="form-control text-center"/>
                                </div>
                                    <div class="sign-btn text-center">
                                        <b-button type="submit" :disabled="submitted" class="btn-theme">Valider <b-spinner class="ml-3" v-if="submitted" small></b-spinner></b-button>
                                    </div>
                                    <div v-if="submitted" class="d-flex justify-content-center my-3">
                                        <b-spinner large></b-spinner>
                                    </div>
                            </form>
                            <div class="register">
                                <p>{{$t("data.confirm_pas_compte")}} <b-link :to="{name: 'register'}"><span class="signup">{{$t('data.confirm_creer_compte')}}</span></b-link></p>
                            </div>
                            <div class="register">
                                <p>{{$t('data.confirm_pas_recu_de_code')}}<!--<a href="#"><span class="signup">{{$t('data.confirm_creer_compte')}}</span></a>--><a @click.prevent="seeEmail" href="#"><span class="signup ml-1">{{ adresse }}</span></a></p>
                                <transition enter-active-class="animated zoomIn">
                                    <b-form-group v-if="seeAdresse" label="email" description="">
                                        <b-form-input  type="email"  v-model="email" ></b-form-input>
                                    </b-form-group> 
                                </transition>
                                <b-button  @click="reSendMail" :disabled="submittedmail" class="btn-theme">{{$t('data.confirm_reenvoyer_code')}}<b-spinner v-if="submittedmail" class="ml-3" small></b-spinner></b-button>
                            </div>
                        </div>
                    </b-overlay>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        submitted: false,
        submittedmail: false,
        number1: null,
        number2: null,
        number3: null,
        number4: null,
        number5: null,
        number6: null,
        code: null,
        showOverlay: false,
        seeAdresse:false,
        adresse:"Voir l'adresse renseingée",
        email:""
    }),

    watch: {
        number6() {
            if (this.number6) {
                this.sendForm();
            }
        },
    
    },
    mounted() {
        this.OTPInput();
        this.email=storage.get('user-email');
    },
    

    methods: {
        seeEmail(){
            
            this.seeAdresse=!this.seeAdresse;
            if(this.seeAdresse){
                this.adresse="masquer l'adresse"
            }else{
                this.adresse="voir l'adresse renseignée"
            }
        },
        sendForm() {
            this.showOverlay = true;
            this.code = this.number1 + this.number2 + this.number3 + this.number4 + this.number5 + this.number6;
            axios.post('check-otp', {login: storage.get('user-email'), code: this.code}).then(response => {
                storage.remove('user-email')
                this.$router.push({name: 'login'})
                this.submitted = false
                this.showOverlay = false;
            }).catch(error => {
                 this.showOverlay = false;
                this.submitted = false
                App.notifyError(error.message)
            })
        },
        reSendMail(){
            this.submittedmail = true
            axios
                .post("resend-otp", { login: this.email, type: 'otp'})
                .then((response) => {
                App.notifySuccess(response.message);
                this.submittedmail = false;
            })
            .catch((error) => {
                this.submittedmail = false;
                App.notifyError(error.message);
            });
        },
        OTPInput() {
            const inputs = document.querySelectorAll('#otp > *[id]');
            for (let i = 0; i < inputs.length; i++) { 
                inputs[i].addEventListener('keydown', function(event) { 

                    console.log("===========================================");
                    console.log("Bonjour tout le monde je veux tester les évènements écoutés sur le clavier de ma machine !!!");
                    console.log("Touche : ", event.keyCode);
                    console.log("===========================================");
                    if (event.key==="Backspace" ) { 
                        inputs[i].value='' ;
                        if (i !==0) inputs[i - 1].focus(); 
                    }
                    else { 
                        if (i===inputs.length - 1 && inputs[i].value !=='' ) { 
                            return true;
                        } 
                        else if (event.keyCode> 47 && event.keyCode < 58) { 
                            inputs[i].value=event.key;
                            if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault();
                        } 
                        else if (event.keyCode> 64 && event.keyCode < 91) {
                            inputs[i].value=String.fromCharCode(event.keyCode); 
                            if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault();
                        }
                    }
                });
            } 
        }        
    }
}
</script>
<style scoped>
    .defineFont {
        font-size: 1.3em;
        color: #212121ef;
        font-weight: 800;
        text-align: center;
        margin-top: 20px;
    }
    .signup, .endmail{
        color: #ee3a5b;
    }
    .signup:hover, .endmail:hover{
        color: #ee3a5b;
        font-weight: bold;
    }

    .maisonier{
      color: #009;
      font-weight: 900;
      font-size: 40px;
    }

    .titre-overlay {
    position: absolute;
    opacity: 1;
    padding: 0;
    margin: 0;
    top: 20%;
    left: 10%;
    z-index: 9;
    max-width: 40rem;
    }

    .titre {
    font-size: 50px;
    font-family: "Times New Roman", Times, serif;
    font-weight: 900;
    color: #fff;
    }
    .titre::first-letter{
      color: #ee3a5b;
      font-size: 80px;
      border-bottom: 10px solid #ee3a5b;
    }

    .description {
    font-size: 26px;
    font-family: serif;
    font-weight: 600;
    color: #fff;
    }
    .image {
    height: 100vh;
    }
    .form-group{
      height: 60px;
    }

    .form-group i{
      margin-top: 12px;
    }
    .form-control{
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.028);
    }
    .code{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .code .form-control{
        margin: 3px;
        height: 60px;
        width: 60px;
        font-size: 22px;
    }
    
</style>