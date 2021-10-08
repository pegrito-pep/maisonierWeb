<template>
    <div>
        <page-description title="Batiments" description="Gestion de vos batiments" icon="building" :path="['Patrimoine immobilier', 'Mes batiments']" />
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
                            <b-button variant="danger" @click.prevent="() => {action = 'add'; $bvModal.show('modal-batiment')}"><i class="fa fa-plus-circle"></i> Nouveau batiment</b-button>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!batiments.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Aucun batiment trouvé</span>
                    </b-alert> 
                    <b-row v-else class="layout-wrap">
                        <b-col v-for="(batiment, i) in items" :key="batiment.idBatiment || i" xl="3" lg="4" cols="12" sm="6" class="animated flipInX mb-4">
                            <batiment @makeUpdate="updateBatiment" @deleted="removeBatiment" @showDetails="showDetails" :batiment="batiment" />
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="batiments.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>

        <!-- MODALE POUR AFFICHER LES DETAILS D'UN BATIMENT -->
        <div v-if="batiment" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">Détails du batiment : <b>{{ batiment.nomBatiment }}</b>.</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-batiment @logementsChanged="changeLogements" :batiment="batiment" />
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALE POUR AJOUTER/MODIFIER UN BATIMENT -->
        <b-modal id="modal-batiment" size="lg" hide-footer ref="modalBatiment" @hidden="batiment = null">
            <template #modal-title>
                <span v-if="action == 'add'">Ajouter un batiment</span>
                <span v-if="action == 'edit'">Edition du batiment</span>
            </template>
            <form-batiment @batimentAdded="pushBatiment" @batimentUpdated="editBatiment" :action="action" :batiment="batiment" />
        </b-modal>
    </div>
</template>

<script>
import DetailsBatiment from '@/components/_patrimoine/DetailsBatiment.vue'
import Batiment from '@/components/_patrimoine/Batiment.vue';
import FormBatiment from '../../components/_patrimoine/FormBatiment.vue';

const php  = require ( 'phpjs' ) ; 

export default {
    name: 'Batiments',
    components: {
        DetailsBatiment,
        Batiment,
        FormBatiment,
    },
    computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.batiments, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        batiments: [],
        trueBatiments: [],
        showOverlay: true,
        batiment: null,
        currentPage: 1,
        perPage: 10,
        search: null,
        action: 'add'
    }),
    watch: {
        search(value) {
            value = value.toLowerCase()
            this.batiments = !php.empty(value) ? this.trueBatiments.filter(elt => elt.nomBatiment.toLowerCase().includes(value)) : this.trueBatiments
        }
    },
    mounted() {
        this.getBatiments()
    },
    methods: {
        /**
         * Recupere les batiments au backend
         */
        async getBatiments() {
            try {
                this.batiments = this.trueBatiments = await axios.get('batiments').then(response => response.result || [])
                this.showOverlay = false
               
                this.autoDetailsTarget()
                this.autoAddTarget()
            } catch (error) {
                
            }
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
         * Affiche automatiquement les details d'un batiment au chargement
         * ceci est utilise dans le cas où on a cliqué sur le batiment en etant sur le details d'une cité
         */
        autoDetailsTarget() {
            const target = this.$route.query.target || null;
            if (target) {
                const batiment = this.trueBatiments.filter(elt => elt.idBatiment == target)[0]
                if (batiment) {
                    this.showDetails(batiment)
                    window.history.replaceState({}, '', window.location.href.split('?')[0])
                }
            }
        },
        /**
         * Affiche les details d'un batiment
         * 
         * @param {Object} batiment
         */
        showDetails(batiment) {
            this.batiment = batiment
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.batiment = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.batiment = null
                })
            }, 100)          
        },

        /**
         * Raffraichi la liste des logements du batiment actif
         * 
         * @param {Logement[]} logements
         */
        changeLogements(logements) {
            this.batiments = this.batiments.map(elt => {
                if (elt.idBatiment != this.batiment.idBatiment) {
                    return elt
                }
                return {
                    ...elt,
                    logements
                }
            })
            this.batiment.logements = logements
        },
        /**
         * Retire un batiment de la pile des batiments
         * 
         * @param {Integer} idBatiment
         */
        removeBatiment(idBatiment) {
            this.batiments = this.batiments.filter(elt => elt.idBatiment != idBatiment)
            this.trueBatiments = this.trueBatiments.filter(elt => elt.idBatiment != idBatiment)
        },

        /**
         * Declanché lorsqu'on a ajouté un batiment
         */
        pushBatiment(batiment) {
            this.batiments = this.addNewBatiment(this.batiments, batiment)
            this.trueBatiments = this.addNewBatiment(this.trueBatiments, batiment)
            this.$bvModal.hide('modal-batiment')
        },
        /**
         * Declanché lorsqu'on a edité un batiment
         */
        editBatiment(batiment) {
            this.batiments = this.renameBatiment(this.batiments, batiment)
            this.trueBatiments = this.renameBatiment(this.trueBatiments, batiment)    
            this.$bvModal.hide('modal-batiment')
        },

        /**
         * Lance l'edition d'un batiment
         */
        updateBatiment(batiment) {
            this.action = 'edit'
            this.batiment = batiment
            this.$bvModal.show('modal-batiment')
        },
        /**
         * Ajoute un nouveau batiment a la pile des batiment
         */
        addNewBatiment(batiments, batiment) {
            let exist = false
            for (let i = 0; i < batiments.length; i++) {
                if (batiments[i].idBatiment == batiment.idBatiment) {
                    exist = true 
                    break
                }
            }
            if (!exist) {
                batiments.push(batiment)
            }
            return batiments
        },
        /**
         * Modifie les info du batiment dans la pile des batiment
         */
        renameBatiment(batiments, batiment) {
            return batiments.map(elt => {
                if (elt.idBatiment == batiment.idBatiment) {
                    elt.nomBatiment = batiment.nom
                    elt.refBatiment = batiment.ref
                    elt.image = batiment.photo
                    elt.idCite = batiment.idCite
                }
                return elt
            })
        }
    }
}
</script>