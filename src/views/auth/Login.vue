<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <b-row class="flex-row h-100 bg-white">
                <div class="col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                    <div class="lavalite-bg" style="background-image: url('/img/banner.png')">
	                    <!--<div class="lavalite-overlay"></div>-->
                    </div>
                </div>
           
                <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto">
                        <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                            <b-link :to="{name: 'home'}"><b-img src="/img/logo-m0.png" style="width: 4em; height: 4em"/></b-link>
                            <h3 class="text-center mt-2 mb-0">Se connecter</h3>
                        </div>
                        
                        <form action="" @submit.prevent="sendForm">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email" required="" v-model="login">
                                <i class="ik ik-user"></i>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" required="" v-model="mdp">
                                <i class="ik ik-lock"></i>
                            </div>
                            <div class="row">
                                <div class="col text-right">
                                    <b-link :to="{name: 'forgot-password'}">Mot de passe oublié ?</b-link>
                                </div>
                            </div>
                            <div class="sign-btn text-center">
                                <b-button type="submit" :disabled="submitted" class="btn-theme">Connexion <b-spinner v-if="submitted" small></b-spinner></b-button>
                            </div>
                        </form>
                        <div class="register">
                            <p>Pas de compte? <b-link :to="{name: 'register'}">Créer un compte maintenant</b-link></p>
                        </div>
                    </div>
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
        login: null, 
        mdp: null,
    }), 
    methods: {
        sendForm() {
            this.submitted = true

            axios.post('signin', {login: this.login, mdp: this.mdp}).then(response => {
                storage.set('access_token', response.result.access_token)
                storage.set('refresh_token', response.result.refresh_token)
                this.$router.push({name: 'home'})
            }).catch(error => {
                this.submitted = false
                App.notifyError(error.message)
            })
        }
    }
}
</script>