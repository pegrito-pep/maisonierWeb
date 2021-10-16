<template>
  <div class="auth-wrapper">
    <div class="container-fluid h-100">
      <b-row class="flex-row h-100 bg-white">
        <b-col xl="8" lg="6" md="5" class="d-md-block d-lg-block d-none p-0">
          <b-carousel :interval="8000" controls indicators background="#ababab">
            <b-carousel-slide class="responsive border-0">
              <template #img>
                <div class="titre-overlay">
                  <h1 class="titre"><blockquote class="">Qui traverse la vie voit de nombreuses choses. Qui voyage voit bien d'avantage</blockquote></h1>
                  <p class="description">
                    Le <span class="maisonier">Maisonier</span> est votre fidèle compagnon de voyage qui, prend en main la gestion de votre patrimoine immobilier et vous rend compte dans les moindres détails.
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
        <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
          <div class="authentication-form mx-auto" style="width: 90%">
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
              <h3 class="text-center mt-2 mb-0 font-weight-bold my-4">
                S'inscrire
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
                        placeholder="Nom de famille"
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
                    placeholder="Password"
                    required=""
                    v-model="mdp"
                  />
                  <i class="ik ik-lock"></i>
                </div>
                <div class="d-flex justify-content-center">
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
              <div class="row">
                <div class="col-12 text-left">
                  <label class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      required
                    />
                    <span class="custom-control-label accept"
                      >J'accepte les termes et conditions d'utilisation</span
                    >
                  </label>
                </div>
              </div>
              <div class="sign-btn text-center">
                <b-button type="submit" :disabled="submitted" class="btn-theme"
                  >Inscription <b-spinner v-if="submitted" small></b-spinner
                ></b-button>
              </div>
            </form>
            <div class="register">
              <p>
                Déjà inscrit ?
                <b-link :to="{ name: 'login' }" class="connect"
                  >Connectez-vous</b-link
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
.accept {
  color: #ee3a5b;
  padding-top: 5px;
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