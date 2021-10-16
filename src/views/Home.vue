<template>
    <div>
        <page-description title="Accueil" description="bienvenu sur le maisonier" icon="home" :path="[ ]"/>
        <link rel="stylesheet" href="">
        <div class="top-banner">
            <div class="img">
                <div class="bg"></div>
                <div class="txt">
                    <h1>Bienvenu sur la plateforme maisonnier</h1>
                    <p>Ici vous pourrez créer des: cités, batiments, logements et habitants. Mais avant, veuillez completer votre profil <br> Profil complet à <b>15%</b></p>
                    <button @click.prevent="gotToProfile">Terminer votre profil</button>
                </div>
            </div>
            <div class="summary">
                <div class="stat">
                    <div class="stat-item">
                        <i class="fa fa-building"></i>
                        <div>
                            <h3>Batiments</h3>
                            <span>Pas de batiment pour le moment</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-home"></i>
                        <div>
                            <h3>Logements</h3>
                            <span>Pas de logements pour le moment</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <div>
                            <h3>Habitants</h3>
                            <span>Pas d'habitant pour le moment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action-container">
            <span>Actions rapides</span>
            <div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/cite.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer une cité</h2>
                        <p>Une cité est un ensemble de plusieurs batiments regroupés dans une zone</p>
                        <button @click.prevent="createCite">Créer</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/batiment (2).jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer un batiment</h2>
                        <p>Un batiment est un édifice doté de plusieurs residences (appartements, studios etc)</p>
                        <button @click.prevent="createBatiment">Créer</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/appart-sejour.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer un logement</h2>
                        <p>Un logement est une residence destiné a hébergé un habitant (ex appartement, maison, studio)</p>
                        <button @click.prevent="createLogement">Créer</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/loc.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer un habitant</h2>
                        <p>Un habitant est tout simplement une personne (votre locataire) qui occupe votre logement</p>
                        <button @click.prevent="createHabitant">Créer</button>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="row">
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
        </div>-->
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
    mounted() {
        setTimeout(() => {
        $('button.nav-toggle').click()
            
        }, 100);
    },
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
.top-banner{
    position: relative;
    display:flex;
    width:100%;
    height:50vh;
    border-radius:5px;
}
.top-banner .img{
    position: relative;
    display:flex;
    width:100%;
    background:url(/img/appart.jpg);
    height:90%;
    border-radius:5px;
}
.top-banner .img .bg{
    display:flex;
    width:100%;
    height:100%;
    background:linear-gradient();
    background: rgba(0, 0, 0, .7);
    border-radius:5px;
}
.top-banner .img .txt{
    box-sizing: border-box;
    padding: 3% 5% 0 0;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 70%;
    height: 100%;
}
.top-banner .img .txt h1{
    text-align: right;
    font-weight: 700;
    color: white;
    font-size: 3em;
}
.top-banner .img .txt p{
    font-weight: 500;
    width: 75%;
    text-align: right;
    color: white;
}
.top-banner .img .txt p b{
    font-weight: 800;
    color: #00D1FF;
}
.top-banner .img .txt button{
    height: 45px;
    font-weight: 800;
    color: white;
    background: rgba( 255, 255, 255, 0.1 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 11px );
    -webkit-backdrop-filter: blur( 11px );
    border-radius: 2px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );


}
.top-banner .summary{
    position: absolute;
    left: 0;
    bottom: -5%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30%;
}
.summary .stat{
    box-sizing: border-box;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80%;
}
.summary .stat .stat-item{
    display: flex;
    align-items: center;
    width: 28%;
    height: 90%;
    border-radius: 5px;
    background: white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .036);
}
.summary .stat .stat-item i{
    margin: 0 20px;
}
.summary .stat .stat-item div{
    padding: 5% 0;
    width: 80%;
    height: 100%;
}
.summary .stat .stat-item h3{
    font-weight: 600;
    margin: 0 0 10px;
    font-size: .9rem;
}
.summary .stat .stat-item span{
    margin: 0;
    font-size: .8rem;
    color: #A3A3A3;
}
.action-container{
    box-sizing: border-box;
    padding: 5% 0;
    margin: 0;
    display:flex;
    flex-direction: column;
    width:100%;
    height:auto;
    border-radius:5px;
}
.action-container > span{
    font-size: 1.5rem;
    font-weight: 600;
}
.action-container > div{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width: 100%;
    height: auto;
}
.action-container > div .action-item{
    margin-top:3rem;
    display:flex;
    width:48%;
    background:white;
    height:30vh;
    border-radius:5px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .026);
    transition: .3s ease;
}
.action-container > div .action-item:hover{
    transform: scale(1.03);
}
.action-item .img{
    display:flex;
    width:60%;
    background:rgb(34, 82, 145);
    height:100%;
    border-radius:2px 0 0 2px;
}
.action-item .img img{
    width:100%;
    height:100%;
    border-radius:2px 0 0 2px;
    object-fit: cover;
}
.action-item .txt{
    box-sizing: border-box;
    padding: 5% 2% 0;
    display:flex;
    flex-direction: column;
    width:40%;
    height:100%;
    border-radius:2px 0 0 2px;
}
.action-item .txt p{
    color: #A3A3A3;
}
.action-item .txt button{
    height: 40px;
    border-radius: 2px;
    width: 50%;
    border: none;
    font-weight: 600;
    transition: .3s ease;
    color: white;
    background: rgba(24, 24, 24, 0.897);
    box-shadow: 0 5px 20px rgba(0, 0, 0, .026);
}
.action-item .txt button:hover{
    transform: scale(1.05);
}
.action-item .txt h2{
    font-size: 1.5rem;
}
@media only screen and (max-height: 700px) {
    .top-banner{
    height:60vh;
}
.action-container > div .action-item{
    height:40vh;
}
}
/*.fontTitle{
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
 }*/
</style>