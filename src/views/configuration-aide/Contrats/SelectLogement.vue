<template>
    <div class="card d-flex flex-row justify-justify-content-start align-items-start">
		<a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
			<img :src="logement.photos[0].image || '/img/appart-sejour (2).jpg'" alt="" style="height: 10em" class="list-thumbnail responsive border-0">
            <!--<img src="/img/imgLogementHomepage.jpg" alt="" style="height: 10em" class="list-thumbnail responsive border-0">-->
		</a>
		<div class="d-flex flex-grow-1 min-width-zero card-content">
            <div class="card-body align-self-center d-flex flex-column justify-content-between min-width-zero align-items-md-center">
                <div class="list-item-heading mb-1 truncate w-100 w-xs-100" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                    <h5 class="text-red">{{ php.ucfirst(logement.refLogement.toLowerCase()) }}</h5>
                        <hr>
                        <div v-if="logement.batiment !==null" class="text-muted w-100 my-1">
                            <span class="d-inline-block w-10 text-center"><i class="fa fa-building"></i></span>
                            <span>{{ logement.batiment.nomBatiment }} </span>
                            <span class="ml-2">ref:{{ logement.batiment.refBatiment }} </span>
                        </div>
            
                    
                    
                    
                    <div class="d-flex">
                        <span class="text-muted small date mr-3" v-b-tooltip.bottom="'Prix Minimal'"><i class="fa fa-dollar-sign"></i> {{ logement.prixMin }} F</span>
                        <span class="text-muted small date mr-3" v-b-tooltip.bottom="'Prix Maximal'"><i class="fa fa-dollar-sign"></i> {{ logement.prixMax }} F</span>
                    </div>
                </div>
      
            </div>
               <!--<b-form-checkbox
                    :id="logement.refLogement"
                    v-model="logement.idLogement"
                    :name="logement.refLogement"
                    :value="logement.idLogement"
                    
                    >
                  </b-form-checkbox>-->
                   <div class="custom-control custom-checkbox pl-1 align-self-center">
                        <label class="custom-control custom-checkbox mb-0">
                            <input type="checkbox" @change="selectLogement(logement)"  class="custom-control-input">
                            <span class="custom-control-label"></span>
                        </label>
                   </div>
            <div class="list-actions">
                 <!--<a href="#" @click.prevent="selectLogement" v-if="!isSub"><i class="ik ik-check-square"></i></a>
                <a href="#" @click.prevent="accessTo" v-if="isSub"><i class="ik ik-link"></i></a>
                <a href="#" @click.prevent="$emit('makeUpdate', depense)" v-if="!isSub" ><i class="ik ik-edit-2"></i></a>
                <a href="#" @click.prevent="remove" class="list-delete"><i class="ik ik-trash-2"></i></a>-->
                 

            </div>
        </div>
    </div>
</template>

<script>
const php = require('phpjs')
export default {
    props: {
        logement: { type: Object, required: true },
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
        selectLogement(logement){
            console.log('logement',logement)
        }
        
 
    }
}
</script>
