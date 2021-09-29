<template>
    <div class=" list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
	                img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                >
                     <b-carousel-slide
                        style ="height:20em"
                        class="responsive border-0 imgH"
                        v-for="(photo,i) in logement.photos" :key="i"
                         :img-src="photo.image"
                     ></b-carousel-slide>
                </b-carousel>
                <span v-if="!logement.etatLogement" class="badge badge-pill badge-danger position-absolute badge-top-left">Libre</span>
                <span v-if="logement.etatLogement" class="badge badge-pill badge-success position-absolute badge-top-left">Occupé</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h4 class="text-red mt-0 truncate">{{ logement.nomLogement }}</h4>
                        <span class="d-inline-block text-muted">Reference: <b>{{ logement.refLogement }}</b></span>
                    </div>
                    <p v-b-tooltip.bottom="dateCreation" class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ $date(logement.createdAt).format("DD.MM.YYYY") }}</p>
                </div>
                <div class="list-actions">
                    <a href="#" @click.prevent="showDetails"><i class="ik ik-eye"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', logement)"><i class="ik ik-edit-2"></i></a>
                    <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     data: () => ({
        slide: 0,
        sliding: null
    }),
    props: {
        logement: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.logement.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },

    },
    methods: {
        //methode de pilotage du slider
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        /**
         * Affiche la modale avec les details de l'element
         */
        showDetails() {
            if (this.isSub) {
                return false
            }
            this.$emit('showDetails', this.logement)
        },
        /**
         * Suppression d'un logement
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer la cité " <b>${this.cite.nomCite}</b> " ?`, { confirm: () => {
                axios.delete(`cites/${this.cite.idCite}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.cite.idCite)
                    return App.notifySuccess(response.message)
                })
            }})
        }
    }
}
</script>

<style>
    .imgH{
        height: 21em!important;
    }
</style>