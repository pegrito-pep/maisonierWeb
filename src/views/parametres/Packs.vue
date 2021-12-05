<template>
    <div>
        <div>
            <h3 class="headline">Formules d'utilisation du <span class="font-weight-bold" style="color: #f5365c;">Maisonier</span></h3><span class="line margin-bottom-45"></span>
            <div class="clearfix"></div> <br> <br>
        </div>
        <b-row>
            <b-col lg="4" md="6" sm="12"  class="plan four"  v-for="formule in formulesPaiement" :key="formule.idFormule">
                <div>
                    <div class="plan-price">
                        <h3>{{ formule.type }}</h3><span class="value">{{ formule.prix }}</span><span class="plan-currency">{{ userData.preferences.devise }}</span> <span class="period">/ par an</span>
                    </div>
                    <div class="plan-features">
                        <ul class="pl-0">
                            <li  v-for="(acces,i) in formule.access" :key="i">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" color="green" class="bi bi-check" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                                {{ acces }}
                            </li>
                        </ul> <a class="button" href="#" @click.prevent="suscribeToFormule(formule)">Souscrire</a>
                    </div>
                </div>
            </b-col>
        </b-row>

        <!--MODAL DE PAIEMENT -->
        <b-modal id="modal-payment" hide-footer no-close-on-backdrop>
            <template #modal-title>
                Souscription au forfait<code> {{ formuleType }}</code>
            </template>
            <div class="d-block text-center">
              <b-row>
                  <b-col>FACTURATION</b-col>
                  <b-col cols="7">
                    <b-form-group label="" class="position-relative">
                        <b-form-textarea
                            class="mb-1"
                            placeholder=''
                            rows="3"
                            :disabled="true"
                            v-model="placeholderDtaFacturation"
                        ></b-form-textarea>
                        <a href="" v-b-tooltip.top="$t('data.detail_habitant_modifier')" @click.prevent="goToProfile" class="setPosition"><i class="fas fa-edit"></i></a>
                    </b-form-group>
                  </b-col>
             </b-row>
             <b-row class="mb-1 mt-1">
                  <b-col>TYPE</b-col>
                  <b-col cols="7">
                        <v-select label="libelle" :options="typesForfaits" v-model="typeF" :class="{ disabled: disabled == true }"></v-select>
                  </b-col>
             </b-row>
             <b-row>
                  <b-col>MOYEN DE PAIEMENT</b-col>
                  <b-col cols="7">
                        <v-select label="title" :options="modePaiements" v-model="modeP" :class="{ disabled: disabled == true }"></v-select>
                        <span class="help-block m-t-0">
                            <img src="/img/imgPayments/mtn_mobileMoney.png" width="36" alt="Amex" border="0">
					        <img src="/img/imgPayments/orange_money.jpg" width="36" alt="Paypal" border="0">
					        <img src="/img/imgPayments/carte_visa.png" width="36" alt="Visa" border="0">
					        <img src="/img/imgPayments/master_card.png" width="36" alt="Mastercard" border="0">
					        <img src="/img/imgPayments/paypal.png" width="36" alt="Direct debit" border="0">
					        <br>Vous pouvez payer par MTN Mobile Money, Orange Money ou Paypal.			
                        </span>
                  </b-col>
             </b-row>
             <b-row class="mt-2">
                  <b-col>FREQUENCE</b-col>
                  <b-col cols="7">
                        <b-form-radio-group
                            v-model="frequencePaiement"
                            :options="options"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                            disabled-field="notEnabled"
                        ></b-form-radio-group>
                  </b-col>
             </b-row>                  
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Payer</b-button>
        </b-modal>
    </div>
