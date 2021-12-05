<template>
    <div class="shadow list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <a class="d-flex card-img" @click.prevent="showDetails" href="#">
                <b-carousel v-if="logement.photos.length>0" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="15em">
                     <b-carousel-slide style="height: 15em" class="responsive border-0" v-for="(photo, i) in logement.photos" :key="photo.idPhoto || i" :img-src="photo.image|| '/img/bgCity.jpg'" />
                </b-carousel>
                <img v-else :src="`${$router.options.base}img/imagelogementdefault-.jpg`" alt="" style="height: 15em" class="list-thumbnail responsive border-0">
                <span v-if="!logement.etatLogement" class="badge badge-pill badge-danger position-absolute badge-top-left">{{$t('data.logement_etat_libre')}}</span>
                <span v-else class="badge badge-pill badge-success position-absolute badge-top-left">{{$t('data.logement_etat_occupe')}}</span>
            </a>
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h4 class="mt-0 truncate" style="color: #f5365c; font-size: 22px;">{{ logement.refLogement }}</h4>
                        <!--<span class="d-inline-block text-muted">Reference: <b>{{ logement.refLogement }}</b></span>-->
                    </div>
                     <hr>
                    <div class="text-muted w-100 my-1">
                        <span class="d-inline-block w-10 text-center"><i class="fa fa-star"></i></span>
                        <span>{{ logement.sousTypeLogement.libelleSousType }}</span>
                    </div>
                    <div class="text-muted w-100 my-1">
                        <span class="d-inline-block w-10 text-center"><i class="fa fa-map-marker-alt"></i></span>
                        <span>{{ adresse }}</span>
                    </div>
                    <div class="text-muted w-100 my-1">
                        <span class="d-inline-block w-10 text-center"><i class="fa fa-dollar-sign"></i></span>
                        <span class="font-weight-bold"  style="color: #f5365c; font-size: 20px;">{{ logement.prixMin + ' F - ' + logement.prixMax + ' F' }} </span>
                    </div>
                    <p v-if="isSub" class="text-muted mt-3 mb-1 date w-15 w-xs-100 text-small">{{ $date(logement.createdAt).format("DD.MM.YYYY") }}</p>
                    <p v-else v-b-tooltip.bottom="dateCreation" class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ $date(logement.createdAt).format("DD.MM.YYYY") }}</p>
                </div>
                <div class="list-actions">
                    <a v-if="!isSub&&canViewDetails" href="#" @click.prevent="showDetails" v-b-tooltip.bottom="$t('data.logement_tooltip_details')"><i class="ik ik-eye"></i></a>
                    <a v-if="canCloneLogement&&!isSub" href="#" @click.prevent="$emit('makeClone', logement)"  v-b-tooltip.bottom="$t('data.logement_tooltip_cloner')"><i class="ik ik-copy"></i></a>
                    <a href="#" @click.prevent="accessTo" v-if="isSub" v-b-tooltip.bottom="$t('data.logement_tooltip_acceder_aux_details')"><i class="ik ik-link"></i></a>
                    <a v-if="canUpdateLogement&&!isSub" href="#" @click.prevent="$emit('makeUpdate', logement)"  v-b-tooltip.bottom="$t('data.logement_tooltip_editer')" ><i class="ik ik-edit-2"></i></a>
                    <a v-if="canDeleteLogement" href="#" @click.prevent="remove" class="list-delete" v-b-tooltip.bottom="$t('data.logement_tooltip_supprimer')"><i class="ik ik-trash-2"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const php = require('phpjs')
export default {
    props: {
        logement: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    data: () => ({
        permissions: storage.get("userPermissions"),
    }),
    computed: {
        dateCreation() {
            const day = this.$date(this.logement.createdAt)
            return `Crée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format("HH:mm")}`
        },
        canUpdateLogement() {
            if(this.permissions.includes("update_logement")){
                return true;
            }
            return false;
                
        },
        canDeleteLogement() {
            if(this.permissions.includes("delete_logement")){
                return true;
            }
            return false;    
        },
        canCloneLogement(){
            if(this.permissions.includes("clone_logement")){
                return true;
            }
            return false;  
        },
        canViewDetails(){
            if(this.permissions.includes("view_logement")){
                return true;
            }
            return false;  
        },

        adresse() {
            if (!php.empty(this.logement.adresse)) {
                return `${this.logement.adresse.ville} ${this.logement.adresse.pays}`
            }
            if (!php.empty(this.logement.batiment)) {
                if (!php.empty(this.logement.batiment.adresse)) {
                    return `${this.logement.batiment.adresse.ville} ${this.logement.batiment.adresse.pays}`
                }
            }
            return ''
        },
        
    },
    methods: {
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
         * Acces rapide aux details de l'element
         */
        accessTo() {
            $('#editLayoutItem').modal('hide')
            this.$router.push({name: 'logements', query: {target: this.logement.idLogement}})
        },
        /**
         * Suppression d'un logement
         */
        remove() {
            App.confirm(`Voullez vous vraiment supprimer le logement " <b>${this.logement.refLogement}</b> " ?`, { confirm: () => {
                axios.delete(`logements/${this.logement.idLogement}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.logement.idLogement)
                    return App.notifySuccess(response.message)
                })
            }})
        }
    }
}
</script>

<style>

</style>