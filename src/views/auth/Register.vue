<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <b-row class="flex-row h-100 bg-white">
                <div class="col-xl-7 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                    <div class="lavalite-bg" style="background-image: url('/img/banner.png')">
                        <div class="lavalite-overlay"></div>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto" style="width: 90%">
                        <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                            <b-link :to="{name: 'home'}"><b-img src="/img/logo-m0.png" style="width: 4em; height: 4em"/></b-link>
                            <h3 class="text-center mt-2 mb-0">S'inscrire</h3>
                        </div>
                        
                        <form action="" @submit.prevent="sendForm">
                            <div class="mb-5">
                                <b-row>
                                    <b-col><div class="form-group">
                                        <input type="text" class="form-control" placeholder="Nom de famille" required="" v-model="nom">
                                        <i class="ik ik-user"></i>
                                    </div></b-col>
                                    <b-col><div class="form-group">
                                        <input type="text" class="form-control" placeholder="Prenom" v-model="prenom">
                                        <i class="ik ik-user"></i>
                                    </div></b-col>
                                </b-row>
                                <b-row>
                                    <b-col><div class="form-group">
                                        <input type="tel" class="form-control" placeholder="Téléphone" required="" v-model="tel">
                                        <i class="ik ik-phone"></i>
                                    </div></b-col>
                                    <b-col><div class="form-group">
                                        <input type="email" class="form-control" placeholder="Email" v-model="email">
                                        <i class="ik ik-mail"></i>
                                    </div></b-col>
                                </b-row>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Password" required="" v-model="mdp">
                                    <i class="ik ik-lock"></i>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <div class="form-radio">
                                        <div class="radio radio-inline">
                                            <label>
                                                <input type="radio" name="radio" v-model="genre" value="homme">
                                                <i class="helper"></i> Homme
                                            </label>
                                        </div>
                                        <div class="radio radio-inline">
                                            <label>
                                                <input type="radio" name="radio" v-model="genre" value="femme">
                                                <i class="helper"></i> Femme
                                            </label>
                                        </div>
                                        <div class="radio radio-inline">
                                            <label>
                                                <input type="radio" name="radio" v-model="genre" value="entreprise">
                                                <i class="helper"></i> Entreprise
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="row">
                                <div class="col-12 text-left">
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" required>
                                        <span class="custom-control-label">J'accepte les termes et conditions d'utilisation</span>
                                    </label>
                                </div>
                            </div>
                            <div class="sign-btn text-center">
                                <b-button type="submit" :disabled="submitted" class="btn-theme">Inscription <b-spinner v-if="submitted" small></b-spinner></b-button>
                            </div>
                        </form>
                        <div class="register">
                            <p>Déjà inscrit ? <b-link :to="{name: 'login'}">Connectez-vous</b-link></p>
                        </div>
                    </div>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
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
            this.submitted = true
            const data = {
                nom: this.nom,
                prenom: this.prenom,
                tel: this.tel,
                email: this.email,
                genre: this.genre,
                mdp: this.mdp,
            }
            axios.post('signup', data).then(response => {
                App.notifySuccess(response.message)
                storage.set('user-email', this.email)
                this.$router.push({name: 'confirm'})
            }).catch(error => {
                this.submitted = false
                App.notifyError(error.message)
            })
        }
    }
}
</script>