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
                        <p class="description">
                           {{$t('data.slide_1_description')}}
                        </p>
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
                        <p class="description">
                            {{$t('data.slide_3_description')}}
                        </p>
                        </div>
                        <div class="overlay"></div>
                        <img class="w-100 image" src="@/assets/img/chambre2.jpg" />
                    </template>
                    </b-carousel-slide>
                </b-carousel>
                </b-col>
                <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto">
                        <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                            <b-link :to="{name: 'home'}"><b-img src="@/assets/img/logo-m0.png" style="width: 4em; height: 4em"/></b-link>
                            <h3 class="text-center mt-4 mb-0 font-weight-bold">{{$t('data.forgotPassword_retrouver_mdp')}}</h3>
                        </div>
                        
                        <form action="" @submit.prevent="sendForm">
                            <transition enter-active-class="animated zoomIn">
                                <div v-if="step == 1">
                                    <div class="form-group">
                                        <input type="email" class="form-control" :placeholder="$t('data.forgotPassword_addresse_email')" required="" v-model="email">
                                        <i class="ik ik-mail"></i>
                                    </div>
                                </div>
                            </transition>
                            <transition enter-active-class="animated zoomIn">
                                <div v-if="step == 2">
                                    <div class="form-group">
                                        <input type="text" class="form-control" :placeholder="$t('data.forgotPassword_code_verification')" required="" v-model="code">
                                        <i class="fa fa-key"></i>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" :placeholder="$t('data.forgotPassword_nouveau_mdp')" required="" v-model="mdp">
                                        <i class="ik ik-lock"></i>
                                    </div>
                                </div>
                            </transition>
                            
                            <div class="sign-btn text-center">
                                <b-button type="submit" :disabled="submitted" class="valid-btn">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small></b-spinner></b-button>
                            </div>
                        </form>
                        <div class="register-footer">
                            <span>{{$t('data.forgotPassword_vous_avez_pas_de_compte')}}</span>
                            <b-link :to="{ name: 'register' }" v-b-hover="handleHover">{{$t('data.forgotPassword_inscription')}}</b-link>
                        </div>
                        <div class="conditions">
                            Protégé pa reCAPTCHA et soumis aux <b>Politiques de confidentialité</b> et <b>Conditions d'utilisation de Flysoft Engineering</b>
                        </div>
                    </div>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgotPassword',
    data: () => ({
        submitted: false,
        email: null,
        code: null,
        mdp: null,
        step: 1,
    }), 
    methods: {
        sendForm() {
            this.submitted = true
            if (this.step == 1) {
                axios.post('forget-password', {email: this.email}).then(response => {
                    storage.remove('user-email')
                    this.step = 2
                    this.submitted = false
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)
                })
            }
            if (this.step == 2) {
                axios.post('check-forget', {login: this.email, code: this.code}).then(response => {
                    axios.put('update-password', {mdp: this.mdp, code: this.code}).then(response => {
                        App.notifySuccess(response.message)
                        this.$router.push({name: 'login'})
                    }).catch(error => {
                        this.submitted = false
                        App.notifyError(error.message)    
                    })
                }).catch(error => {
                    this.submitted = false
                    App.notifyError(error.message)
                })
            }
        }
    }
}
</script>

<style scope>
    .forgotpwd {
        color: #ee3a5b;
    }
    .forgotpwd:hover {
        color: #ee3a5b;
        font-weight: bold;
    }
    .maisonier{
      color: #009;
      font-weight: 900;
      font-size: 40px;
    }
    .form-group{
      display: flex;
      align-items: center;
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
    .overlay{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      z-index: 9;
    }
    .titre-overlay {
      position: absolute;
      opacity: 1;
      padding: 0;
      margin: 0;
      top: 20%;
      left: 10%;
      z-index: 10;
      max-width: 40rem;
    }
    .titre {
      font-size: 50px;
      font-family: "Times New Roman", Times, serif;
      font-weight: 900;
      color: #fff;
    }
    .description {
      font-size: 25px;
      font-family: serif;
      color: #fff;
    }
    .image {
      height: 100vh;
    }
    .register-footer{
      margin-top: 50px;
      display: flex;
      justify-content: center;
      height: auto;
      width: 100%;
    }
    .register-footer span,.register-footer a{
      text-align: center;
      font-size: .8em;
      font-weight: 600;
      color: #a3a3a3;
    }
    .register-footer a{
      margin-left: 10px;
      color:#020202;
      text-decoration: underline;
    }
    .valid-btn{
      height: 45px;
      width: 150px;
      border-radius: 10px;
      font-weight: bold;
      border: none;
      background: #020202;
      box-shadow: 0 5px 12px rgba(59, 41, 41, 0.089);
      transition: .3s ease;
    }
    .conditions{
      position: absolute;
      bottom: -25%;
      width: 70%;
      font-size: .6em;
      text-align: center;
    }
    .conditions b{
      color: rgba(1, 121, 201, 0.842);
    }
</style>