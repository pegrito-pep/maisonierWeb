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
                        <!--<div class="float-md-right">
                            <b-button variant="danger" @click.prevent="() => {modal.action = 'add'; $bvModal.show('contrat-modal'),getArticle()}"><i class="fa fa-plus-circle"></i> Nouveau Modèle</b-button>
                        </div>-->
                        <div class="float-md-right">
                            <b-button variant="danger" @click.prevent="callContratForm" v-b-modal.modal-contrat-form>
                                <i class="fa fa-plus-circle"></i> Ajouter un modèle de contrat
                            </b-button>
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
                            <contrat @makeUpdate="updateArticle"  :contrat="contrat" @showDetails="showDetails" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="contrats.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
      </div>
      <b-modal id="modal-contrat-form" size="xl" :header-bg-variant="headerBgVariant" ref="contrat-modal"  :header-text-variant="headerTextVariant" title="Ajouter un Modèle de contrat" ok-title="Fermer"  ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
            <div>
                <contrat-form @newModeleContratAdded="addedContrat"/>
            </div>
     </b-modal>
</div>
</template>

<script>

// Je renome le composant Cite en AppCite parcequ'il existe une balise <cite>. Du coup le composant n'allait pas etre prise en compte
import Contrat from '@/components/_configuration-aide/Contrat.vue';

import ContratForm from "@/views/configuration-aide/contratForm.vue";


const php  = require ( 'phpjs' ) ; 

export default {
    name: 'Contrats',
    components: {
        Contrat,
        ContratForm
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


        showOverlay: true,
        contrat: null,
        currentPage: 1,
        itemTextShow:'',
        text:'lqdmfdqf',
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        ListItem:[],
        perPage: 10,
        search: null,
          modal: {
            action: '',
            nom: '', ref: '', idCite: ''
        },
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
    async beforeMount() {
        await this.getContrats()
        await this.getData()
    },
    mounted(){
       
    },
    methods: {
            //recupération du dernier modèle de contrat ajouté
            addedContrat(){
                this.getContrats();
                this.$bvModal.hide('modal-contrat-form')
            },
            //methode de récupération des logements et des batiments
        async getData(){
            let batiments=[]; let logements=[];
            try {
                batiments=await axios.get("batiments").then(response =>response.result);
                storage.set('batiments', batiments)
            } catch (error) {
                console.log(error)
            }
            try {
                logements=await axios.get("logements").then(response => response.result);
                storage.set('logements', logements)
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * appel du formulaire d'ajout/edit d'un modèle de contrat
         */
        callContratForm(){
            this.commandeContrat = true;
        },
        /**
            * reception de l'évènement émis de fermeture du modal d'ajout d'un logement
            * ceci permet de re-initialiser le composant(formwizard) d'ajout d'un logement de manière appropriée
        */
        onCloseSet() {
            this.commandeContrat = false;
        },
               /**
         * Recupere les modèle de contrats au backend
         */
        async getContrats() {
           try {
                this.contrats=await axios.get("modeles-contrats").then(response =>response.result);
            } catch (error) {
                console.log(error)
            }
            this.showOverlay=false;
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