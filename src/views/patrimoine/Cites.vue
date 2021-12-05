<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                        <div class="float-md-right d-flex">
                             <paginatorTop :offset="offset" :total="cites.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" :libelle="$t('data.cites')" class="mr-2 d-flex justify-content-center align-items-center" />    
                            <!--<btnAdd  :message="$t('data.cite_ajouter_cite')" @click="() => {modal.action = 'add'; $bvModal.show('modal-cite')}"/>-->
                            <btnAdd  :message="$t('data.cite_ajouter_cite')" @click="createCiteCall"/>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!cites.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">{{ $t('data.cite_pas_de_cite_enregistrer') }}</span>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(cite, i) in items" :key="cite.idCite || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <app-cite @makeUpdate="updateCite" @deleted="removeCite" :cite="cite" @showDetails="showDetails" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="cites.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>

        <!-- MODALE POUR AFFICHER LES DETAILS D'UNE CITE -->
        <div v-if="cite" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">{{ $t('data.cite_detail_cite')}} : <b>{{ cite.nomCite }}</b>.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-cite @batimentAdded="changeBatiments" :cite="cite" :source="source"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALE POUR AJOUTER/MODIFIER UNE CITE -->
        <b-modal id="modal-cite" size="sm" @hidden="resetModal" @ok="submitModal" ref="modalCite">
            <template #modal-title>
                <span v-if="modal.action == 'add'">{{ $t('data.cite_ajouter_cite')}}</span>
                <span v-if="modal.action == 'edit'">{{ $t('data.cite_editer_cite')}}</span>
            </template>
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="modal.submitted">{{ $t('data.cite_valider_cite')}} <b-spinner v-if="modal.submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.cite_nom_cite')">
                <b-form-input v-model="modal.nom" :placeholder="$t('data.cite_exemple_cite')" trim></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('data.cite_reference_cite')">
                <b-form-input v-model="modal.ref" :placeholder="$t('data.cite_exemple_reference_cite')" trim></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('data.cite_label_photo')">
                <img-inputer v-model="modal.photo" :img-src="$getBase64(modal.photo, false)" :placeholder="$t('data.cite_ajouter_photo_de_la_cite')" theme="light" size="xl" :bottom-text="$t('data.cite_bottom_text')" icon="img"  />
            </b-form-group>
        </b-modal>

        <!-- MODAL DE FORBIDDEN -->
       <!-- <b-modal id="modal-cite-forbidden" size="sm" @hidden="resetModal" @ok="submitModal" ref="modalCite" hide-footer>
            <template #modal-title>
                <span v-if="modal.action == 'add'">ACCES NON AUTORISEE</span>
                <div class="text-center">
                    <i class="fas fa-ban fa-3x"></i> <br>
                    <span class="h4 d-inline-flex ml-2">formule inadéquate</span>
                    <br>
                    <div class="jumbotron pt-10 pb-10">
                        <p>Pour pouvoir crée votre cité, vous devez avoir payé la formule adéquate</p>
                    </div>
                    <b-button size="lg" class="my-2" variant="outline-info" @click.prevent="createLogement">payer la formule ACCESS</b-button>
                </div>
            </template>
           
        </b-modal>-->
         <b-modal id="modal-cite-forbidden" size="lg" title="Large Modal" ref="modal-cite-forbidden"  no-close-on-backdrop hide-header-close>
              <template #modal-title>
                <span class="font-weight-bold font-size-2em">Avertissement</span>
            </template>
              <div class="text-center">
                    <i class="fas fa-ban fa-3x"></i> <br>
                    <span class="h4 d-inline-flex ml-2">formule inadéquate</span>
                    <br>
                    <div class="jumbotron pt-10 pb-10">
                        <p>Actuellement, vous utilisez une formule inadéquate à l'action que vous voulez mener.
                            Cette fonctionnalité est disponible pour les comptes payants.
                            Vous pouvez consulter notre page des<b-link :to="{name: 'packs'}"><span class="signup">{{$t('data.modal_restriction_tarifs')}}</span></b-link> pour plus d'informations.</p>
                    </div>
                    
                </div>
            <template #modal-footer>
                <button type="button" class="btn btn-secondary" @click="$bvModal.hide('modal-cite-forbidden')">Fermer</button>
                <b-button size="lg" class="my-2" variant="outline-info" @click.prevent="createLogement">payer la formule ACCESS</b-button>
            </template>
         </b-modal>
    </div>
</template>

<script>
// Je renome le composant Cite en AppCite parcequ'il existe une balise <cite>. Du coup le composant n'allait pas etre prise en compte
import AppCite from '@/components/_patrimoine/Cite.vue'
import DetailsCite from '@/components/_patrimoine/DetailsCite.vue'
import SearchForm from "@/components/parts/SearchForm.vue";

const php  = require ( 'phpjs' ) ; 

