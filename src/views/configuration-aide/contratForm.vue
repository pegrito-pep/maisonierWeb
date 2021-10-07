<template>
    <b-modal id="modal-xl" size="xl" :header-bg-variant="headerBgVariant" ref="contrat-modal"  :header-text-variant="headerTextVariant" title="Ajouter un Modèle de contrat"   :ok-disabled="true" no-close-on-backdrop hide-header-close>
       <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <template #modal-title>
                    <span v-if="action == 'add'">Ajouter un Modèle contrat</span>
                    <span v-if="action == 'edit'">Edition d'un modèle de contrat</span>
            </template>
            <form-wizard   title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                            @on-loading="setLoading"
                            shape="circle"
                            color="#e74c3c" >
                <tab-content title="Details du Contrat" icon="fas fa-info-circle"
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
                                    <div class="mt-4">
                                    
                                        <span class="fa-lg">Spécifier un batiment ?</span>
                                        <b-form-checkbox v-model="showSelectBatiment" switch>
                                        </b-form-checkbox>
                                    </div>
                                    
                                </b-col>
                                <b-col>
                                    <transition enter-active-class="animated zoomIn">
                                            <div class="form-group mt-2" v-if="showSelectBatiment">
                                                <label>Batiment associé</label>
                                                <v-select label="nomBatiment" :options="batiments" v-model="batiment"></v-select>
                                            </div>
                                    </transition>
                                </b-col>
                            </b-row> 
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col>
                                    <!--<span class="ml-2 mr-4" style="font-size: 1.5em;">Spécifier un logement ?</span>
                                    <toggle-button v-model="showSelectLogement"/> -->
                                    <div class="mt-4">
                                        <span class="fa-lg">Spécifier un logement ?</span>
                                        <b-form-checkbox v-model="showSelectLogement" switch>
                                            
                                        </b-form-checkbox>
                                    </div>
    
                                </b-col>
                                <b-col>
                                    <transition enter-active-class="animated zoomIn">
                                        <div class="form-group mt-2" v-if="showSelectLogement">
                                            <label>logement concerné</label>
                                            <v-select label="refLogement" :options="logements" v-model="logement"></v-select>
                                        </div>
                                    </transition>   
                                </b-col>
                            </b-row> 
                        </b-col>
                    </b-row>
                </tab-content>
                <tab-content title="Choisir les rubriques" icon="fas fa-file-contract" :before-change="validateSecond">
                    <div class="accordion" role="tablist">
                        <b-card no-body class="mb-1" v-for="items in articles" :key="items.idArticle">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.accordion-1 variant="info">{{items.titreArticle}}</b-button>
                            </b-card-header>
                            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                <b-card-text>
                                    <div class="row layout-wrap" id="layout-wrap">
                                        <div class="col-12 list-item" v-for="rubriques in items.rubriques" :key="rubriques.idRubrique">
                                            <div class="card d-flex flex-row mb-3">
                                                <div class="d-flex flex-grow-1 min-width-zero card-content">
                                                    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                                        <a class="list-item-heading mb-1 truncate w-180 w-xs-100" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                                            {{rubriques.descRubrique}}
                                                        </a>
                                                        <div class="w-15 w-xs-100">
                                                            <span v-if="rubriques.value == true" class="badge badge-pill badge-secondary">On Hold</span>
                                                        </div>
                                                    </div>
                                                    <div class="list-actions">
                                                        <a v-if="rubriques.value == true" href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a>
                                                    </div>
                                                    <div class="custom-control custom-checkbox pl-1 align-self-center">
                                                        <label class="custom-control custom-checkbox mb-0">
                                                            <input type="checkbox" @change="Rubrique(rubriques)"  class="custom-control-input">
                                                            <span class="custom-control-label"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                </b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </tab-content>
                <tab-content title="Last step" icon="fa fa-list-alt" >
                    <div class="card">
                        <div class="card-header text-center">
                            <!--<h2 class="d-block w-100">{{modelContrat.title}}</h2>-->
                            <h3>Pré-visualisation des données entrées :</h3>
                        </div>
                        <div class="card-body">
                            <div class="row invoice-info">
                                <div class="col-sm-12 invoice-col">
                                    <strong>Titre :</strong><span>{{ modelContrat.title }}</span>
                                </div>
                                <div class="col-sm-12 invoice-col">
                                    <strong>Libellé :</strong><span>{{ modelContrat.libele }} </span>
                                </div>
                                <div class="col-sm-12 invoice-col">
                                    <h3>Rubriques :</h3><br>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" v-for="( items, i) in selectArcticle" :key="items.title" >
                                    <h5> {{ romanize(i + 1) }}. {{items.title}} </h5>
                                    <div class="px-2">
                                        <p v-for="(item, j) in items.rubriques" :key="item.idRubrique">
                                            {{ (i+1) }}.{{ (j+1) }}. {{item.descRubrique}} 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row no-print">
                                <div class="col-12">
                                    <button type="button" class="btn btn-primary pull-right" style="margin-right: 5px;"><i class="fa fa-download"></i> Generate PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-content>
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard>
        </b-overlay>
    </div>
    <template #modal-footer>
            <b-button size="sm" @click="resetModal">
                Fermer
            </b-button>
    </template>
    </b-modal>
