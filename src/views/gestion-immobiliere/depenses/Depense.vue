<template>
    <div class="card d-flex flex-row justify-justify-content-start align-items-start">
		<a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
			<img :src="depense.photo || '/img/depenseImage.jpg'" alt="" style="height: 10em" class="list-thumbnail responsive border-0">
		</a>
		<div class="d-flex flex-grow-1 min-width-zero card-content">
            <div class="card-body align-self-center d-flex flex-column justify-content-between min-width-zero align-items-md-center">
                <div class="list-item-heading mb-1 truncate w-100 w-xs-100" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                    <h5 class="text-red">{{ php.ucfirst(depense.motif.toLowerCase()) }}</h5>
                    <div class="d-flex">
                        <span class="text-muted small date mr-3" v-b-tooltip.bottom="'Montant de la dépense'"><i class="fa fa-dollar-sign"></i> {{ depense.montant }} F</span>
                        <span class="text-muted small date ml-3" v-b-tooltip.bottom="'Date de l\'opération'"><i class="far fa-calendar-alt"></i> {{ $dayjs(depense.dateDepense).format('DD MMMM YYYY') }} </span>
                    </div>
                    <div class="w-100">
                        <span v-if="depense.etatDepense" class="badge badge-pill badge-success"></span>
                        <span v-else class="badge badge-danger small">Non traitée</span>
                    </div>
                </div>
                <div class="card-content w-100">
                    <hr>
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
                    <div class="jumbotron pt-5 pb-5 px-3 my-0" v-if="depense.observation"><p class="text-muted text-small">{{ depense.observation }}</p></div>
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
