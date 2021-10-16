<template>
  <div class="auth-wrapper">
    <div class="container-fluid h-100 ">
      <b-row class="flex-row h-100">
        <b-col xl="8" lg="6" md="5" class="d-md-block d-lg-block d-none p-0">
          <b-carousel :interval="8000" controls indicators background="#ababab">
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre"><blockquote class="">Dans un environement qui change, il n'y a pas plus grand risque que de rester immobile</blockquote></h1>
                  <p class="description">
                    Prenez votre envole et découvrez avec nous ce que nous réserve le <span class="maisonier">Maisonier</span> : votre application de gestion immobilière
                  </p>
                </div>
                <img class="w-100 image" src="/img/cites.jpeg" />
              </template>
            </b-carousel-slide>
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre">Propriété moderne avec vue sur ...</h1>
                  <p class="description">
                    Grande propriété de style moderne avec vue imprenable sur la ville au sept collines.
                  </p>
                </div>
                <img class="w-100 image" src="/img/villa1.jpg" />
              </template>
            </b-carousel-slide>
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre">Appartement moderne près de Yaoundé</h1>
                  <p class="description">
                    Appartement constitué d'un espace nuit comprenant 3 chambres et un espace cuisine
                  </p>
                </div>
                <img class="w-100 image" src="/img/appartement.jpg" />
              </template>
            </b-carousel-slide>
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre">Chambre moderne à Yaoundé</h1>
                  <p class="description">
                    Idéalement situé sur le rempart ouest de la ville de Yaoundé
                  </p>
                </div>
                <img class="w-100 image" src="/img/chambre2.jpg" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>

        <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0 ">
          <div class="authentication-form mx-auto">
            <div
              class="
                mt-n5
                mb-4
                d-flex
                justify-content-center
                align-items-center
                flex-column
              "
            >
              <b-link :to="{ name: 'home' }"
                ><b-img src="/img/logo-m0.png" style="width: 4em; height: 4em"
              /></b-link>
              <h3 class="text-center mt-2 mb-0 font-weight-bold">
                Se connecter
              </h3>
            </div>

            <form action="" @submit.prevent="sendForm">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
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
              <div class="row">
                <div class="col text-right">
                  <b-link
                    :to="{ name: 'forgot-password' }"
                    v-b-hover="handleHoverForgot"
                    class="forgotpwd"
                    >Mot de passe oublié ?</b-link
                  >
                </div>
              </div>
              <div class="sign-btn text-center">
                <b-button type="submit" :disabled="submitted" class="btn-theme"
                  >Connexion <b-spinner v-if="submitted" small></b-spinner
                ></b-button>
              </div>
            </form>
            <div class="register">
              <p>
                Pas de compte?
                <b-link
                  :to="{ name: 'register' }"
                  v-b-hover="handleHover"
                  class="signup"
                  >Créer un compte maintenant</b-link
                >
              </p>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    submitted: false,
    login: null,
    mdp: null,
    isHovered: false,
    isHoveredForget: false,
  }),
  methods: {
    //gestion du survol sur crée un compte maintenant
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
          storage.set("access_token", response.result.access_token);
          storage.set("refresh_token", response.result.refresh_token);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.submitted = false;
          App.notifyError(error.message);
        });
    },
  },
};
</script>
<style scope>
    .signup,
    .forgotpwd,
    .signup:hover,
    .forgotpwd {
    color: #ee3a5b;
    }
    .signup:hover,
    .forgotpwd:hover {
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
    
</style>