</template>
<script>
    const php  = require ( 'phpjs' ); 
     export default {
        name: "Packs",
       data:()=>({
           disabled:false,
           formuleType:'',
           frequencePaiement:'A',
           typeF:'gratuit',
           modeP:'paypal',
           options: [
            { item: 'A', name: '12 000 F/ 3 mois' },
            { item: 'B', name: '40 000 F/ An' }
          ],
          modePaiements: [
            {
            title: 'Paypal',
            icon: 'fa fa-database',
            moyen: 'paypal'
            },
            {
            title: 'MTN Mobile money',
            icon: 'fa fa-book',
            device: 'mntMoMo'
            },
            {
            title: '  Orange Money',
            icon: 'fas fa-dollar-sign',
            device: 'om'
            },
        ],
        typesForfaits: [
            {
            libelle:'choisissez un type',
            valeur:'gratuit',
            },
            {
            libelle:'SILVER (limité)',
            valeur:'SILVER',
            },
            {
            libelle:'GOLD (full access)',
            valeur:'GOLD',
            },
        ],
        formulesPaiement: [
            {
                idFormule:1,
                type: 'GRATUIT',
                prix:'0',
                access:[
                    'Limité à 02 locataires',
                    'Limité à 2 locations',
                    'Utilisateur Unique',
                    '02 Modèles de contrat',
                    'Limité à 1 lot',
                    'stats limités',
                    'Analyses et rentabilité limité'
                ],
            },
            {
                idFormule:2,
                type: 'SILVER',
                prix:'50000',
                access:[
                    'etat des lieu illimité',
                    'Limité à 2 locations',
                    'locataires illimmités',
                    'limité à 50 locations',
                    'utilisateur unique',
                    'stats illimités',
                    'Analyses et rentabilité limité'
                ],
            },
            {
                idFormule:3,
                type: 'GOLD',
                prix:'90000',
                access:[
                    'etat des lieu illimité',
                    'locataires illimmités',
                    'locations illimmités',
                    'Multi-utilisateur',
                    'Modèles de contrat illimité',
                    'stats illimités',
                    'Analyses et rentabilité illimité'
                ],
            },

        ],
       }),
     
        watch: {
        },
        computed: {
        userData() {
            return this.$store.state.user
        },
        placeholderDtaFacturation(){
            return this.$store.state.user.nom+' '+this.$store.state.user.prenom+', '+this.$store.state.user.tel
        },
    },
        methods:{
            goToProfile(){
                this.$router.push({name: 'profil', query: {target: "call-profile"}}) 
            }, 
            /**
             * METHODE DE SOUSCRIPTION A UNE FORMULE
             */
            suscribeToFormule(formule){
                console.log('formule ',formule);
                this.formuleType=formule.type
                this.typeF=formule.type;
                this.$bvModal.show('modal-payment')
            }
        /*_display_infosUser(){
            let description1=this.userData.nom+' '+this.userData.prenom
            let description2='CAMEROUN'+' Yaoundé'+this.userData.tel

           

            return `<span>
                <b>${description1}</b> F <br>
                <span class="small">${description2}</span>
            </span>`
            }*/
        },
        mounted(){
            console.log('user data',this.userData.preferences.devise);
        },
    }
</script>
<style scoped>
.plan-price h3 {
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
    margin-bottom: 25px;
    color: #606060;
    font-weight: 600;
    text-align: center;
    background-color: rgba(0, 0, 0, .02)
}

.plan-price {
    font-size: 36px;
    font-weight: 300;
    color: #606060;
    text-align: center;
    padding: 0 0 22px;
    position: relative
}

.plan .plan-price,
.plan a.button {
    background-color: #f6f6f6
}



.plan a.button {
    font-size: 18px !important;
    font-weight: bold;
}

.plan:hover .plan-price,
.plan:hover a.button {
    background-color: #f5365c;
    color: #fff;
}

.plan:hover .plan-price h3,
.plan:hover .plan-price .value {
    color: #fff ;
}

.plan:nth-child(3) .plan-price,
.plan:nth-child(3) a.button {
    background-color: #f5365c;
    color: #fff;
}

.plan:nth-child(3) .plan-price h3,
.plan:nth-child(3) .plan-price .value {
    color: #fff ;
}






/* .plan.color-4 .plan-price,
.plan.color-4 a.button {
    background-color: #e54b81
} */

/* .plan.color-5 .plan-price,
.plan.color-5 a.button {
    background-color: #a558a6
} */

.plan-price .value {
    font-weight: 600;
    letter-spacing: -1px;
    color: #f5365c;
}

.plan-currency {
    font-size: 22px;
    opacity: .7;
    position: relative;
    margin: 0px 0px 0 3px;
    top: -15px;
    font-weight: 300;
}

.period {
    display: block;
    font-size: 16px;
    margin: 2px 0 0;
    opacity: .7
}

.plan-features {
    background: #fff;
    border-top: none;
    padding: 12px 0 0;
}

.plan-features ul li {
    padding: 8px 0;
    text-align: center
}

.plan-features a.button {
    position: relative;
    display: block;
    margin: 0 auto;
    margin: 12px 0;
    text-align: center;
    color: #666;
    padding: 10px 0;
    font-size: 14px;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out
}

.color-2 .plan-price,
.color-3 .plan-price,
.color-4 .plan-price,
.color-5 .plan-price,
.color-2 .plan-price h3,
.color-3 .plan-price h3,
.color-4 .plan-price h3,
.color-5 .plan-price h3,
.color-2 .plan-price .plan-currency,
.color-3 .plan-price .plan-currency,
.color-4 .plan-price .plan-currency,
.color-5 .plan-price .plan-currency,
.color-2 .plan-features a.button,
.color-3 .plan-features a.button,
.color-4 .plan-features a.button,
.color-5 .plan-features a.button {
    color: #fff
}

.color-2 .plan-price h3,
.color-3 .plan-price h3,
.color-4 .plan-price h3,
.color-5 .plan-price h3 {
    background-color: rgba(0, 0, 0, .05)
}


.plan > div {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
}

.button {
    margin-bottom: 100px
}
li{
    list-style-type: none;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
}
.setPosition{
    position:absolute;
    top: 1px;
    right: 1px;
}

</style>