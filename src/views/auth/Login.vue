<template>
  <div class="auth-wrapper">
    <div class="container-fluid h-100 ">
      <b-row class="flex-row h-100">
        <b-col xl="8" lg="6" md="5" class="d-md-block d-lg-block d-none p-0">
          <b-carousel :interval="4000" indicators background="#ababab">
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre"><blockquote class="">Gérer facilement vos biens immobiliers</blockquote></h1>
                  <p class="description">
                    Prenez votre envole et découvrez une nouvelle façon de gerer vos biens. Plus besoin d'une assistance quelconque. Tout se fait en un clic.
                  </p>
                </div>
                <div class="overlay"></div>
                <img class="w-100 image" src="/img/cites.jpeg" />
              </template>
            </b-carousel-slide>
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre"><blockquote class="">Ne perdez plus aucune information</blockquote></h1>
                  <p class="description">
                    Le Maisonnier rassemble, traite et stocke toutes vos informations et vous permet d'utiliser votre memoire pour autre chose.
                  </p>
                </div>
                <div class="overlay"></div>
                <img class="w-100 image" src="/img/villa1.jpg" />
              </template>
            </b-carousel-slide>
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre"><blockquote class="">Optimiser la valeur de vos biens</blockquote></h1>
                  <p class="description">
                    Decouvrer la rentabilité de vos biens, observer vos bénéfices en continue, interagisser avec vos locataires et bien plus encore...
                  </p>
                </div>
                <div class="overlay"></div>
                <img class="w-100 image" src="/img/chambre2.jpg" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>

        <div class="col-xl-4 col-lg-6 col-md-7 p-0">
          <div class="authentication-form mx-auto">
            <div class="login-top">
              <b-link :to="{ name: 'home' }">
                <b-img src="/img/logo-m0.png" style="width: 4em;" />
              </b-link>
              <h3 class="slogan">
                Se connecter
              </h3>
            </div>

            <form action="" @submit.prevent="sendForm">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email ou téléphone"
                  required=""
                  v-model="login"
                />
                <i class="ik ik-user"></i>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Mot de passe"
                  required=""
                  v-model="mdp"
                />
                <i class="ik ik-lock"></i>
              </div>
              <div class="connexion-bloc">
                    <b-link
                      :to="{ name: 'forgot-password' }"
                      v-b-hover="handleHoverForgot"
                      class="forgotpwd"
                      >Mot de passe oublié ?</b-link>
                  <b-button type="submit" :disabled="submitted" class="connexion-btn">
                      Connexion<b-spinner class="ml-3" v-if="submitted" small></b-spinner>
                  </b-button>
              </div>
            </form>
            <div class="login-footer">
                <span>Vous n'avez pas de compte ?</span>
                <b-link :to="{ name: 'register' }" v-b-hover="handleHover">Inscrivez-vous</b-link>
            </div>
            <div class="conditions">
              Protégé pa reCAPTCHA et soumis aux <b>Politiques de confidentialité</b> et <b>Conditions d'utilisation de Flysoft Engineering</b>
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <div class="d-flex justify-content-between align-items-start">
        <b-button class="position-fixed validate btn-icon" variant="danger" @click.prevent="showSubmitForm" v-b-tooltip.left="'Nous écrire'"><b-spinner small v-if="submitted" /><i v-else class="ik ik-message-circle fa-lg"></i></b-button>
    </div>
    <transition enter-active-class="animated zoomIn"  leave-active-class="animated fadeOut zoomOut">
        <div class="test1" v-if="submitContactForm">
          <form class="form-contact-support" @submit.prevent="sendContactSupportForm">
              <b-row>
                <div>
                    <div class="input-group input-group-success ml-3 elargir">
                        <span class="input-group-prepend"><label class="input-group-text"><i class="fa fa-envelope"></i></label></span>
                        <input type="email" v-model="contactData.email" class="form-control" placeholder="Email" required="">
                        <span v-if="!requiredEmail" style="color:red;">Vous devez fournir une adresse mail'</span>
                    </div>
                </div>
                <!--<div md="4" class="ml-4">
                    <div class="input-group input-group-warning">
                        <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-file"></i></label></span>
                        <input type="text" v-model="contactData.tel" class="form-control" placeholder="N° de Téléphone">
                    </div>
                </div>-->
            </b-row>
            <b-row>
                <b-col cols="10">
                  <b-form-group label="Message">
                    <b-form-textarea
                      class="mb-2"
                      placeholder="En quoi pouvons nous vous aider ?"
                      rows="4"
                      required=""
                      v-model="contactData.message"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
            </b-row>
            <b-button type="submit" class="float-right" :disabled="submitted2" variant="outline-success">envoyer<b-spinner class="ml-2" small v-if="submitted2" style="margin-left: 5px;"></b-spinner></b-button>
          </form>
        </div>
    </transition>
  </div>
