<template>
    <div>
        <b-col md="12">
            <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                        <div class="float-md-right"> 
                            <btnAdd  message="créer un Modèle de Contrat" v-b-modal.contratForm ref="buttonAdd"/>
                        </div>
                    </div>
            </div>
            <div class="ContratcontainerMessage" v-if="definition">
                <span class="bonjour ">
                    Un contrat de bail ou un contrat de location est le contrat par lequel l'une des parties (appelée bailleur) s'engage, moyennant un prix (le loyer) que 
                    l'autre partie (appelée preneur) s'oblige à payer, à procurer à celle-ci, pendant un certain temps, la jouissance d'une chose mobilière ou immobilière.
                </span>
            </div>
        </b-col>
          <b-alert variant="info" class="text-center" show v-if="!modelesContrats.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun résultat trouvé</span>
                    </b-alert>  
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(contrat, i) in modelesContrats" :key="contrat.id || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <!-- <app-article @makeUpdate="updateArticle" @deleted="removeArticle" :article="article" @showDetails="showDetails" /> -->
                            <app-contrat :contrat="contrat"  @showDetails="showDetails" />
                        </b-col>
                    </b-row>

         <!--MODAL POUR AFFICHER LE CONTRAT DE BAIL-->
        <div
            v-if="contrat"
            class="modal fade edit-layout-modal"
            id="editLayoutItem"
            tabindex="-1"
            role="dialog"
            aria-labelledby="editLayoutItemLabel"
            aria-hidden="true"
            >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">
                        <b>{{ contrat.libelleModele }}</b>.
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body pt-2">
                        <detail-contrat :contrat="contrat" />
                    </div>
                </div>
            </div>
        </div>

        <!--MODAL POUR AJOUTER OU MODIFIER UN MODELE DE CONTRAT-->
        <b-modal id="contratForm" ref="contrat-form" size="xl" ok-title="Fermer" ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
            <template #modal-title>
                <span class="ml-4 text-form-contrat">{{ title }}</span>
            </template>
            <div>
                <contrat-form @newModeleContratAdded="addedContrat"/>
            </div>
        </b-modal>
    </div>
</template>
<script>
     import AppContrat from '@/components/_configuration-aide/Contrat.vue'
    import DetailContrat from '@/views/configuration-aide/Contrats/Detail_contrat.vue'
    import contratForm from './ContratForm.vue'
    const php  = require ( 'phpjs' ); 
    import SearchForm from "@/components/parts/SearchForm.vue";


    export default {
        name: "contrats",
        components: {
            SearchForm,
            DetailContrat,
            contratForm,
            AppContrat
        },
        data:()=>({
            templateContrat: [],
            definition:false,
            showOverlay:true,
            modelesContrats:[],
            truemodelesContrats:[],
            contrats:[],
            contrat:null,
            editTemplate:false,
            title:'créer un Modèle contrat',
            search:null

        }),
     
        watch: {
            search(value) {
                this.modelesContrats = !php.empty(value) ? this.truemodelesContrats.filter(elt =>
                        elt.libelleModele.toLowerCase().includes(value.toLowerCase())
            )
            : this.truemodelesContrats;
            }
        },
        computed: {
            /**
             * Elements affichés avec prise en charge de la pagination
             */
            items() { 
                return php.array_slice(this.modelesContrats, this.offset, this.perPage) 
            },
            offset() {
                return (this.currentPage * this.perPage) - this.perPage
            }
        },
        methods:{
            /**
             * Affiche les details d'un element
            * 
            * @param {Object} contrat
            */
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

            //recuperation de la liste des modèles de contrat existants
             //recupération de la liste des logements
            async getModelesContrats() {
                this.modelesContrats = this.truemodelesContrats = await axios.get("modeles-contrats").then(response => response.result || []);
                    this.showOverlay = false
            },
            //nouveau modèle de contrat ajouté
            addedContrat(){
                this.getModelesContrats()
                this.$bvModal.hide('contratForm');
            }


        },
        mounted(){
           // this.contrats = this.trueContrats = JSON.parse(localStorage.getItem("contrats"))
            this.getModelesContrats();
            this.showOverlay = false
        },
        async beforeMount(){
            await this.getModelesContrats();
        }

    }
</script>
<style scoped>
.ContratcontainerMessage{
    height: 180px;
    background:#0FC286;
    border-left: 15px solid #0C6D4D;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items:center;
    font-weight: bold;
    color: #F0F0F0;
    font-size: 20px;
    opacity: 0;
    transition:  ease-in-out 1.5s;
}
.activeDefinition{
    opacity: 1;
}
.contratLocationBailContainer{
    height: 260px;
    width: 180px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding-top: 10px;
    border-radius: 8px;
    cursor: pointer;
}
.cardImageBailContainer{
    height: 200px;
    width: 100%;
}
.cardImageBailContainer img{
    width: 100%;
    height: 100%;
}
.footerBailContainer{
    background: #191c22;
    height: 50px;
    width: 100%;
    border-left: #f5365c solid;
    border-right: #f5365c solid;
    color: #fff;
    text-align: center;
    font-size: 12px;
    padding: 5px;
}
/*mon style */
.text-form-contrat{
    font-size: 1.3em;
    color: #212121ef;
    font-weight: 800;
    text-align: center;
    margin-top: 2px;
}
</style>