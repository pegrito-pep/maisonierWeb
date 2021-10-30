<template>
    <div>
        <b-col md="12">
            <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                        <div class="float-md-right"> 
                            <btnAdd  message="créer un contrat" v-b-modal.contratForm ref="buttonAdd"/>
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
          <b-alert variant="info" class="text-center" show v-if="!contrats.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun résultat trouvé</span>
                    </b-alert>  
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(contrat, i) in items" :key="contrat.id || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <!-- <app-article @makeUpdate="updateArticle" @deleted="removeArticle" :article="article" @showDetails="showDetails" /> -->
                            <app-contrat :contrat="contrat"  @showDetails="showDetails" />
                        </b-col>
                    </b-row>

         <!-- MODALE POUR AFFICHER LES DETAILS D'UN ARTICLE -->
        <div v-if="contrat" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Visuel contrat : <b> {{contrat.typeContrat}} </b>.</h5>
                        <b-button variant="danger" @click="editTemplate = !editTemplate"><i class="fa fa-plus-circle"></i> Editer</b-button>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <div v-if="editTemplate">
                            <button @click="execCmd('bold')"><i class="fa fa-bold"></i></button>
                            <button @click="execCmd('italic')"><i class="fa fa-italic"></i></button>
                            <button @click="execCmd('underline')"><i class="fa fa-underline"></i></button>
                            <button @click="execCmd('strikethrough')"><i class="fa fa-strikethrough"></i></button>
                            <button @click="execCmd('justifyLeft')"><i class="fa fa-align-left"></i></button>
                            <button @click="execCmd('justifyCenter')"><i class="fa fa-align-center"></i></button>
                            <button @click="execCmd('justifyRight')"><i class="fa fa-align-right"></i></button>
                            <button @click="execCmd('justifySlash')"><i class="fa fa-align-slash"></i></button>
                            <button @click="execCmd('justifyFull')"><i class="fa fa-align-justify"></i></button>
                            <button @click="execCmd('cut')"><i class="fa fa-cut"></i></button>
                            <button @click="execCmd('copy')"><i class="fa fa-copy"></i></button>
                            <button @click="execCmd('indent')"><i class="fa fa-indent"></i></button>
                            <button @click="execCmd('outdent')"><i class="fa fa-dedent"></i></button>
                            <button @click="execCmd('subscript')"><i class="fa fa-subscript"></i></button>
                            <button @click="execCmd('superscript')"><i class="fa fa-superscript"></i></button>
                            <button @click="execCmd('undo')"><i class="fa fa-undo"></i></button>
                            <button @click="execCmd('redo')"><i class="fa fa-redo"></i></button>
                            <button @click="execCmd('repeat')"><i class="fa fa-repeat"></i></button>
                            <button @click="execCmd('insertUnorderedList')"><i class="fa fa-list-ul"></i></button>
                            <button @click="execCmd('insertOrderedList')"><i class="fa fa-list-ol"></i></button>
                            <button @click="execCmd('insertParagraph')"><i class="fa fa-paragraph"></i></button>
                            <select @click="execCommandWithArg('formatBlock',this.value)">
                            <option value="H1">H1</option>
                            <option value="H2">H2</option>
                            <option value="H3">H3</option>
                            <option value="H4">H4</option>
                            <option value="H5">H5</option>
                            <option value="H6">H6</option>
                            </select>
                            <button @click="execCmd('insertHorizontalRule')">HR</button>
                            <br>
                            <br>
                            <button @click="toggleSource()"><i class="fa fa-code"></i></button>
                            <button @click="toggleEdit()">Enable Edit </button>
                            <select @click="execCommandWithArg('formatName',this.value)">
                            <option value="Arial">Arial</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                            <option value="Courier">Courier</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Times New Roman">Times New Roman</option>
                            </select>
                            <select @click="execCommandWithArg('formatSize',this.value)">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            </select>
                            Color : <input type="color" onchange="execCommandWithArg('foreColor',this.value)">
                            background: <input type="color" @click="execCommandWithArg('hiliteColor',this.value)">
                            <button @click="execCmd('selectAll')">Select All </button>

                        </div>
                        <iframe name="richTextField" style="width: 21cm;height: 29.7cm;" ></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!--MODAL POUR AJOUTER OU MODIFIER UN LOGEMENT-->
        <b-modal id="contratForm" ref="contrat-form" size="xl" ok-title="Fermer" ok-only ok-variant="secondary" no-close-on-backdrop hide-header-close>
            <template #modal-title>
                <span class="ml-4 text-form-contrat">{{ title }}</span>
            </template>
            <div>
                <contrat-form @contratAdded="addedContrat"/>
            </div>
        </b-modal>
    </div>
</template>
<script>

    import AppContrat from '@/components/_configuration-aide/Contrat.vue'
    import contratForm from './ContratForm.vue'
    const php  = require ( 'phpjs' ) ; 
    import SearchForm from "@/components/parts/SearchForm.vue";

    export default {
        name: "contrats",
        components: {
            SearchForm,
            AppContrat,
            contratForm
        },
        data:()=>({
            templateContrat: [],
            definition:false,
            showOverlay:true,
             contrats:[],
            trueContrats:[],
            contrat:null,
            editTemplate:false,

            title:'créer un contrat'

        }),
        created(){
            this.definition = true
            setTimeout(() => {
                let define = document.querySelector(".ContratcontainerMessage")
                define.classList.add("activeDefinition")
                console.log(define)
                var tabelaContent = document.querySelector(".ContratcontainerMessage").innerHTML;
                console.log(tabelaContent)
                
            }, 500);

            setTimeout(() => {
                let define = document.querySelector(".ContratcontainerMessage")
                define.classList.remove("activeDefinition")
                this.definition = false
            }, 3500);
            
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
                    this.enableEditMode()
                }, 100)          
            },
            enableEditMode(){
                richTextField.document.designMode = 'On'
            },
             execCmd(element){
                richTextField.document.execCommand(element,false, null)
            },

            //ajout d'un contrat
            addedContrat(){
                console.log('entrée ok')
            }
        },
        mounted(){
            this.contrats = this.trueContrats = JSON.parse(localStorage.getItem("contrats"))
            this.showOverlay = false
        }
    }
</script>
<style>
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