</template>
<script>
const php  = require ( 'phpjs' ) ; 
export default {
    name: 'contratForm',
    components: {

    },
    computed: {
  
    },
    data: () => ({
        loadingWizard: false,
        showOverlay:true,
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        action:'add',
        modelContrat:{
          title:'',
          libele:'',
          rubriques:[]
        },
        articles:[],
        selectArcticle:[],
        logements:[],
        batiments:[],
        showSelectBatiment:false,
        showSelectLogement:false,
        batiment:null,
        logement:null,
        requiredModelContrat:true,
        check:true,
        check2:true,
        requiredRubriques:true
    }),
    watch: {

    },

    beforeMount() {

    },
    async mounted(){
       await this.getArticles();
       this.batiments=storage.get('batiments')
       this.logements=storage.get('logements')
    },
    methods: {
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
                setTimeout(() => {
                    resolve(this.check)
                }, 1000)
                })
            },
        validateSecond:function() {
            return new Promise((resolve, reject) => {
                
                if(this.selectArcticle.length<2){
                   //this.check2=false
                    return App.error('vous devez sélectionner au moins deux rubriques')
                }else{
                    this.check2=true;
                }
                setTimeout(() => {
                    resolve(this.check)
                }, 1000)
                
            })
        },
            
        async getArticles(){
             console.log('entrée recuperation de la liste des articles')
             try {
                this.articles = await axios.get("articles").then(response => response.result);
             } catch (error) {
                console.log(error)
             }
            this.showOverlay=false;
        },
        /**
            * Recupere les modèle de contrats au backend
         */
        resetModal() {
                this.modelContrat = {
                    title: '', libele: '', rubriques: null
                }
                this.$refs['contrat-modal'].hide();
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
            console.log("batiment", this.batiment," logement :", this.logement)
            this.showOverlay=true;
            let data = {
                libelle: this.modelContrat.libele,
                titre: this.modelContrat.title,
                rubriques: [],
                idBatiment:this.batiment.idBatiment, 
                idLogement:this.logement.idLogement
            }
            this.selectArcticle.forEach(elt => {
                data.rubriques = php.array_merge(data.rubriques, elt.rubriques.map(e => e.idRubrique))
            })
            console.log(data)
            axios.post("modeles-contrats",data).then(response => {
                if(response.success){
                    this.$root.$emit("new-modele-contrat-added");
                   // this.getContrats()
                }
            }).catch(error => {
                console.log(error.response)
            })
            setTimeout(() => {
                this.$refs['contrat-modal'].hide()
                this.showOverlay=false;
            }, 1000);
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

       /**
        * this function is for set up the different item on the for step 
       */
      setItems(n){
        this.ListItem =document.querySelectorAll(".items")
        console.log(this.ListItem)
        for (let index = 0; index < this.ListItem.length; index++) {
          this.ListItem[index].classList.remove("active")
        }
        this.ListItem[n].classList.add("active")

      },
       defaultBtnActive(){
         const defaultBtn = document.querySelector("#default-btn");
        defaultBtn.click();
    },

      updateArticle(article) {
            this.modal = {
                action: 'edit',
                titreArticle: article.titreArticle, numArticle: article.numArticle, idCite: article.idArticle
            }
            this.$bvModal.show('modal-cite')
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
