<template>
    <div class="shadow list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <img src="@/assets/img/rubrique.jpg" alt="" style="height: 10em" class="list-thumbnail responsive border-0">
                <span v-if="isNew" class="badge badge-pill badge-primary position-absolute badge-top-left">{{$t('data.article_nouvel')}}</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <!-- <h4 class="text-red mt-0 truncate">{{ rubrique.descRubrique }}</h4> -->
                        <span class="d-inline-block text-muted">{{$t('data.article_details_article_rubrique')}}: <b>{{rubrique.descRubrique }}</b></span>
                    </div>
                    <p v-if="isSub" class="text-muted mt-3 mb-1 date w-15 w-xs-100 text-small">{{ $date(rubrique.createdAt).format("DD.MM.YYYY") }}</p>
                    <p v-else v-b-tooltip.bottom="dateCreation" class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ $date(rubrique.createdAt).format("DD.MM.YYYY") }}</p>
                </div>
                <div class="list-actions">
                    <!-- <a href="#" @click.prevent="showDetails" v-if="!isSub"><i class="ik ik-eye"></i></a>
                    <a href="#" @click.prevent="accessTo" v-if="isSub"><i class="ik ik-link"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', rubrique)" v-if="!isSub" ><i class="ik ik-edit-2"></i></a> -->
                    <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rubrique: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.rubrique.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        /**
         * Verifie si c'est une cité nouvellement ajoutée
         */
        isNew() {
            return dayjs().diff(this.rubrique.createdAt, 'week') <= 1
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
            this.$emit('showDetails', this.rubrique)
        },
        /**
         * Acces rapide aux details de l'element
         */
        accessTo() {
            $('#editLayoutItem').modal('hide')
            this.$router.push({name: 'rubriques', query: {target: this.rubrique.idRubrique}})
        },
        /**
         * Suppression du batiment
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer le batiment " <b>${this.batiment.nomBatiment}</b> " ?`, { confirm: () => {
                axios.delete(`batiments/${this.batiment.idBatiment}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.batiment.idBatiment)
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    App.notifyError(error.message)
                })
            }})
        }
    }
}
</script>

<style>

</style>