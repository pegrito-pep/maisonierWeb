<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'logements'}" @click.prevent="section = 'logements'">Logements</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'stats'}" @click.prevent="section = 'stats'">Statistiques générales</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-logement'}" @click.prevent="section = 'add-logement'">Ajouter un logement</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'depenses'}" @click.prevent="section = 'depenses'">Dépenses liées au batiment</a></li>
        </ul>
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active">
                <div v-if="section == 'stats'" class="jumbotron pt-10 pb-10">
                    <h3 class="m-0">Statistiques générales</h3>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                </div>

                <div v-if="section == 'logements'">
                    <b-alert variant="info" show v-if="!batiment.logements.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">Aucun logement enregistré pour le moment</span>
                    </b-alert>   
                    <div v-else style="height: 75vh;">
                        <paginator no-control hr="bottom" :total="batiment.logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(logement, i) in items" :key="logement.idLogement || i" cols="6">
                                    <logement @deleted="removeLogement" :logement="logement" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                    </div>       
                </div> 

                <div v-show="section == 'add-logement'">
                    <add-logement :batiment="batiment"  @logementAdded="addedLogement" />
                </div>

                <div v-if="section == 'depenses'">
                    <b-alert variant="info" show v-if="!batiment.depenses.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">Aucune dépense enregistrée pour le moment</span>
                    </b-alert>   
                    <div v-if="batiment.depenses.length>0" style="height: 75vh;">
                        <b-row>
                            <paginator no-control hr="bottom" :total="batiment.depenses.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />   
                        </b-row>                     
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(depense, i) in itemsDepenses" :key="depense.idDepense || i" cols="6">
                                    <depense @deleted="removeDepense" :depense="depense" :source="source" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                        <depense-form @depenseAdded="pushDepense"  v-if="commandeDepense" :action="action" :batiment="batiment" @closeDepenseModal="onCloseSet" />   
                    </div>
                    <div>
                        <b-button variant="danger" @click.prevent="defineDepense" v-b-modal.modal-lg>
                            <i class="fa fa-plus-circle"></i> Nouvelle dépense
                        </b-button> 
                    </div>    
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import Logement from '@/components/_patrimoine/Logement.vue'
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
import AddLogement from "@/views/logements/AddLogement.vue";


const php = require('phpjs')

export default {
    props: {
        batiment: {type: Object, required: true}
    },
    components: {
        Logement,
        Depense,
        DepenseForm,
        AddLogement
    },
    computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() {
            return php.array_slice(this.batiment.logements, this.offset, this.perPage)
        },
         itemsDepenses(){
             return php.array_slice(this.batiment.depenses || [], this.offset, this.perPage)
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        section: 'logements',
        submitted: false,

        //données manipulées pour l'ajout d'une dépense
        commandeDepense: false,
        action: "",
        currentPage: 1,
        perPage: 10,
        source: 3
    }),
   mounted() {
    },
    methods: {
        addedLogement() {
            axios.get(`batiments/${this.batiment.idBatiment}/logements`).then(response => response.result || []).then(logements => {
                this.batiment.logements = logements
                this.section = 'logements'
            })
        },

        pushDepense(newDepense) {
            this.batiment.depenses.unshift(newDepense);
            this.commandeDepense =false;
        },
       
        /**
         * Retire un logement
         */
        removeLogement(idLogement) {
            this.batiment.logements = this.batiment.logements.filter(elt => elt.idLogement != idLogement)
            this.$emit('logementsChanged', this.batiment.logements)
        },
        /**
         * supprimer une dépense
         * ceci à pour but de  la marquer comme traitée en back
         */
        removeDepense(idDepense) {
            this.batiment.depenses = this.batiment.depenses.filter(elt => elt.idDepense != idDepense)
            this.$emit('depensesChanged', this.batiment.depenses)
        },
        /**
         *traitement de l'appel à l'ajout d'une dépense dans le détail d'un batiment
         */
        defineDepense(){
            this.action="add",
            this.commandeDepense=true;
        },
        onCloseSet() {
            this.commandeDepense = false;
        }
    }
}
</script>
