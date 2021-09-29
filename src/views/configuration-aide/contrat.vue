<template>
<div class="container-fluid">
<!-- page hearder start -->
    <page-description title="Modèle de contrats" description="Gestion de  vos modèles contrat de baux " icon="file-signature" :path="['Configuration et aide ', 'Mes Modèles de Contrats']" />
      <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <form action="" onSubmit="return false">
                                    <input type="text" class="form-control" placeholder="Recherche..." v-model="search">
                                    <button type="submit" class="btn btn-icon"><i class="ik ik-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="float-md-right">
                            <b-button variant="danger" @click.prevent="() => {modal.action = 'add'; $bvModal.show('contrat-modal'),getArticle()}"><i class="fa fa-plus-circle"></i> Nouveau Modèle</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!contrats.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun modèle de contrat trouvée</span>
                        <p>Le contrat est définit usuellement comme un accord entre deux ou plusieurs volontés en vue de faire naître des effets de droit</p>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(contrat, i) in items" :key="contrat.idContrat || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <app-contrat @makeUpdate="updateArticle"  :contrat="contrat" @showDetails="showDetails" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="contrats.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
      </div>
      <b-modal :header-bg-variant="headerBgVariant" hide-footer  :header-text-variant="headerTextVariant" id="contrat-modal" size="xl" title="Extra Large Modal">
       <template #modal-title>
                <span v-if="modal.action == 'add'">Ajouter un Modèle contrat</span>
                <span v-if="modal.action == 'edit'">Edition d'un modèle de contrat</span>
        </template>
        <form-wizard @on-complete="onComplete">
            <tab-content title="Details Contrat">
                    <div class="row">
                        <div class="col-sm-6">
                                <div class="input-group input-group-warning">
                                <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-file"></i></label></span>
                                    <input type="text" v-model="modelContrat.title" class="form-control" placeholder="titre du contrat">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="input-group input-group-success">
                                    <span class="input-group-prepend"><label class="input-group-text"><i class="ik ik-shield"></i></label></span>
                                        <input type="text" v-model="modelContrat.libele" class="form-control" placeholder="Libelle du contrat">
                                </div>
                            </div>
                            </div>
            </tab-content>
            <tab-content title="Choisir les rubriques" icon="fas fa-user">
                <div class="accordion" role="tablist">
                    <b-card no-body class="mb-1" v-for="items in articles" :key="items.idArticle">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-1 variant="info">{{items.titreArticle}}</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                        <b-card-text>
                            <div class="row layout-wrap" id="layout-wrap">
                                            <div class="col-12 list-item" v-for="rubriques in items.Rubriques" :key="rubriques.idRubrique">
                                                <div class="card d-flex flex-row mb-3">
                                                    <a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                                        <!-- <img src="../img/portfolio-1.jpg" alt="Donec sit amet est at sem iaculis aliquam." class="list-thumbnail responsive border-0"> -->
                                                        <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                                                        <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">Trending</span>
                                                    </a>
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
                                                            <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem"><i class="ik ik-eye"></i></a>
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
            <tab-content title="Last step">
                <div class="card">
                                <div class="card-header text-center"><h2 class="d-block w-100">{{modelContrat.title}}</h2></div>
                                <div class="card-body">
                                    <div class="row invoice-info">
                                        <div class="col-sm-12 invoice-col">
                                            Entre
                                            <address>
                                                <strong>ThemeKit,</strong><br>795 Folsom Ave, Suite 546 <br>San Francisco, CA 54656 <br>Phone: (123) 123-4567<br>Email: info@themekit.com
                                            </address>
                                        </div>
                                        <div class="col-sm-12 invoice-col">
                                            Et
                                            <address>
                                                <strong>John Doe</strong><br>795 Folsom Ave, Suite 600<br>San Francisco, CA 94107<br>Phone: (555) 123-7654<br>Email: john.doe@example.com
                                            </address>
                                        </div>
                                        <div class="col-sm-12 invoice-col">
                                            <h3>Il a été convenu ce qui suit:</h3><br>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12" v-for=" items in selectArcticle" :key="items.title" >
                                            <h5> {{items.title}} </h5>
                                            <p v-for="item in items.rubriques" :key="item.idRubrique"> {{item.descRubrique}} </p>
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
        </form-wizard>
      </b-modal>
</div>
</template>

<script>
// Je renome le composant Cite en AppCite parcequ'il existe une balise <cite>. Du coup le composant n'allait pas etre prise en compte
import AppContrat from '@/components/_configuration-aide/Contrat.vue'

const php  = require ( 'phpjs' ) ; 

export default {
    name: 'Contrats',
    components: {
        AppContrat,
    },
    computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.contrats, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        contrats: [],
        trueContrats: [],
        articles:[],
        selectArcticle:[],
        modelContrat:{
          title:'',
          libele:'',
          rubriques:[]
        },
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        showOverlay: true,
        contrat: null,
        currentPage: 1,
        itemTextShow:'',
        text:'lqdmfdqf',
        ListItem:[],
        perPage: 10,
        search: null,
          modal: {
            action: '',
            nom: '', ref: '', idCite: ''
        }
    }),
    watch: {
        search(value) {
            if (!php.empty(value)) {
                this.contrats = this.trueContrats.filter(elt => elt.nomCite.toLowerCase().includes(value.toLowerCase()))
            }
            else {
                this.contrats = this.trueContrats
            }
        }
    },
    // created(){
    //     this.getArticle()
    // },
    beforeMount() {
        this.getContrats()
    },
    methods: {
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
            let data = {
                libelle: this.modelContrat.libele,
                titre: this.modelContrat.title,
                rubriques: []
            }
            this.selectArcticle.forEach(elt => {
                data.rubriques = php.array_merge(data.rubriques, elt.rubriques.map(e => e.idRubrique))
            })
            console.log(data)
            axios.post("modeles-contrats",data).then(response => {
                if(response.success){
                    this.getContrats()
                }
            }).catch(error => {
                console.log(error.response)
            })
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


        async getArticle(){
          console.log('erreur')
         await axios.get('articles').then(response => response.result || []).then(articles =>{ 
            this.articles = articles
            console.log(articles)
          })
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

    },
}
</script>
<style>


@media screen and (max-width: 400px) {
   #ListItemsContrat { 
    float: none;
    margin-right:0;
    width:auto;
    border:0;
    border-bottom:2px solid #000;    
  }
}
</style>>

</style>