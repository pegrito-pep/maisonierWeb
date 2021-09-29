<template>
    <div class="shadow list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <img :src="depense.photo || '/img/depenseImage.jpg'" alt="" style="height: 15em" class="list-thumbnail responsive border-0">
                <!--<img src="/img/depenseImage.jpg" alt="" style="height: 15em" class="list-thumbnail responsive border-0">-->
                <span v-if="depense.etatDepense" class="badge badge-pill badge-success position-absolute badge-top-left"></span>
                <span v-else class="badge badge-pill badge-danger position-absolute badge-top-left">Non traitée</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="d-flex flex-grow-1 min-width-zero card-content py-3">
                    <div style="height: 15em; overflow-y: auto" class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                        <div class="text-center">
                            <h5 class="text-red">{{ php.ucfirst(depense.motif.toLowerCase()) }}</h5>
                        </div>
                        <div class="text-muted w-100 my-1">
                            <span class="d-inline-block w-10 text-center"><i class="fa fa-dollar-sign"></i></span>
                            <span>Montant :{{ depense.montant }} </span>
                        </div>
                        <div class="text-muted w-100 my-1">
                            <span class="d-inline-block w-10 text-center"><i class="far fa-calendar-alt"></i></span>
                            <span>Date :{{ depense.dateDepense }} </span>
                        </div>
                        <div v-if="source==0">
                            <div v-if="depense.cite !==null" class="text-muted w-100 my-1">
                                <span class="d-inline-block w-10 text-center"><i class="fas fa-city"></i></span>
                                <span>Cité  :{{ depense.cite.nomCite }} </span>
                            </div>
                            <div v-if="depense.batiment !==null" class="text-muted w-100 my-1">
                                <span class="d-inline-block w-10 text-center"><i class="fa fa-building"></i></span>
                                <span>Batiment  :{{ depense.batiment.nomBatiment }} </span>
                            </div>
                            <div v-if="depense.logement !==null" class="text-muted w-100 my-1">
                                <span class="d-inline-block w-10 text-center"><i class="fas fa-home"></i></span>
                                <span>Logement  :{{ depense.logement.refLogement }} </span>
                            </div>
                        </div>
                        
                        <hr>
                        <p class="text-muted text-small">{{ depense.observation }}</p>
                    </div>
                </div>
                <div class="list-actions">
                     <a href="#" @click.prevent="showDetails" v-if="!isSub"><i class="ik ik-eye"></i></a>
                    <a href="#" @click.prevent="accessTo" v-if="isSub"><i class="ik ik-link"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', depense)" v-if="!isSub" ><i class="ik ik-edit-2"></i></a>
                    <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const php = require('phpjs')
export default {
    props: {
        depense: { type: Object, required: true },
        isSub: {type: Boolean, default: false},
        source:{type:Number, default:0}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.depense.createdAt)
            return `Crée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        php() {
            return php;
        }

    },
    methods: {
        /**
         * Affiche la modale avec les details de l'element
         */
        showDetails() {
            if (this.isSub) {
                return false
            }
            this.$emit('showDetails', this.depense)
        },
        /**
         * Acces rapide aux details de l'element
         */
        accessTo() {
            $('#editLayoutItem').modal('hide')
            this.$router.push({name: 'depenses', query: {target: this.depense.idDepense}})
        },
        /**
         * Suppression d'une dépense
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer la dépense " <b>${this.depense.motif}</b> " ?`, { confirm: () => {
                axios.delete(`depenses/${this.depense.idDepense}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.depense.idDepense)
                    return App.notifySuccess(response.message)
                })
            }})
        }
    }
}
</script>
