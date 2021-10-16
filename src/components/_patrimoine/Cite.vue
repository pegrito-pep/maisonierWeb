<template>
    <div class=" list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <img :src="cite.image || '/img/bgCity.jpg'" alt="" style="height: 10em" class="list-thumbnail responsive border-0">
                <span v-if="isNew" class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h4 class="text-red mt-0 truncate">{{ cite.nomCite }}</h4>
                        <span class="d-inline-block text-muted">Reference: <b>{{ cite.refCite }}</b></span>
                    </div>
                    <p v-b-tooltip.bottom="dateCreation" class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ $date(cite.createdAt).format("DD.MM.YYYY") }}</p>
                </div>
                <div class="list-actions">
                    <a href="#" @click.prevent="showDetails" v-b-tooltip.bottom="'Détails'"><i class="ik ik-eye"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', cite)" v-b-tooltip.bottom="'Editer'"><i class="ik ik-edit-2"></i></a>
                    <a href="#" @click.prevent="remove" class="list-delete" v-b-tooltip.bottom="'Supprimer'"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cite: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.cite.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        /**
         * Verifie si c'est une cité nouvellement ajoutée
         */
        isNew() {
            return dayjs().diff(this.cite.createdAt, 'hour') <= 1
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
            this.$emit('showDetails', this.cite)
        },
        /**
         * Suppression du cité
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
