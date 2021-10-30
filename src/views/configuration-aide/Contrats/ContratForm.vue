<template>
        <b-overlay :show="showOverlay" rounded="sm">
            <form-wizard   title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                            @on-loading="setLoading"
                            shape="circle"
                            color="#e74c3c" >
                <tab-content title="Mode de création" icon="fas fa-tasks"
                    :before-change="validateAsync">
                    <b-row>
                        <div class="col-sm-6">
                            <div class="input-group input-group-success">
                                <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-shield"></i></label></span>
                                    <input type="text" v-model="modelContrat.libele" class="form-control" placeholder="Libelle du contrat">
                                    <span v-if="!requiredModelContrat" style="color:red;">Le libellé est obligatoire</span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="input-group input-group-warning">
                                <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-file"></i></label></span>
                                    <input type="text" v-model="modelContrat.title" class="form-control" placeholder="titre du contrat">
                            </div>
                        </div>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col>
                                      <b-form-checkbox v-model="modeCreation" :disabled="modelesExistants.length==0" switch size="lg">
                                            <span class="fa-lg" v-if="!modeCreation">Partir sur un modèle vide ?</span>
                                            <span class="fa-lg" v-else>Utiliser un modèle existant</span>
                                      </b-form-checkbox>
                                </b-col>
                                <b-col>
                                    <transition enter-active-class="animated zoomIn">
                                        <b-form-group label="Modèle de base" v-if="modeCreation">
                                            <v-select  :options="modelesExistants" v-model="modele"  label="titre">
                                                <template #option="{ titre, idModele}">
                                                    {{ titre }}
                                                    <br />
                                                    <span class="text-muted">Id: {{ idModele }}</span>
                                                </template>
                                            </v-select>
                                        </b-form-group>
                                    </transition>
                                </b-col>
                            </b-row> 
                        </b-col>
                    </b-row>
                </tab-content>
                <tab-content title="écriture proprement dite" icon="ik ik-edit-1" :before-change="validateSecond">
                    <div>
                        <vue-editor v-model="content"></vue-editor>
                    </div>
                </tab-content>
                <tab-content title="Logement(s) Concerné (s)" icon="fas fa-home" >
                    <div class="card">
                        <b-row  class="layout-wrap">
                            <div v-for="(logement, i) in logements" :key="logement.idLogement || i" class="col-6 list-item list-item-thumb animated flipInX mb-2">
                                <select-logement :logement="logement"/>
                            </div>
                        </b-row>
                    </div>
                </tab-content>
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard>
        </b-overlay>
</template>
<script>
const php  = require ( 'phpjs' ) ; 
 import SelectLogement from './SelectLogement.vue'
import notif from "@/plugins/notif.js";
import { VueEditor } from "vue2-editor";
export default {
    name: 'contratForm',
    components: {
        VueEditor,
        SelectLogement
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
        content:"<h1>Test de contenu</h1>",
        
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
                titre: this.modelContrat.title,
                rubriques: [],
                idBatiment:'', 
                idLogement:''
            }
            this.selectArcticle.forEach(elt => {
                data.rubriques = php.array_merge(data.rubriques, elt.rubriques.map(e => e.idRubrique))
            })
            if(this.batiment != null){
                data.idBatiment = this.batiment.idBatiment
            }
             if(this.logement != null){
                data.idLogement = this.logement.idLogement
            }
            console.log(data)
            /*axios.post("modeles-contrats",data).then(response => {
                if(response.success){
                    this.$root.$emit("new-modele-contrat-added");
                   // this.getContrats()
                }
            }).catch(error => {
                console.log(error.response)
            })*/
    
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
            /*setTimeout(() => {
                this.$refs['contrat-modal'].hide()
                this.showOverlay=false;
            }, 1000);*/
        },





        Rubrique(item){
            console.log(item)
            let selectionner = this.articles.filter(y => y.idArticle === item.idArticle)[0]
            if (!this.articleIsSelected(selectionner.idArticle)) {
                this.selectArcticle.push({
                    idArticle: selectionner.idArticle,
                    title: selectionner.titreArticle,
                    rubriques: [item]
                })
            }
            else {
                this.selectArcticle = this.selectArcticle.map(elt => {
                    if (elt.idArticle == selectionner.idArticle) {
                        elt.rubriques.push(item)
                    }
                    return elt;
                })
            }

            console.log(this.selectArcticle)
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
</style>
