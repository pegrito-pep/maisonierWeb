<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <b-row class="flex-row h-100 bg-white">
                <div class="col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                    <div class="lavalite-bg" style="background-image: url('/img/banner.png')">
                        <div class="lavalite-overlay"></div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto">
                        <div class="mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column">
                            <b-link :to="{name: 'home'}"><b-img src="/img/logo-m0.png" style="width: 4em; height: 4em"/></b-link>
                            <!--<h3 class="text-center mt-2 mb-0">Confirmer votre email</h3>-->
                             
                                <span class="defineFont">Veuillez consulter votre boite mail pour avoir votre code d'activation</span>
                           
                        </div>
                        
                        <form action="" @submit.prevent="sendForm">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Code d'activation" required="" v-model="code">
                                <i class="fa fa-key"></i>
                            </div>
                            <div class="sign-btn text-center">
                                <b-button type="submit" :disabled="submitted" class="btn-theme">Valider <b-spinner v-if="submitted" small></b-spinner></b-button>
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
        code: null,
    }), 
    methods: {
        sendForm() {
            this.submitted = true

            axios.post('check-otp', {login: storage.get('user-email'), code: this.code}).then(response => {
                storage.remove('user-email')
                this.$router.push({name: 'login'})
            }).catch(error => {
                this.submitted = false
                App.notifyError(error.message)
            })
        }
    }
}
</script>
<style scoped>
    @font-face {
        font-family: "font-1";
        src: url(/fonts/rampart-one-Font/RampartOne-Regular.ttf);
    }
    .defineFont {
        font-family: "font-1", sans-serif;
        font-size: 1.3em;
        color: #050213FA;
    }
</style>