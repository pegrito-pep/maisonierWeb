<template>
        <b-overlay :show="showOverlay" rounded="sm">
            <form-wizard   title='' subtitle='' :nextButtonText='("data.batiment_form_wizard_suivant")' :backButtonText='$t("data.batiment_form_wizard_precedent")' :finishButtonText='$t("data.batiment_form_wizard_bouton_enregistrer")' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                            @on-loading="setLoading"
                            shape="circle"
                            color="#e74c3c" >
          
                <tab-content :title="$t('data.contrat_form_wizard_tab_content_titre_1')" icon="ik ik-edit-1" :before-change="validateSecond">
                    <b-row>
                        <b-col cols="4">
                            <label for="libelle-modele-contrat" class="big-size_text">{{$t('data.contrat_form_wizard_libelle_modele')}}</label>
                        </b-col>
                        <b-col cols="8">
                            <div class="input-group input-group-success">
                                <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-shield"></i></label></span>
                                    <input type="text" v-model="modelContrat.libele" class="form-control" :placeholder="$t('data.contrat_form_wizard_libelle_modele_exemple')">
                                    <span v-if="!requiredModelContrat" style="color:red;">{{$t('data.contrat_form_wizard_libelle_modele_obligatoire')}}</span>
                            </div>
                        </b-col>
                    </b-row>
                    <div>
                        <vue-editor v-model="content"></vue-editor>
                    </div>
                </tab-content>
     
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard>
        </b-overlay>
</template>
<script>
const php  = require ( 'phpjs' ) ; 