</template>

<script>
import notif from "@/plugins/notif.js";
export default {
  name: "Login",
  data: () => ({
    submitted: false,
    login: null,
    mdp: null,
    isHovered: false,
    isHoveredForget: false,
    //données liées au formulaire du support 
    submitContactForm:false,
    contactData:{
      email:"",
      message:""
    },
    requiredEmail:true,
    submitted2:false
  }),
  methods: {

    // gestion du survol sur crée un compte maintenant
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    handleHoverForgot(hovered) {
      this.isHoveredForget = hovered;
    },
    sendForm() {
      this.submitted = true;

      axios
        .post("signin", { login: this.login, mdp: this.mdp })
        .then((response) => {
          if(!response.result.statutUtilisateur){
             //notif.error('compte utilisateur inactif')
             App.notifyError('compte utilisateur inactif');
              setTimeout(() => {
                this.$router.push({ name: "confirm" });
            }, 500);
            return;
          }
          storage.set("access_token", response.result.access_token);
          storage.set("refresh_token", response.result.refresh_token);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.submitted = false;
          App.notifyError(error.message);
        });
    },
    //controler la visibilité du formulaire de contact du support
    showSubmitForm(){
      this.submitContactForm=!this.submitContactForm
      if(!this.submitContactForm){
        this.contactData.email=null;
        this.contactData.message=null;
        this.submitted2=false;
      }
    },
    //envoi des données pour le contact du support
    sendContactSupportForm(){
      this.submitted2 = true;
      console.log('data', this.contactData)
      axios
        .post("contact-support",this.contactData)
        .then((response) => {
          if (!response.success) {
            return App.alertError(response.message)
          }
          return App.notifySuccess(response.message)
        })
        .catch((error) => {
          this.submitted2 = false;
          return App.alertError(error.message)
        });
    },

    }
  }

</script>
<style scoped>
    .signup,
    .forgotpwd,
    .signup:hover,
    .forgotpwd {
    color: #ee3a5b;
    }
    .signup:hover {
    color: #ee3a5b;
    font-weight: bold;
    }
    .login-top{
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: left;
      width: 100%;
      height: 15vh;
    }    
    .login-top .slogan{
      margin-top: 1.5rem;
      text-align: left;
      width: auto;
      color: #020202;
      font-size: 1.9rem;
      font-weight: bold;
    }
    .login-top .slogan::first-letter{
      font-size: 1.8rem;
      font-weight: 700;
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
    .connexion-bloc{
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .connexion-btn{
      height: 45px;
      width: 150px;
      border-radius: 10px;
      font-weight: bold;
      border: none;
      background: #020202;
      box-shadow: 0 5px 12px rgba(59, 41, 41, 0.089);
      transition: .3s ease;
    }
    .connexion-btn:hover{
      transform: scale(1.03);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.199);
    }
    .login-footer{
      margin-top: 50px;
      display: flex;
      justify-content: left;
      height: auto;
      width: 100%;
    }
    .login-footer span,.login-footer a{
      text-align: center;
      font-size: .8em;
      font-weight: 600;
      color: #a3a3a3;
    }
    .login-footer a{
      margin-left: 10px;
      color:#020202;
      text-decoration: underline;
    }
    .forgotpwd{
      font-weight: 600;
      font-size: .8em;
      color: rgba(1, 121, 201, 0.842);
    }
    .maisonier{
      color: #009;
      font-weight: 900;
      font-size: 40px;
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
      object-fit: cover;
    }
    .conditions{
      position: absolute;
      bottom: 15px;
      font-size: .6em;
      text-align: left;
    }
    .conditions b{
      color: rgba(1, 121, 201, 0.842);
    }
    @media only screen and (max-width:600px){
      .forgotpwd{
      font-weight: 600;
      font-size: .75em;
      color: rgba(1, 121, 201, 0.842);
    }
    .authentication-form{
      width: 85%;
    }
    }
    
    /**
      css button de contact du support
    */
    button.validate{
    bottom: 1em;
    right: 1em;
    width: 3em;
    height: 3em;
    box-shadow: 3px 1px 1px gray;
}
/**css form */
  .form-contact-support {
    padding: 40px;
    background-color: white;
    margin: auto;
    margin-top: 100px;
    width: 400px;
    font-size: 18px;
    border-radius: 10px;
    box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, .4);
    min-height: 100px;
  }
  .elargir{
    min-width:240px;
  }
  .test1{
    position:absolute;
    right:2em;
    bottom:4.5em;
    z-index: 1000
  }
</style>