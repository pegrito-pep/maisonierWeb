<template>
    <div class=" list-item list-item-grid">
       <div class="owl-container">
            <div class="owl-carousel basic">
                    <div class="card flex-row">
                        <div class="w-50 position-relative">
                            <img class="card-img-left" style="width:100%;display:block;" src="@/assets/img/contratDebail.jpg" alt="Card image cap">
                                <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                        </div>
                        <div class="w-50">
                            <div class="card-body">
                                <h6 class="mb-4">{{contrat.libelleModele}}</h6>
                                    <footer>
                                        <p class="text-muted text-small mb-0 font-weight-light">09.04.2018</p>
                                    </footer>
                            </div>
                        </div>
                         <div class="list-actions">
                                <a href="#" @click.prevent="showDetails"><i class="ik ik-eye"></i></a>
                                <a href="#" @click.prevent="$emit('makeUpdate', article)"><i class="ik ik-edit-2"></i></a>
                                <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>
                            </div>
                    </div>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    props: {
        contrat: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
        computed: {
        dateCreation() {
            const day = this.$date(this.contrat.createdAt)
            return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        /**
         * Verifie si c'est une cité nouvellement ajoutée
         */
        isNew() {
            return dayjs().diff(this.contrat.createdAt, 'hour') <= 1
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
            this.$emit('showDetails', this.contrat)
            console.log(this.contrat)
        },
        /**
         * Suppression de l'article
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer l'article " <b>${this.contrat.libelleModele}</b> " ?`, { confirm: () => {
                axios.delete(`articles/${this.contrat.idModele}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.contrat.idModele)
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