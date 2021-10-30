<template>
  <div class="auth-wrapper">
    <div class="container-fluid h-100">
      <b-row class="flex-row h-100 bg-white">
        <div class="col-xl-4 col-lg-6 col-md-7 p-0">
          <div class="authentication-form mx-auto" style="width: 80%;height:100vh;padding:10% 0 0;">
            <div class="register-top">
              <b-link :to="{ name: 'home' }">
                <b-img src="/img/logo-m0.png" style="width: 4em;" />
              </b-link>
              <h3 class="slogan">
                Créer votre compte
              </h3>
            </div>

            <form action="" @submit.prevent="sendForm">
              <div class="mb-5">
                <b-row>
                  <b-col
                    ><div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nom"
                        required=""
                        v-model="nom"
                      />
                      <i class="ik ik-user"></i></div
                  ></b-col>
                  <b-col
                    ><div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Prenom"
                        v-model="prenom"
                      />
                      <i class="ik ik-user"></i></div
                  ></b-col>
                </b-row>
                <b-row>
                  <b-col
                    ><div class="form-group">
                      <input
                        type="tel"
                        class="form-control"
                        placeholder="Téléphone"
                        required=""
                        v-model="tel"
                      />
                      <i class="ik ik-phone"></i></div
                  ></b-col>
                  <b-col
                    ><div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="email"
                      />
                      <i class="ik ik-mail"></i></div
                  ></b-col>
                </b-row>
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
                <div class="d-flex justify-content-center" style="margin-top:2rem">
                  <div class="form-radio">
                    <div class="radio radio-inline">
                      <label>
                        <input
                          type="radio"
                          name="radio"
                          v-model="genre"
                          value="homme"
                          checked
                        />
                        <i class="helper"></i> Homme
                      </label>
                    </div>
                    <div class="radio radio-inline">
                      <label>
                        <input
                          type="radio"
                          name="radio"
                          v-model="genre"
                          value="femme"
                        />
                        <i class="helper"></i> Femme
                      </label>
                    </div>
                    <div class="radio radio-inline">
                      <label>
                        <input
                          type="radio"
                          name="radio"
                          v-model="genre"
                          value="entreprise"
                        />
                        <i class="helper"></i> Entreprise
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div class="row" style="margin-top:2rem">
                <div class="col-12 text-left">
                  <label class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      required
                    />
                    <span class="custom-control-label accept">
                      La famille FlySoft entreprise est autorisée à m'envoyer des informations au travers d'emails <b>personnalisés</b> sur ses produits et services. Pour 
                      plus d'informations ou pour vous inscrire à tout moment, consultez notre <b>Politique de confidentialité</b>
                    </span
                    >
                  </label>
                </div>
              </div>
              <div class="sign-btn"> 
                <span>
                  Vous avez déjà un compte ?
                  <b-link :to="{ name: 'login' }">Connectez-vous</b-link>
                </span>
                <b-button type="submit" :disabled="submitted" class="inscription-btn">
                  Creer un compte <b-spinner v-if="submitted" small></b-spinner>
                </b-button>
              </div>
            </form>
            <div class="register">
            </div>
            
            <div>
              <span style="font-size:.7em;color: #979797;">
                En cliquant sur <b style="color:rgba(1, 121, 201, 0.842);">Creer un compte</b>, je déclare avoir lu et accepté les <b style="color:rgba(1, 121, 201, 0.842);">Politiques de confidentialité</b> et <b style="color:rgba(1, 121, 201, 0.842);">Conditions d'utilisation</b> de FlySoft Engineering
              </span>
            </div>
            <div>
              <span style="font-size:.7em;color: #979797;position:absolute;bottom:10px;">
                Protégé pa reCAPTCHA et soumis aux <b style="color:rgba(1, 121, 201, 0.842);">Politiques de confidentialité</b> et <b style="color:rgba(1, 121, 201, 0.842);">Conditions d'utilisation de Flysoft Engineering</b>
              </span>
            </div>
          </div>
        </div>
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
                <img class="w-100 image" src="/img/appart-sejour (2).jpg" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    submitted: false,
    nom: null,
    prenom: null,
    tel: null,
    email: null,
    genre: null,
    mdp: null,
  }),
  methods: {
    sendForm() {
      this.submitted = true;
      const data = {
        nom: this.nom,
        prenom: this.prenom,
        tel: this.tel,
        email: this.email,
        genre: this.genre,
        mdp: this.mdp,
      };
      axios
        .post("signup", data)
        .then((response) => {
          App.notifySuccess(response.message);
          storage.set("user-email", this.email);
          this.$router.push({ name: "confirm" });
        })
        .catch((error) => {
          this.submitted = false;
          App.notifyError(error.message);
        });
    },
  },
};
</script>

<style scoped>
    .register-top{
      display: flex;
      flex-direction: column;
      align-items: left;
      width: 100%;
    }    
    .register-top .slogan{
      margin-top: 1rem;
      text-align: left;
      width: auto;
      color: #020202;
      font-size: 1.9rem;
      font-weight: bold;
    }
    .register-top .slogan::first-letter{
      font-size: 1.8rem;
      font-weight: 700;
    }
    .sign-btn{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: auto;
    }
    .sign-btn span{
      font-size: .8em;
    }
    .sign-btn span a{
      color: rgba(1, 121, 201, 0.842);
      font-weight: 600;
    }
    .accept {
      font-size: .75em;
      padding-top: 5px;
      color: #979797;
    }
    .accept b{
      color: rgba(1, 121, 201, 0.842);
    }
    .inscription-btn{
      height: 45px;
      width: 150px;
      border-radius: 10px;
      font-weight: bold;
      border: none;
      background: #020202;
      box-shadow: 0 5px 12px rgba(59, 41, 41, 0.089);
      transition: .3s ease;
    }
    .inscription-btn:hover{
      transform: scale(1.03);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.199);
    }
    .connect {
      color: #ee3a5b;
    }

    .connect:hover {
      color: #ee3a5b;
      font-weight: bold;
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
    .form-group{
      display: flex;
      align-items: center;
      height: 50px;
    }
    .form-group i{
      margin-top: 12px;
    }
    .form-control{
      height: 100%;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.028);
    }
    
</style>