import notif from "@/plugins/notif.js";
import { VueEditor } from "vue2-editor";
export default {
    name: 'contratForm',
    components: {
        VueEditor,
    },
    computed: {
  
    },
    data: () => ({
        loadingWizard: false,
        showOverlay:true,

        logements:[],
        modelesExistants:[],
        modelContrat:{
            titre:'',
            libelle:''
        } , 
        modele:'',
        requiredModelContrat:true,
        check:true,
        check2:true,
        requiredRubriques:true,

        modeCreation:false,
        content:"<h1 class=\"ql-align-center\"><strong>CONTRAT DE BAIL A USAGE D'HABITATION </strong></h1><p><br></p><p><br></p><h3>	<strong>DESIGNATION DES PARTIES</strong></h3><p><br></p><h3>	<strong><u>LE COMPLEXE INDUSTRIEL DU CAMEROUN en abrégé ( CIC )</u></strong></h3><p>	</p><p>	 siège : <strong>.{{ LOGEMENT_ADRESSE_PAYS}}</strong></p><p>	</p><p>	Représenté par : <strong>.{{  NOM_BAILLEUR }}</strong></p><p>  </p><p>    N° de CNI : <strong>{{  CNI_BAILLEUR }}</strong></p><p><br></p><p>	Date de Délivrance : ....................</p><p><br></p><p>    Tél : <strong>{{  TEL_BAILLEUR }}</strong></p><p><br></p><p>                ci-après désigné  <strong>&lt;&lt; BAILLEUR &gt;&gt;</strong></p><p><br></p><p>																								<strong>ET</strong></p><p><br></p><h3>		</h3><h3>		<strong><u>Le LOCATAIRE</u></strong></h3><p>		</p><p>			 NOM:<strong> {{ LOCATAIRE_NOMS_PRENOMS }}</strong></p><p>	</p><p>			Né 	le : <strong>{{ LOCATAIRE_DATE_NAISSANCE  }}</strong></p><p>  </p><p>  		    Fils de  : ............</p><p><br></p><p>	        Exercant  de: ........</p><p><br></p><p>            N° de CNI: <strong>{{ LOCATAIRE_CNI }}</strong></p><p>		</p><p>			Date de délivrance: .................</p><p><br></p><p>			Tel: <strong>{{ LOCATAIRE_TEL  }}</strong></p><p><br></p><p>						 ci-après désigné  &lt;&lt; LE PRENEUR&gt;&gt;</p><p><br></p><h2>	</h2><h3>				<strong>IL A ETE ARRETE ET CONVENU CE QUI SUIT</strong></h3><p><br></p><p><br></p><h3>	<strong>Article 1: OBJET-USAGE DES LIEUX</strong></h3><p>	</p><p>	1.1 Le bailleur loue par les présentes au preneur qui accepte les lieux ci-après décrits à l'article 2, situé au quartier Mvan à usage exclusif d'habitation.</p><p><br></p><p>	1.2 Ils ne pourront être utilisé même temporairement à d'autres usages que celui ainsi arrêté sous</p><p>			peine de résiliation de plein droit de bail, suivi d'un délaissement immédiat à la première demande du bailleur&nbsp;.</p><p><br></p><p><br></p><h3>	<strong>Article 2: DESIGNATION-COMPOSITION-ETAT DES LIEUX</strong></h3><p><br></p><p>	2.1 Les locaux objet du présent bail se présentent ainsi qu'il suit :</p><ul><li>		<strong>{{ CARACTERISTIQUES_LOGEMENT }}</strong></li></ul><p><br></p><p>   2.2 Il n'est pas fait plus ample description des lieux loués, le preneur déclarant les connaitre parfaitement pour les avoir vu, visité, et accepté  tels quels avant conclusion du présent contrat</p><p><br></p><p>	2.2 A défaut des lieux ci-dessus, le preneur reconnait  qu'il sera réputé avoir occupé les lieux en parfait état.</p><p><br></p><h3><strong>Article 3: DUREE DU BAIL-AVENANT DE RENOUVELEMENT</strong></h3><p><br></p><p>	3.1 Le présent bail est inclus pour une durée ferme et définitive <strong>{{ CONTRAT_DUREE }}</strong> mois ? Sauf si les parties en disposent autrement</p><p><br></p><p>	3.2 Un mois avant la fin du bail , il est inclus un nouveau bail si nécessaire pour la même durée à la même demande écrite du locataire.</p><p><br></p><p>	3.3 En cas d'acceptation du bailleur ou de son silence garder jusqu'au moins deux semaines avant l'expiration du bail, le renouvellement est acquis et dans tous les cas pour une durée supplémentaire d'un an.</p><p><br></p><h3><strong>Article 4: PRIX DU LOYER ET DES REDEVANCES D'OCCUPATION</strong></h3><p><br></p><p>	 4.1 Le prix du loyer mensuel hors taxes consenti pour la présente location est de : <strong>{{ PRIX_LOYER }} FCFA</strong></p><p>	</p><p>    4.2 Que le preneur accepte payer ainsi que les accessoires, à chaque échéance ci-après indiquée ;</p><p><br></p><p>	4.3 Le loyer est payable mensuellement ;</p><p><br></p><p>	4.4 Le preneur s'oblige à s'acquitter ses loyers et accessoires par terme et d'avance à Yaoundé, au plus tard le premier jour de chaque mois ;</p><p><br></p><p>	4.5 Les paiements tant du loyer que de accessoires seront effectuées par des versements en espèces entre les mains du bailleur ou de tout autre mandataire détenteur d'une bonne et valable procuration ;</p><p><br></p><p><br></p><h3><strong>Article 5: FRAIS D'ETABLISSEMENT, DEPENSES D'ENREGISTREMENT, TIMBRE DE TAXES DIVERSES, ET FRAIS DE POURSUITES </strong></h3><p><br></p><p>5.1 Tous les frais fixés par les règlements publics relatifs à l'établissement de présentes ( frais d'enregistrement, frais de timbre et pénalités de toutes natures), sont   à la charge du preneur;</p><p><br></p><p>5.2 Les taxes fixées par les administrations publiques, communales sont également à sa charge et dues dans les conditions et aux dates fixées par ces administrations ; il devra justifier de leurs acquis avant de déménager ;</p><p><br></p><p>5.3 En cas de règlement tardif de ces taxes par le preneur, les pénalités administratives et fiscales en résultant sont à la charge du preneur;</p><p><br></p><p>5.4 Les frais droits et honoraires auxquels pourront donner lieu le présent acte et ses suites, y compris les frais de poursuites de  toutes natures, seront supportés par le preneur;</p><p><br></p><h3><strong>Article 6: LA CAUTION OU DEPOT DE GARANTIE</strong></h3><p><br></p><p>6.1 Le montant de la caution ou du dépôt de garantie est de : <strong>{{ MONTANT_CAUTION }} FCFA</strong></p><p><br></p><p>6.2 Le preneur a versé la somme de <strong>{{ AVANCE }} FCFA</strong> correspondant à une avance de <strong>{{ NBRE_MOIS }}</strong> mois de loyer.</p><p><br></p><p>6.3 Le dernier terme du loyer ne sera ni imputable sur le dépôt de garantie ; Celui-ci restera conservé à titre de sûreté de bonne exécution du présent bail;</p><p><br></p><p>6.4 Le preneur ne pourra exiger le remboursement de la caution ou du dépôt de garantie en fin de jouissance, dès complet déménagement,  remise de toutes les clés et des lieux en état initial d'occupation ; </p><p><br></p><h3><strong>Article 7: ENTRETIEN TRAVAUX REPARATIONS-REGLEMENTS D'IMMEUBLE</strong></h3><p><br></p><p>7.1 Le preneur entretiendra les lieux loués en bon état de réparation locative, en jouira en bon père de famille et les restituera en fin de bail en bon état.</p><p><br></p><p>7.2 Le preneur devra notamment refaire les badigeons, peinture de boiserie, des murs, portes, plafonnage, etc... conformément aux dispositions de l'article 1 754 code civil aussi souvent que besoin sera ;</p><p><br></p><p>7.3 Le bailleur ne sera tenu d'exécuter au cours du bail que les grosses réparations qui pourraient, conformément aux disposition de l'article 1 720 du code civil, devenir nécessaires, toute autre réparation quelle qu'elle soit restant à chaque charge du preneur qui en supportera les conséquences.</p><p><br></p><h3><strong>Article 8: CESSION DE BAIL SOUS LOCATION</strong></h3><p><br></p><p>8.1 Le présent bail est signé intuitu personnage, toute cession des droits au présent contrat, toute sous location est interdite ;</p><p><br></p><h3><strong>Article 9: REGLEMENT URBAIN</strong></h3><p><br></p><p>9.1 Le preneur satisfera à toutes les prescriptions de police, de voirie et d'hygiène ;</p><p><br></p><h3><strong>Article 10: ASSURANCES-RESPONSABILITES-RECOURS DIVERS</strong></h3><p><br></p><p>10.1 Le preneur est responsable de toutes dégradations commises, et de tous sinistres directs et indirects qui pourraient être survenus par lui, par les occupants de son chef, ou par des tiers quelconques se trouvant même momentanément sur les lieux loués par lui, ou ayant un rapport quelconque avec&nbsp;lui ;</p><p><br></p><p>10.2 Il sera particulièrement responsable et de plein droit, des dégâts causés en cours d'aménagement, ainsi que ceux résultant des activités des personnes effectuant pour son compte des travaux sur les lieux, ou celle des personnes vivants avec lui ;</p><p><br></p><p>10.3 Il renonce à tous recours en responsabilité contre le bailleur, et pourra exiger de ce dernier aucune indemnité, ni diminution de loyer dans les cas ci-après en cas d'interruption dans le service de l'eau, d'électricité, par suite d'accident ou d’événements indépendants de la volonté du bailleur ;</p><p><br></p><p><br></p><h3><strong>Article 11: VISITES-ACCES DES LIEUX-REMISE DES CLES</strong></h3><p><br></p><p>11.1 Le preneur après avoir été au moins vingt quatre (24) heures à l'avance, devra laissé le bailleur ( en personne ou celle de son représentant préposé ) visité les lieux loués chaque fois qu'il le jurera nécessaire, pour tous travaux, relevés, et inspections utiles;</p><p><br></p><p>11.2 Il devra également laisser pénétré les architectures ou entrepreneurs et leur personnel pour tous travaux rendus nécessaires ;</p><p><br></p><p><br></p><h3><strong>Article 12: ELECTRICITE-EAU-TELEPHONE-IMAGETV-INTERNET</strong></h3><p><br></p><p>12.1 Le preneur paiera directement au concessionnaire le montant des abonnement ou consommation d'eau, d'électricité, de téléphone, d'image TV et Internet ; il fera son affaire personnelle;</p><p><br></p><p>12.2 Consommation en eau:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong> {{ FORFAIT_EAU }} FCFA </strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_eau\">12.2 Consommation en eau:&nbsp;La consommation en eau du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur avec une facturation de <strong> {{ PU_EAU }} le KWh </strong>. A son entrée, l'index relevé est de <strong> {{ INDEX_EAU }}.</strong></p><p>12.3 Consommation en électricité:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong>{{ FORFAIT_ELECTRICITE }} FCFA</strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_electricite\">12.3 Consommation en électricité:&nbsp;La consommation en électricité du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur électrique avec une facturation de<strong> {{ PU_ELECTRICITE }} le KWh </strong> . A son entrée, l'index relevé est de <strong>{{ INDEX_ELECTRICITE }} . </strong></p><p><br></p><p><br></p><h3><strong>Article 13: TOLERENCES</strong></h3><p><br></p><p>13.1 Toutes tolérances de la part du bailleur, quelles qu'en aient pu être la fréquence et la durée au sujet des clause et conditions du présent accord, ne pourront jamais être considérés comme apportant des modifications ou suppressions de ces clauses et conditions, ni comme génératrice d'un droit quelconque ;</p><p><br></p><h3><strong>Article 14: CLAUSE RESOLUTOIRE - PRIVILEGE DU BAILLEUR</strong></h3><p><br></p><p>14.1 Les parties conviennent expressément que le présent bail sera considéré comme résilié de plein droit et le contrat éteint définitivement pour l'avenir, sans aucune formalité, entre elles dans les hypothèses ci-après :</p><p><br></p><p>&nbsp;&nbsp;&nbsp;a-) En cas du décès du preneur ,</p><p><br></p><p>	 b-) En&nbsp;cas de non paiement à son écheance&nbsp;d'un seul terme de loyer, ou d'une quelconque somme due en vertu des présentes et huit jours après sommation de payer restée infructueuse ;</p><p><br></p><p><br></p><p>14.2 Dans tous les cas de résiliation, sans préjudice des autres voies de droit, le mobilier garnissant les lieux loués, pourra au gré du bailleur, être séquestré sur place ou dans un garde meuble, aux frais, risque et périls sur requête signés par Monsieur le Président du Tribunal de Première Instance de Yaoundé EKOUNOU, à charge de lui en référé en cas de difficultés ;</p><p><br></p><p>&nbsp;&nbsp;&nbsp;</p><p>14.3 Le séquestre du mobilier fait conformément à la clause ci-dessus pourra être levé, soit par accords amiable signés entre les parties, soit à la suite d'une procédure judiciaire définitive de liquidation de l'intégralité des droits du bailleur.</p><p><br></p><p><br></p><p>14.4 En cas de résiliation amiable, les parties acceptent organiser dans les accords écrits particuliers les modalités de liquidation des droits de chacune d'elles, celle-ci pouvant prévoir qu'il soit défalqué la caution ou du dépôt de garantie, indépendamment des loyers, arriérés de loyers et accessoires, les frais de remise des locaux en état, et plus généralement toute somme due,</p><p><br></p><p><br></p><p><br></p><h3><strong>Article 15: DELAISSEMENT FORCE DE L'IMMEUBLE OU EXPULSION</strong></h3><p><br></p><p>	15.1 Après extinction du présent bail, ou en cas d'acquisition définitive de la clause résolutoire, le délaissement forcé de l'immeuble sera poursuivi et exécuté suivant la simple procédure de référé engagé devant le Tribunal de Première Instance de Yaoundé Ekounou ;</p><h2><br></h2><h3><strong>Article 16: OCCUPATION DES LIEUX APRES CESSATION OU RESILIATION DU BAIL</strong></h3><p><br></p><p>	16.1 Au cas où après cessation ou résiliation du bail, et pour quelque cause que ce soient, les lieux ne seraient pas restitués en l'état au bailleur, et libre de toute occupation, il lui sera dû une indemnité contractuelle d'occupation ;</p><h2><br></h2><h3><strong>Article 17: ELECTION DE DOMICILE - ATTRIBUTION DE COMPETENCE</strong></h3><p><br></p><p>	17.1 Pour l'exécution des présentes, les parties font élection de domicile à leur adresse respective à Yaoundé</p><p><br></p><p>	17.2 A défaut d'accords écrit particuliers amiables terminant tout litige entre les parties en cours d'exécution du présent bail, le président du Tribunal de Première Instance de Yaoundé Ekounou ou tout juge délégué par lui, siègent en chambre de conseil, ou en matière d'urgence est la juridiction contractuelle unique pour trancher tout différend né entre les parties;</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>",
        
    }),
    watch: {

    },

    beforeMount() {

    },
    async mounted(){
       await this.getLogements();
       this.modelesExistants=JSON.parse(localStorage.getItem("modelescontrats"))

    },
    methods: {
         toggleStatus() {
            setTimeout(() => {
                this.loading = false
                this.checked = !this.checked
            }, 5000)
        },

          /**
            * controle step 1 du formulaire
         */
        validateAsync:function() {
                return new Promise((resolve, reject) => {
                    
                   if(!this.modelContrat.libele){
                        this.check=false
                        this.requiredModelContrat=false;
                    }else{
                       this.check=true;
                        this.requiredModelContrat=true;
                    }
                    if(this.modeCreation && this.modele!=null){
                        this.content=this.modele.contenu
                    }
                setTimeout(() => {
                    resolve(this.check)
                }, 1000)
                })
            },
        validateSecond:function() {
            return new Promise((resolve, reject) => {
                
                /*if(this.selectArcticle.length<2){
                   //this.check2=false
                    return App.error('vous devez sélectionner au moins deux rubriques')
                }else{
                    this.check2=true;
                }*/
                setTimeout(() => {
                    resolve(this.check)
                }, 1000)
                
            })
        },


        /**récupération de la liste des logements */
        async getLogements(){
          if(storage.get('logements')!= null && storage.get('logements').length>0){
            console.log('entrée 1 pas de requète en bd')
            this.logements = storage.get('logements')
            }else{
                console.log('entrée 2 requète en bd')
                this.logements =  await axios.get("logements").then(response => response.result || []);
                storage.set('logements',this.logements)
        }
        this.showOverlay = false;

        },
        /**
            * reinitialiser le form d'ajout d'un modèle e contrat
         */
        resetModal() {
                this.modelContrat = {
                    title: '', libele: '', rubriques: null
                }
                this.logement=null; this.batiment=null;
                setTimeout(() => {
                    this.$emit('closeContratModal');
                }, 500);
                
        },
        
               /**
         * Recupere les modèle de contrats au backend
         */
        getContrats() {
            axios.get('modeles-contrats').then(response => response.result || []).then(contrats => {
                this.contrats = this.trueContrats = contrats
                this.showOverlay = false
            })
        },
        onComplete(){
            this.showOverlay=true;
            let data = {
                libelle: this.modelContrat.libele,
                contenu: this.content
            }
            console.log(data)
              axios.post("modeles-contrats",data).then(response =>{
                this.resetModal()
                this.showOverlay=false;
                this.$emit("newModeleContratAdded");
                return App.notifySuccess(response.message)
            })
            .catch(error => {
                this.showOverlay=false;
                notif.error(error.message);
            });
        },



        articleIsSelected(idArticle) {
            return this.selectArcticle.filter(elt => elt.idArticle == idArticle).length > 0
        },
           showDetails(contrat) {
            this.contrat = contrat
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.contrat = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.contrat = null
                })
            }, 100)          
        },



        setLoading: function(value) {
            this.loadingWizard = value
        },

        romanize (num) {
            if (!+num) {
                return false;
            }
            var	digits = String(+num).split(""),
                key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                    "","I","II","III","IV","V","VI","VII","VIII","IX"],
                roman = "",
                i = 3;
            while (i--) {
                roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            }
            return Array(+digits.join("") + 1).join("M") + roman;
        },

    },
}
</script>
<style scoped>
.is-red{
    border-color:red;
}
    .leloader,
.leloader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.leloader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #e74c3c;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.big-size_text{
    font-size: 2.3em;
    color: #212121ef;
    font-weight: 800;
    font-family: italic;
    text-align: center;
}
</style>
