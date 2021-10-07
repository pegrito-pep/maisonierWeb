<template>
    <div>
        <page-description title="Accueil" description="bienvenu sur le maisonier" icon="home" :path="[ ]"/>
        <div class="row">
            <div class="form-box-content">
                <div class="row-fluid">
                    <div class="span12 p-t-10 p-b-10 p-l-10 text-center">
                        <img src="/img/homepage.jpg" width="50%" class="hidden-phone">
                        <h4 class="lead m-b-20 m-t-20">Merci de vous être inscrit ! Nous sommes heureux de vous avoir à bord !</h4>
                        <p>Nous vous prions de bien vouloir configurer vos biens immobiliers;celà passe par la création de:</p>
                        <span class="font-weight-bold">vos cités, vos batiments, vos logements, vos habitants,...</span>
                        <div class="row-fluid">
                            <vue-slider v-model="pourcentage" :disabled="disabled"></vue-slider>
                            <p>Votre profil est prêt à <b>15%</b>
                            <b-tooltip target="button-complete-profil" placement="top" noninteractive variant="success">mon profil</b-tooltip>
                            <button type="button" class="btn btn-primary diposition" id="button-complete-profil"  @click.prevent="gotToProfile">Compléter mon profil  <i class="fas fa-arrow-alt-circle-right"></i></button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-box-content">
                <div class="row-fluid">
                    <div class="span12 p-t-10 p-b-10 p-l-10">
                        <h4 class="m-b-20 m-t-20 fontTitle">comment créer ma cité ?</h4>
                        <b-card img-src="/img/bgCity.jpg" img-alt="Card image" img-right>
                            <b-card-text class="text-form-bien">
                                Nous entendons par cité dans notre plateforme, une ensembre regroupé de batiments ou de logements.
                                Pour créer une cité, vous devez renseigner un nom, une reférence et de manière optionnelle une photo de votre cité.
                                Nous vous donnons aussi la possibilité de pouvoir modifier les informations d'une cité existante en changeant de photo par exemple
                                
                            </b-card-text>
                            <b-tooltip target="button-new-cite" placement="top" noninteractive variant="success">nouvelle cité</b-tooltip>
                                <button type="button" class="btn btn-primary diposition" id="button-new-cite" @click.prevent="createCite"><i class="fa fa-plus-circle"></i>Créer une cité</button>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-box-content">
                <div class="row-fluid">
                    <div class="span12 p-t-10 p-b-10 p-l-10">
                        <h4 class="m-b-20 m-t-20 fontTitle">comment créer mon batiment ?</h4>
                        <b-card img-src="/img/imgBatiment.jpg" img-alt="Card image" img-right>
                            <b-card-text class="text-form-bien">
                                Nous entendons par batiment dans notre plateforme, une construction destinée à servir d'abri ou d'habitat et à protéger des biens et des personnes des conditions météorologiques extérieures.
                                Pour créer un batiment, vous devez renseigner un nom, une reférence et de manière optionnelle la citè à laquelle appartient votre batiment.                                
                            </b-card-text>
                            <b-tooltip target="button-new-batiment" placement="top" noninteractive variant="success">nouveau batiment</b-tooltip>
                                <button type="button" class="btn btn-primary diposition" id="button-new-batiment"  @click.prevent="createBatiment"><i class="fa fa-plus-circle"></i>Créer un batiment</button>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-box-content">
                <div class="row-fluid">
                    <div class="span12 p-t-10 p-b-10 p-l-10">
                        <h4 class="m-b-20 m-t-20 fontTitle">comment créer mon logement?</h4>
                        <b-card img-src="/img/imgLogementHomepage.jpg" img-alt="Card image" img-right>
                            <b-card-text class="text-form-bien">
                                Nous entendons par batiment dans notre plateforme, un local utilisé pour l'habitation. Il peut etre libre ou associé à un batiment.
                                Pour créer votre logement, il vous sera démandé la reférence, le type de logement, un intervalle de prix(prix min et prix max),
                                les coordonnées de ce dernier et ses caractéristiques(nombre de chambres, salons, cuisines, douches...)
                            </b-card-text>
                            <b-tooltip target="button-new-logement" placement="top" noninteractive variant="success">Accéder aus logements</b-tooltip>
                                <button type="button" class="btn btn-primary diposition" id="button-new-logement" @click.prevent="createLogement"><i class="fa fa-plus-circle"></i>Acceder aux logements</button>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-box-content">
                <div class="row-fluid">
                    <div class="span12 p-t-10 p-b-10 p-l-10">
                        <h4 class="m-b-20 m-t-20 fontTitle">comment créer mon habitant?</h4>
                        <b-card img-src="/img/profile-picture.jpg" img-alt="Card image" img-right>
                            <b-card-text class="text-form-bien">
                                Nous entendons par habitant dans notre plateforme, toute personne qui prend à bail un logement.Ainsi donc un habitant put avoir plusieurs
                                logements. Pour créer un habitant vous devez tout d'abord chosir le mode de création:est ce qu'il s'agit d'un utlisaeur entidaté ou alors
                                d'un habitant disposant d'un code utilisateur.
                            </b-card-text>
                            <b-tooltip target="button-new-habitant" placement="top" noninteractive variant="success">acceder aux habitants</b-tooltip>
                                <button type="button" class="btn btn-primary diposition" id="button-new-habitant"  @click.prevent="createHabitant"><i class="fa fa-plus-circle"></i>Accéder aux habitants</button>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
    name: 'Home',
    components: {
        VueSlider
    },
    data: () => ({
        pourcentage:15,
        disabled: true
    }),
    methods:{
        createCite() {
            this.$router.push({name: 'cites', query: {target: "call-cite"}})
        },
        createBatiment(){
           this.$router.push({name: 'batiments', query: {target: "call-batiment"}}) 
        },
        createLogement(){
            this.$router.push({name: 'logements', query: {target: "call-logement"}}) 
        },
        createHabitant(){
            this.$router.push({name: 'habitants', query: {target: "call-habitant"}}) 
        },
        gotToProfile(){
            this.$router.push({name: 'profil', query: {target: "call-profile"}}) 
        }
    }
}
</script>
<style scoped>
@font-face {
  font-family: "font-1";
  src: url(/fonts/rampart-one-Font/RampartOne-Regular.ttf);
}
@font-face {
  font-family: "font-2";
  src: url(/fonts/ephesis/Ephesis-Regular.ttf);
}
.fontTitle{
  font-family: "font-1", sans-serif;
  font-size: 2em;
}
 .text-form-bien{
  font-family: "font-2", sans-serif;
  font-size: 3em;
 }
 .diposition{
    float:right;
 }
 .display-image{
     max-height: 100%;
 }
</style>