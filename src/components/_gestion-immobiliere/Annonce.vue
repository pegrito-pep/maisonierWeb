<template>
    <div class=" list-item list-item-grid">
        <div class="card mb-3">
            <div class="d-flex mb-3">
                <a class="w-90 d-flex card-img" @click.prevent="showDetails" href="#">
                    <b-carousel :interval="4000" controls indicators>
                        <b-carousel-slide style="height: 15em" class="fluid w-100 responsive border-0" v-for="(photo,i) in annonce.photos" :key="i" :img-src="photo"/>
                    </b-carousel>
                    <b-badge pill class="position-absolute badge-top-left" :variant="annonce.publish ? 'success' : 'danger'">{{ annonce.publish ? 'Déja publiée' : 'Pas encore publiée' }}</b-badge>
                    <b-badge pill class="position-absolute badge-top-left-2" variant="secondary" v-b-tooltip.bottom="dateCreation"><i class="fa fa-clock"></i> {{ $date(annonce.createdAt).format("DD.MM.YYYY") }} </b-badge>
                </a>
                <div class="w-10 d-flex flex-column justify-content-center align-items-center">
                    <b-button v-if="!annonce.publish" class="btn-icon my-1" variant="primary" v-b-tooltip.left="'Publier'" @click="publier(annonce)"><i class="fas fa-share"></i></b-button>
                    <b-button class="btn-icon my-1" variant="warning" v-b-tooltip.left="'Modifier'"><i class="ik ik-edit-2"></i></b-button>
                    <b-button class="btn-icon my-1" variant="danger" v-b-tooltip.left="'Supprimer'"><i class="ik ik-trash-2"></i></b-button>
                    <b-button class="btn-icon my-1" variant="info" v-b-tooltip.left="'Faire un commentaire'"><i class="fa fa-comments"></i></b-button>
                    <b-button class="btn-icon my-1" :variant="annonce.nbrPropostions > 0 ? 'success' : 'secondary'" id="button-nombre-propositions"><i class="fas fa-sticky-note"></i></b-button>               
                    <b-tooltip target="button-nombre-propositions" placement="left" noninteractive variant="secondary">Vous avez déjà reçu {{ annonce.nbrPropostions }} propositions</b-tooltip>
                    <b-button class="btn-icon my-1" variant="dark" v-b-tooltip.left="'Accéder au logement'" @click.prevent="accessTo"><i class="fa fa-share-square"></i></b-button>
                </div>
            </div>
            <div class="d-flex flex-grow-1 min-width-zero card-content py-3">
                <div style="height: 15em; overflow-y: auto" class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h5 class="text-red">{{ php.ucfirst(annonce.titreAnnonce.toLowerCase()) }}</h5>
                        <b-badge v-for="(tag, i) in annonce.tags.split(',')" :key="i" variant="secondary">{{ tag }}</b-badge>
                    </div>
                    <hr>
                    <p class="text-muted text-small">{{ annonce.descAnnonce }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const php = require('phpjs')
import notif from "@/plugins/notif.js";
export default {
     data: () => ({
        open:true
    }),
    props: {
        annonce: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.annonce.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        php() {
            return php;
        }

    },
    methods: {
        /**
         * Acces rapide au logement pour lequel l'annonce a étée publiée
         */
        accessTo() {
            this.$router.push({name: 'logements', query: {target: this.annonce.idLogement}})
        },
         /**
         * Publier une annonce
         */
        publier(item) {
            let url="annonces/" + item.idAnnonce + "/publish";
            axios.put(url).then(response => {
			    this.$root.$emit('annonce-published-ok')
			    notif.success(response.message)
		    }).catch(error => {
			      notif.error(error.message);
		    })
        }

    }
}
</script>