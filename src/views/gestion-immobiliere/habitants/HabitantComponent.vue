<template>
    <div class=" list-item list-item-grid">
        <div class="card d-flex flex-row mb-3">
            <b-row>
                <b-col cols="11">
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
                                style="height: 18em" class="responsive border-0"
                                v-for="(photo,i) in annonce.photos" :key="i"
                                :img-src="photo"
                            ></b-carousel-slide>
                        </b-carousel>
                <span v-if="!annonce.publish" class="badge badge-pill badge-danger position-absolute badge-top-left">{{$t('data.detail_habitant_pas_encore_publier')}}</span>
                <span v-if="annonce.publish" class="badge badge-pill badge-success position-absolute badge-top-left">{{$t('data.detail_habitant_deja_publier')}}</span>
            </a>
                </b-col>
                <b-col cols="1" class="refactor">
                    <b-row>
                        <button type="button" class="btn btn-icon btn-warning" id="button-edit"><i class="ik ik-edit-2"></i></button>
                        <b-tooltip target="button-edit" noninteractive variant="warning"><span> {{$t('data.detail_habitant_modifier')}}</span></b-tooltip>
                    </b-row>
                   <b-row>
                        <button type="button" class="btn btn-icon btn-danger" id="button-delete"><i class="ik ik-trash-2"></i></button>
                        <b-tooltip target="button-delete" noninteractive variant="danger"><span> {{$t('data.detail_habitant_supprimer')}}</span></b-tooltip>
                    </b-row>
                    <b-row v-if="annonce.nbrPropostions===0">
                        <button  class="btn btn-icon btn-secondary" id="button-nombre-propositions"><i class="fas fa-sticky-note"></i></button>
                        <b-tooltip target="button-nombre-propositions" noninteractive variant="secondary"><span> {{$t('data.detail_habitant_deja_recu')}} {{ annonce.nbrPropostions }} {{$t('data.detail_habitant_proposition')}}</span></b-tooltip>
                    </b-row>
                     <b-row v-if="annonce.nbrPropostions>0">
                        <button  class="btn btn-icon btn-success" id="button-nombre-propositions"><i class="fas fa-sticky-note"></i></button>
                        <b-tooltip target="button-nombre-propositions" noninteractive variant="success"><span> {{$t('data.detail_habitant_deja_recu')}} {{ annonce.nbrPropostions }}  {{$t('data.detail_habitant_proposition')}}</span><span v-if="annonce.nbrPropostions>0">s</span></b-tooltip>
                    </b-row>
                    <b-row>
                        <button class="btn btn-icon btn-info" id="button-comment"><i class="fa fa-comments"></i></button>
                        <b-tooltip target="button-comment" noninteractive variant="info"><span> {{$t('data.annonce_details_tooltip_commenter_annonce')}}</span></b-tooltip>
                    </b-row>
               </b-col>
                  
                  
                 
                
               <!-- <b-col cols="2"> 
                <template b-slot:activator="{ on }">
                  <b-btn class="mx-2" color="warning" x-small fab b-on="on">
                   <i class="ik ik-menu"></i>
                  </b-btn>
                </template></b-col>-->
                 
            </b-row>
            
            <div class="d-flex flex-grow-1 min-width-zero card-content">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div class="text-center">
                        <h6 class="text-red mt-0 truncate">{{ annonce.titreAnnonce }}</h6>
                        <!--<span class="d-inline-block text-muted">Reference: <b>{{ logement.refLogement }}</b></span>-->
                      
                    </div>
                    <VueAutoVirtualScrollList
                        :totalHeight="180"
                        :defaultHeight="80"
                        style="width: 100%;"
                    >
                        <div>
                        {{ annonce.descAnnonce }}
                        </div>
                    </VueAutoVirtualScrollList>
                       <!-- <p class="mt-3 mb-1 text-muted text-small date w-15 w-xs-100">{{ annonce.descAnnonce }}</p>
                   <p v-b-tooltip.bottom="dateCreation" >{{ $date(annonce.createdAt).format("DD.MM.YYYY") }}</p>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAutoVirtualScrollList from 'vue-auto-virtual-scroll-list'


export default {
     data: () => ({
        slide: 0,
        sliding: null,
        open:true
    }),
    components:{
        VueAutoVirtualScrollList
    },
    props: {
        habitant: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    computed: {
        dateCreation() {
            const day = this.$date(this.annonce.createdAt)
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
            this.$emit('showDetails', this.annonce)
        },
        /**
         * Suppression d'un logement
         */
        remove() {
            App.confirm(`Voulez-vous vraiment supprimer la cité " <b>${this.annonce.titreAnnonce}</b> " ?`, { confirm: () => {
                axios.delete(`cites/${this.annonce.idAnnonce}`).then(response => {
                    if (!response.success) {
                        return App.notifyError(response.message)
                    }
                    this.$emit('deleted', this.annonce.idAnnonce)
                    return App.notifySuccess(response.message)
                })
            }})
        }
    }
}
</script>

<style scoped>
.refactor{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>