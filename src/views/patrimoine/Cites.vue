<template>
    <div>
        <page-description title="Cités" description="Gestion de vos cités" icon="city" :path="['Patrimoine immobilier', 'Mes cités']" />
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
                            <b-button variant="danger" @click.prevent="() => {modal.action = 'add'; $bvModal.show('modal-cite')}"><i class="fa fa-plus-circle"></i> Nouvelle cité</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!cites.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucune cité enregistrée pour le moment</span>
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
                        <h5 class="modal-title" id="editLayoutItemLabel">Détails de la cité : <b>{{ cite.nomCite }}</b>.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-cite @batimentsChanged="changeBatiments" :cite="cite" />
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALE POUR AJOUTER/MODIFIER UNE CITE -->
        <b-modal id="modal-cite" size="sm" @hidden="resetModal" @ok="submitModal" ref="modalCite">
            <template #modal-title>
                <span v-if="modal.action == 'add'">Ajouter une cité</span>
                <span v-if="modal.action == 'edit'">Edition de la cité</span>
            </template>
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="modal.submitted">Valider <b-spinner v-if="modal.submitted" small /></b-button>
            </template>
            <b-form-group label="Nom de la cité">
                <b-form-input v-model="modal.nom" placeholder="Ex: Cité de la paix" trim></b-form-input>
            </b-form-group>
            <b-form-group label="Reference">
                <b-form-input v-model="modal.ref" placeholder="Ex: CP3" trim></b-form-input>
            </b-form-group>
            <b-form-group label="Photo">
                <img-inputer v-model="modal.photo" :img-src="$getBase64(modal.photo, false)" placeholder="Ajouter la photo de la cité" theme="light" size="xl" bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img"  />
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
// Je renome le composant Cite en AppCite parcequ'il existe une balise <cite>. Du coup le composant n'allait pas etre prise en compte
import AppCite from '@/components/_patrimoine/Cite.vue'
import DetailsCite from '@/components/_patrimoine/DetailsCite.vue'

const php  = require ( 'phpjs' ) ; 

export default {
    name: 'Cites',
    components: {
        AppCite,
        DetailsCite,
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
        }
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
        }
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
         this.autoAddTarget();
    },
    methods: {
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
                this.cites = this.trueCites = cites
                this.showOverlay = false
            })
        },

        /**
         * Affiche le modal de création d'une cité directement au chargement de la page
         * ceci est utilisé lorsqu'on est arrivé ici en provenant de la homepage
         */
        autoAddTarget() {
            const target = this.$route.query.target || null;
            if (target) {
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
                    this.cites = this.addNewCite(this.cites, response.result)
                    this.trueCites = this.addNewCite(this.trueCites, response.result)
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