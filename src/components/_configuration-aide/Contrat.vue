<template>
     <b-container>
            <b-row class="w-100 h-100">
                <b-col md="3">
                    <div class="contratLocationBailContainer">
                        <div class="cardImageBailContainer img-top"  @click.prevent="showDetails">
                             <b-skeleton-img card-img="top" v-if="showOverlay" aspect="8:9"></b-skeleton-img>
                            <img src="../../assets/img/c.png" v-else alt="template de contrat de bail ou de location">
                        </div>
                        <div class="footerBailContainer">
                            <span>
                                {{contrat.libelleModele}}
                            </span>
                        </div>
                         <div class="list-actions">
                            <a href="#" @click.prevent="showDetails"><i class="ik ik-eye"></i></a>
                            <!-- <a href="#" @click.prevent="$emit('makeUpdate', article)"><i class="ik ik-edit-2"></i></a> -->
                        </div>
                    </div>
                </b-col>
            </b-row>
    </b-container>
</template>

<script>

export default {
    props: {
        contrat: { type: Object, required: true },
        isSub: {type: Boolean, default: false}
    },
    data (){
        return {
            showOverlay:true
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
    },
    mounted(){
      
        setTimeout(() => {
            this.showOverlay = false
        }, 800);
    }
}
</script>

<style>

    .ContratcontainerMessage{
        height: 180px;
        background:#0FC286;
        border-left: 15px solid #0C6D4D;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items:center;
        font-weight: bold;
        color: #F0F0F0;
        font-size: 20px;
        opacity: 0;
        transition:  ease-in-out 1.5s;
       
    }
    .activeDefinition{
        opacity: 1;
    }

    .contratLocationBailContainer{
        height: 260px;
        width: 12rem !important;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        padding-top: 10px;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
    }
    .cardImageBailContainer{
        height: 200px;
        width: 100%;
    }
    .cardImageBailContainer img{
        width: 100%;
        height: 100%;
    }
    .footerBailContainer{
        background: #191c22;
        height: 50px;
        width: 100%;
        color: #fff;
        text-align: center;
        font-size: 12px;
        padding: 5px;
         border-left: #f5365c solid;
        border-right: #f5365c solid;
    }
    .list-actions{
        position: absolute;
        top: 5px;
        left: 5px;
        padding: 5px 8px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
    }
        
</style>