export default {
    name: 'cites',
    components: {
        AppCite,
        DetailsCite,
        SearchForm,
    },
    computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.cites, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        },
        canCreateCite() {
            if(this.permissions!=null&&this.permissions.includes("create_cite")){
                return true;
            }
            return false;      
        },
    },
    data: () => ({
        cites: [],
        trueCites: [],
        showOverlay: true,
        cite: null,
        currentPage: 1,
        perPage: 10,
        search: null,
        modal: {
            action: '', submitted: false,
            nom: '', ref: '', idCite: '', photo: ''
        },
        source:0,
        permissions: storage.get("userPermissions") ||[],

    }),
    watch: {
        search(value) {
            if (!php.empty(value)) {
                this.cites = this.trueCites.filter(elt => elt.nomCite.toLowerCase().includes(value.toLowerCase()))
            }
            else {
                this.cites = this.trueCites
            }
        }
    },
    beforeMount() {
        this.getCities()
    },
    mounted(){
        // this.autoAddTarget();
    },
    methods: {
        createCiteCall(){
            if(this.canCreateCite){
                this.modal.action='add'
                this.$bvModal.show('modal-cite')
            }else{
                console.log('entrée ici')
                this.$bvModal.show('modal-cite-forbidden')
            }
            
        },
        showModal(){
            this.modal.action='add'
            this.$refs.modalCite.show("modal-cite");
        },

        /**
         * Selection de l'image illustrative de la cite
         */
        onFileSelected(file) {
            let reader = new FileReader(),
                    modal = this.modal
                reader.onload = function() {
                    modal.photo = this.result
                }
                reader.readAsDataURL(file)
        },

        /**
         * Recupere les cites au backend
         */
        getCities() {
            axios.get('cites').then(response => response.result || []).then(cites => {
console.log(cites);
this.cites = this.trueCites = cites
                this.autoAddTarget()
                this.showOverlay = false

            })
        },

        /**
         * Affiche le modal de création d'une cité directement au chargement de la page
         * ceci est utilisé lorsqu'on est arrivé ici en provenant de la homepage
         */
        autoAddTarget() {
            const formCite = this.$route.query.formCite || null;
            if (formCite) {
                 this.showModal()
                window.history.replaceState(
                    {},
                    "",
                    window.location.href.split("?")[0]
                );
                
            }
        },

        /**
         * Affiche les details d'une cite
         * 
         * @param {Object} cite
         */
        showDetails(cite) {
            this.cite = cite
            this.source=2
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.cite = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.cite = null
                })
            }, 100)          
        },

        /**
         * Raffraichi la liste des batiments de la cité active
         * 
         * @param {Batiment} neWbatiment
         */
        changeBatiments(neWbatiment) {
            /*this.cites = this.cites.map(elt => {
                if (elt.idCite != this.cite.idCite) {
                    return elt
                }
                return {
                    ...elt,
                    batiments
                }
            })*/
            this.cite.batiments.unshift(neWbatiment)
        },
        /*changeBatiments(batiment) {
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
        },*/
        /**
         * Retire une cite
         * 
         * @param {Integer} idCite
         */
        removeCite(idCite) {
            this.cites = this.cites.filter(elt => elt.idCite != idCite)
            this.trueCites = this.trueCites.filter(elt => elt.idCite != idCite)
        },

        resetModal() {
            this.modal = {
                action: '', submitted: false,
                nom: '', ref: '', idCite: '', photo: ''
            }
        },
        /**
         * Validation du formulaire d'ajout/modification de la cite
         */
        async submitModal(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (php.empty(this.modal.nom) || php.empty(this.modal.ref)) {
                return App.error('Veuillez remplir tous les champs du formulaire')
            }
            this.modal.submitted = true
            const data = Object.assign({}, this.modal, {
                photo: await this.$getBase64(this.modal.photo)
            })

            if (this.modal.action == 'add') {
                axios.post('cites', data).then(response => {
                    this.modal.submitted = false

                    if (!response.success) {
                        return App.alertError(response.message)
                    }
                    /* this.cites = this.addNewCite(this.cites, response.result)
                    this.trueCites = this.addNewCite(this.trueCites, response.result) */
                    this.getCities()
                    this.$bvModal.hide('modal-cite')
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.modal.submitted = false 
                    return App.alertError(error.message)
                })
            }
            if (this.modal.action == 'edit') {
                axios.put(`cites/${this.modal.idCite}`, data).then(response => {
                    this.modal.submitted = false

                    if (!response.success) {
                        return App.alertError(response.message)
                    }
                    this.cites = this.renameCite(this.cites, data)
                    this.trueCites = this.renameCite(this.trueCites, data)
                    this.$bvModal.hide('modal-cite')
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.modal.submitted = false 
                    return App.alertError(error.message)
                })
            }
        },
        updateCite(cite) {
            this.modal = {
                action: 'edit',
                nom: cite.nomCite, ref: cite.refCite, idCite: cite.idCite, photo: cite.image
            }
            this.$bvModal.show('modal-cite')
        },

        addNewCite(cites, cite) {
            let exist = false
            for (let i = 0; i < cites.length; i++) {
                if (cites[i].idCite == cite.idCite) {
                    exist = true 
                    break
                }
            }
            if (!exist) {
                cites.push(cite)
            }
            return cites
        },
         /**
         * Modifie les info de la cite dans la pile des cites
         */
        renameCite(cites, cite) {
            return cites.map(elt => {
                if (elt.idCite == cite.idCite) {
                    elt.nomCite = cite.nom
                    elt.refCite = cite.ref
                    elt.image = cite.photo
                }
                return elt
            })
        }
    }
}
</script>
<style scoped>
    .signup{
        color: #ee3a5b;
        font-weight: bold;
    }
</style>