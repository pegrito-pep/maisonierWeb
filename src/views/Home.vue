<template>
    <div>
        <link rel="stylesheet" href="">
         <b-overlay :show="showOverlay" rounded="sm">   
            <div class="top-banner">
                <div class="img" :style="`background:url(${$router.options.base}img/appart.jpg)`">
                    <div class="bg"></div>
                    <div class="txt">
                        <h1> {{ $t('data.home_bienvenu') }}</h1>
                        <p> {{ $t('data.home_paragraphe_informatif1') }} <br>{{ $t('data.home_paragraphe_informatif2') }} <b>{{ pourcentage }}%</b></p>
                        <button @click.prevent="gotToProfile" v-if="compteur!=0"> {{ $t('data.home_terminer_profil') }}</button>
                    </div>
                </div>
                <div class="summary">
                    <div class="stat">
                        <div class="stat-item">
                            <i class="fa fa-building"></i>
                            <div>
                                <h3> {{ $t('data.home_batiments') }} </h3>
                                <span v-if="nbrBatiments ==0"> {{ $t('data.home_aucun_batiment') }}</span>
                                <span v-else>{{ nbrBatiments }} {{ $t('data.home_batiments_crees') }}  </span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-home"></i>
                            <div>
                                <h3> {{ $t('data.home_logements') }} </h3>
                                <span v-if="logements.length ==0"> {{ $t('data.home_pas_de_logements') }} </span>
                                <span v-else>{{ logements.length }} {{ $t('data.home_logements_crees') }} </span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <h3> {{ $t('data.home_habitants') }} </h3>
                                <span v-if="locataires.length ==0"> {{ $t('data.home_pas_dhabitants') }} </span>
                                <span v-else>{{ locataires.length }} {{ $t('data.home_locataires_crees') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
         </b-overlay> 
        <div class="action-container">
            <span> {{ $t('data.home_actions_rapides') }} </span>
            <div>
                <div class="action-item">
                    <div class="img">
                        <img src="@/assets/img/citee.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2> {{ $t('data.home_creer_une_cite') }} </h2>
                        <p> {{ $t('data.home_descripton_cite') }} </p>
                        <button @click.prevent="createCite"> {{ $t('data.home_creer') }} </button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="@/assets/img/batiment (2).jpeg" alt="">
                    </div>
                    <div class="txt">
                        <h2> {{ $t('data.home_creer_batiment') }} </h2>
                        <p> {{ $t('data.home_description_batiment') }}</p>
                        <button @click.prevent="createBatiment"> {{ $t('data.home_creer') }}</button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="@/assets/img/appart-sejour (2).jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2> {{ $t('data.home_creer_logement') }} </h2>
                        <p> {{ $t('data.home_description_logement') }} </p>
                        <button @click.prevent="createLogement"> {{ $t('data.home_creer') }} </button>
                    </div>
                </div>
                <div class="action-item">
                    <div class="img">
                        <img src="@/assets/img/loc.jpg" alt="">
                    </div>
                    <div class="txt">
                        <h2> {{ $t('data.home_creer_habitant') }} </h2>
                        <p> {{ $t('data.home_description_habitant') }}</p>
                        <button @click.prevent="createHabitant"> {{ $t('data.home_creer') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',

    data: () => ({
        pourcentage:15,
        disabled: true,
        showOverlay: true,
        logements:[],
        locataires:[],
        nbrBatiments:0,
        compteur:0
    }),
    computed: {
        userData() {
            return this.$store.state.user
        },
    },
    mounted() {
        setTimeout(async() => {
            $('button.nav-toggle').click()
            await this.getStatistiquesData()
        }, 100);
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
        },
        //données statistiques
        async getStatistiquesData(){
            this.showOverlay = true
        try {
                this.logements = await axios.get("logements").then(response => response.result || []);
           
                } catch (error) {
                    notif.error(error.message);
                }
                try {
                    this.locataires=await axios.get("locataires").then(response => response.result || []);
                } catch (error) {
                notif.error(error.message);
                }
                try {
                    this.nbrBatiments=await axios.get("/stats/nbr-batiments").then(response => response.result || 0);
                } catch (error) {
                notif.error(error.message);
                }
                /* 
                    A supprimer car cette operation est deja faite et les information de l'utilisateur sont dans le store
                    C'est ce qui occasionnait la lanteur obser
                try {
                    this.userData=await axios.get("utilisateurs/"+storage.get('access_token')).then(response => response.result || []);
                } catch (error) {
                notif.error(error.message);
                } */
                if(!this.userData.nom){this.compteur++}
                if(!this.userData.prenom){this.compteur++}
                if(!this.userData.avatar){this.compteur++}
                if(!this.userData.email){this.compteur++}
                if(!this.userData.tel){this.compteur++}
                 if(!this.userData.genre){this.compteur++}
                if(!this.userData.dateNaiss){this.compteur++}
                if(!this.userData.profil.cni){this.compteur++}
                if(!this.userData.profil.titre){this.compteur++}
                if(!this.userData.profil.profession){this.compteur++}
                if(this.compteur>6){
                    this.pourcentage=15
                }
                if(this.compteur>=4&&this.compteur<6){
                    this.pourcentage=50
                }
                if(this.compteur<3){
                    this.pourcentage=75
                }
                 if(this.compteur==0){
                    this.pourcentage=100
                }

            this.showOverlay = false
    }
    }
}
</script>
<style scoped>

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
    /*background:url(@/assets/img/appart.jpg);*/
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