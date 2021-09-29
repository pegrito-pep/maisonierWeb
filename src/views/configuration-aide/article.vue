<template>
<div class="container-fluid">
<!-- page hearder start -->
    <page-description title="Articles" description="Gestion de vos articles pour vos contrat de baux" icon="newspaper" :path="['Configuration et aide ', 'Mes Articles']" />
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
                            <b-button variant="danger" @click.prevent="() => {modal.action = 'add'; $bvModal.show('modal-cite')}"><i class="fa fa-plus-circle"></i> Nouveau article</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!articles.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun articles trouvée</span>
                        <p>Un article est une disposition d'un texte législatif qui a pour objet d'énoncer une règle de droit ou qui en indique les éléments 
                        ou les modalités d'application8. Un article de loi peut contenir une règle de droit absolue, impérative ou supplétive</p>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(article, i) in items" :key="article.idArticle || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <app-article @makeUpdate="updateArticle" @deleted="removeCite" :article="article" @showDetails="showDetails" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="articles.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
      </div>

          <!-- MODALE POUR AJOUTER/MODIFIER UN article -->
        <b-modal id="modal-cite" size="sm" ok-only ok-title="Valider" @hidden="resetModal" @ok="submitModal">
            <template #modal-title>
                <span v-if="modal.action == 'add'">Ajouter un article</span>
                <span v-if="modal.action == 'edit'">Edition de l'article</span>
            </template>
            <b-form-group label="Titre  de l'article">
                <b-form-input v-model="modal.titreArticle" placeholder="Ex: OBJET-USAGE DES LIEUX" trim></b-form-input>
            </b-form-group>
            <b-form-group label="Numéro">
                <b-form-input type="number" v-model="modal.numArticle" placeholder="Ex: 1" trim></b-form-input>
            </b-form-group>
        </b-modal>


        <!-- MODALE POUR AFFICHER LES DETAILS D'UN Article -->
        <div v-if="article" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Détails de l'article : <b>{{ article.titreArticle }}</b>.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-articles @batimentsChanged="changeBatiments" :article="article" />
                    </div>
                </div>
            </div>
        </div>

</div>
</template>

<script>
import AppArticle from '@/components/_configuration-aide/Article.vue'
import DetailsArticles from '@/components/_configuration-aide/DetailsArticle.vue'

const php  = require ( 'phpjs' ) ; 

export default {
    name: 'Articles',
    components: {
        AppArticle,
        DetailsArticles,
    },
    computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.articles, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        articles: [],
        trueArticles: [],
        showOverlay: true,
        article: null,
        currentPage: 1,
        perPage: 10,
        search: null,
        modal: {
            action: '',
            titreArticle: '', numArticle: '', idArticle: '',rubriques:[]
        },
        submitted: false
    }),
    watch: {
        search(value) {
            if (!php.empty(value)) {
                this.articles = this.trueArticles.filter(elt => elt.titreArticle.toLowerCase().includes(value.toLowerCase()))
            }
            else {
                this.articles = this.trueArticles
            }
        }
    },
    beforeMount() {
        this.getArticles()
    },
    methods: {
        generateArticles() {
            this.submitted = true 
            axios.post('/articles/generate').then(response => {
                if (response.success) {
                    this.getArticles()
                }
                this.submitted = false
            })
        },

        /**
         * Recupere les cites au backend
         */
        getArticles() {
            axios.get('articles').then(response => response.result || []).then(articles => {
                this.articles = this.trueArticles = articles
                this.showOverlay = false
            })
        },

           /**
         * Affiche les details d'une cite
         * 
         * @param {Object} article
         */
        showDetails(article) {
            this.article = article
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.article = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.article = null
                })
            }, 100)          
        },

        /**
         * Raffraichi la liste des batiments de la cité active
         * 
         * @param {Batiment[]} batiments
         */
        changeBatiments(batiments) {
            this.cites = this.cites.map(elt => {
                if (elt.idCite != this.cite.idCite) {
                    return elt
                }
                return {
                    ...elt,
                    batiments
                }
            })
            this.cite.batiments = batiments
        },
        /**
         * Retire une cite
         * 
         * @param {Integer} idCite
         */
        removeCite(idCite) {
            this.articles = this.articles.filter(elt => elt.idArticle != idArticle)
            this.trueArticles = this.trueArticles.filter(elt => elt.idArticle != idArticle)
        },

        resetModal() {
            this.modal = {
                action: '',
                nom: '', ref: '', idCite: '',rubriques:[]
            }
        },
        /**
         * Validation du formulaire d'ajout/modification de la cite
         */
        submitModal(bvModalEvt) {
            console.log(this.modal)
            let dataArticleToSend = {
                titre:this.modal.titreArticle,
                numero:this.modal.numArticle,
                rubriques:this.modal.rubriques
            }
            bvModalEvt.preventDefault()
            if (php.empty(this.modal.titreArticle) || php.empty(this.modal.numArticle)) {
                return App.error('Veuillez remplir tous les champs du formulaire')
            }
            if (this.modal.action == 'add') {
                axios.post('articles', dataArticleToSend).then(response => {
                    if (!response.success) {
                        return App.alertError(response.message)
                    }
                    this.articles = this.addNewArticle(this.articles, response.result)
                    this.trueArticles = this.addNewArticle(this.trueArticles, response.result)
                    this.$bvModal.hide('modal-cite')
                    return App.notifySuccess(response.message)
                })
            }
            if (this.modal.action == 'edit') {
                axios.put(`articles/${this.modal.idArticle}`, this.modal).then(response => {
                    if (!response.success) {
                        return App.alertError(response.message)
                    }
                    this.articles = this.articles.map(elt => {
                        if (elt.idArticle == this.modal.idArticle) {
                            elt.nomCite = this.modal.nom
                            elt.refCite = this.modal.ref
                        }
                        return elt
                    })
                    this.trueArticles = this.trueArticles.map(elt => {
                        if (elt.idCite == this.modal.idCite) {
                            elt.nomCite = this.modal.nom
                            elt.refCite = this.modal.ref
                        }
                        return elt
                    })
                    this.$bvModal.hide('modal-cite')
                    return App.notifySuccess(response.message)
                })
            }
        },
        updateArticle(article) {
            this.modal = {
                action: 'edit',
                titreArticle: article.titreArticle, numArticle: article.numArticle, idCite: article.idArticle
            }
            this.$bvModal.show('modal-cite')
        },

        addNewArticle(articles, article) {
            let exist = false
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].idCite == article.idArticle) {
                    exist = true 
                    break
                }
            }
            if (!exist) {
                articles.push(article)
            }
            return articles
        }
    }
}
</script>