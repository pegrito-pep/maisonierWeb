<template>
    <div class=" list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <img src="@/assets/img/article.jpeg" alt="" style="height: 10em" class="list-thumbnail responsive border-0">
                <span v-if="isNew" class="badge badge-pill badge-primary position-absolute badge-top-left">{{$t('data.article_nouvel')}}</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h5 class="text-red text-small mt-0 truncate">{{ article.titreArticle }}</h5>
                        <span class="d-inline-block text-muted">{{$t('data.article_numero_article')}}: <b>{{ article.numArticle }}</b></span>
                    </div>
                    <p v-b-tooltip.bottom="dateCreation" class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ $date(article.createdAt).format("DD.MM.YYYY") }}</p>
                </div>
                <div class="list-actions">
                    <a href="#" @click.prevent="showDetails"><i class="ik ik-eye"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', article)"><i class="ik ik-edit-2"></i></a>
                    <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        article: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
        computed: {
        dateCreation() {
            const day = this.$date(this.article.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        /**
         * Verifie si c'est une cité nouvellement ajoutée
         */
        isNew() {
            return dayjs().diff(this.article.createdAt, 'hour') <= 1
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
            this.$emit('showDetails', this.article)
            console.log(this.article)
        },
        /**
         * Suppression de l'article
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer l'article " <b>${this.article.titreArticle}</b> " ?`, { confirm: () => {
                axios.delete(`articles/${this.article.idArticle}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.article.idArticle)
                    return App.notifySuccess(response.message)
                })
            }})
        }
    }
}
</script>

<style>
.date{
    cursor: pointer;
}

</style>