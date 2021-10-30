<template>
    <div>
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
                        <img src="/img/cite.jfif" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer une cité</h2>
                        <p>Une cité est un ensemble de plusieurs batiments regroupés dans une zone</p>
                        <button @click.prevent="createCite">Créer</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/batiment (2).jpeg" alt="">
                    </div>
                    <div class="txt">
                        <h2>Créer un batiment</h2>
                        <p>Un batiment est un édifice doté de plusieurs residences (appartements, studios etc)</p>
                        <button @click.prevent="createBatiment">Créer</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="/img/appart-sejour (2).jpg" alt="">
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

           let data = [
            {
                id:"1",
                typeContrat:"CONTRAT TYPE - LOCATION DE LOGEMENT VIDE"
            },
             {
                id:"2",
                typeContrat:"B A I L D ' U N E M A I S O N U N I F A M I L I A L E"
            },
             {
                id:"3",
                typeContrat:"CONTRAT TYPE - LOCATION DE LOGEMENT MEUBLE"
            },
             {
                id:"4",
                typeContrat:"CONTRAT TYPE - LOCATION  COMMERCIAL"
            },
            {
                id:"5",
                typeContrat:"CONTRAT TYPE - LOCATION MEUBLE-COMMERCIAL"
            }
        ]

        localStorage.setItem("contrats",JSON.stringify(data))

        let data2 = [
            {
                idModele:"1",
                titre:"contrat à but commercial",
                contenu:"<p>Un blog contribue à renforcer le SEO, à fidéliser une communauté sur les réseaux sociaux, à attirer prospects et clients, et à multiplier les call-to-action en vue de générer des leads inbound.</p><p>En dépit de ces avantages, de nombreux marketeurs hésitent à se lancer. Certains doutent de leurs qualités rédactionnelles, d'autres ne savent pas par quoi commencer. Tenir un blog est pourtant plus simple qu'il n'y parait.</p><div style=\"border: 1px solid #ccc; background: #efefef; border-radius: 5px; padding: 20px;\"><p style=\"text-align: center;\"><strong>Sommaire</strong></p>"
            },
             {
                idModele:"2",
                titre:"contrat de bail maisons",
                contenu:"<p>Le terme blog est un condensé de «&nbsp;web log&nbsp;», autrement dit, «&nbsp;journal en ligne&nbsp;». Les blogs sont apparus au début des années&nbsp;1990. À la manière d'un journal, ils permettaient à leurs auteurs de publier pensées et anecdotes sur un site web personnel, en vue de les partager une communauté de lecteurs virtuelle. Les premiers blogs étaient donc beaucoup plus intimistes qu'aujourd'hui.</p>"
            }
        ]
        localStorage.setItem("modelescontrats",JSON.stringify(data2))
    },
    methods:{
        createCite() {
            this.$router.push({name: 'cites', query: {formCite: "call-cite"}})
        },
        createBatiment(){
           this.$router.push({name: 'batiments', query: {formBatiment: "call-batiment"}}) 
        },
        createLogement(){
            this.$router.push({name: 'logements', query: {formLogement: "call-logement"}}) 
        },
        createHabitant(){
            this.$router.push({name: 'habitants', query: {formHabitant: "call-habitant"}}) 
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
    color:#f5365c;
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
    color:#f5365c;
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
    background: #191c22;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .026);
}
.action-item .txt button:hover{
    transform: scale(1.05);
}
.action-item .txt h2{
    font-size: 1.5rem;
    color: #020202;
}
@media only screen and (max-height: 700px) {
    .top-banner{
    height:60vh;
}
.action-container > div .action-item{
    height:40vh;
}
}
@media only screen and (max-width:600px){
    .top-banner .img .txt{
        padding: 1% 5% 0 0;
        width: 90%;
        height: 100%;
    }
    .top-banner .img .txt h1{
        text-align: right;
        font-weight: 700;
        color: white;
        font-size: 2rem;
    }
    .top-banner .img .txt p{
        font-weight: 500;
        width: 90%;
    }
    .top-banner .img .txt p b{
        font-weight: 800;
        color: #00D1FF;
    }
    .top-banner .summary{
        display: none;
    }
    .action-container > div{
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        width: 100%;
        height: auto;
    }
    .action-container > div .action-item{
        margin-top:3rem;
        flex-direction: column;
        width:90%;
        height:60vh;
        min-height: 250px;
        border-radius: 5px;
    }
    .action-item .img{
        display:flex;
        width:100%;
        height:50%;
        border-radius:5px 5px 0 0;
    }
    .action-item .img img{
        border-radius:5px 5px 0 0;
    }
    .action-item .txt{
        margin-top: 1.5rem;
        padding: 5% 5% 0;
        flex-direction: column;
        align-items: flex-end;
        width:100%;
        height:calc(50% - 1.5rem);
    }
    .action-item .txt p{
        text-align: right;
    }
    .action-item .txt button{
        height: 40px;
        border-radius: 2px;
        width: 50%;
        border: none;
        font-weight: 600;
        transition: .3s ease;
        color: white;
        background: #020202;
        box-shadow: 0 5px 20px rgba(0, 0, 0, .026);
    }
}
</style>