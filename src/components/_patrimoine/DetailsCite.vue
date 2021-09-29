<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'batiments'}" @click.prevent="section = 'batiments'">Batiments</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'stats'}" @click.prevent="section = 'stats'">Statistiques générales</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-batiments'}" @click.prevent="section = 'add-batiments'">Ajouter des bâtiments</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'depenses'}" @click.prevent="section = 'depenses'">Dépenses liées à la cité</a></li>
        </ul>
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active">
                <div v-if="section == 'stats'" class="jumbotron pt-10 pb-10">
                    <h3 class="m-0">Statistiques générales</h3>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                </div>
                <div v-if="section == 'batiments'">
                    <b-alert variant="info" show v-if="!cite.batiments.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">Aucun bâtiment enregistré pour le moment</span>
                    </b-alert>   
                    <div v-else style="height: 75vh;">
                        <paginator no-control hr="bottom" :total="cite.batiments.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(batiment, i) in items" :key="batiment.idBatiment || i" cols="6">
                                    <batiment @deleted="removeBatiment" :batiment="batiment" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                    </div>       
                </div> 
                <div v-show="section == 'add-batiments'">
                    <div :id="repeaterId" style="height: 75vh;">
                        <div class="d-flex flex-column justify-content-between" style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <div data-repeater-list="group"><b-row data-repeater-item>
                                <b-col cols="12" md="6" lg="6"><b-form-group label="Nom du batiment">
                                    <b-form-input name="nom" placeholder="Ex: Batiment 1" trim></b-form-input>
                                </b-form-group></b-col>
                                <b-col md="4" lg="4"><b-form-group label="Reference">
                                    <b-form-input name="ref" placeholder="Ex: B1" trim></b-form-input>
                                </b-form-group></b-col>
                                <b-col><b-form-group label="Action">
                                    <b-button data-repeater-delete variant="outline-danger"><i class="fa fa-times"></i></b-button>
                                </b-form-group></b-col>
                            </b-row></div>
                        </div>
                        <div class="d-flex justify-content-end align-items-center mt-5">
                            <b-button variant="outline-primary" data-repeater-create>Ajouter un élément</b-button>
                            <b-button variant="danger" @click="addBatiments" class="ml-2" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
                        </div>
                    </div>
                </div>
                <div v-if="section == 'depenses'">
                    <b-alert variant="info" show v-if="!cite.depenses.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">Aucune dépense enregistrée pour le moment</span>
                    </b-alert>   
                    <div v-if="cite.depenses.length>0" style="height: 75vh;">
                        <b-row>
                            <paginator no-control hr="bottom" :total="cite.depenses.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />   
                        </b-row>   
                        <!--<paginator no-control hr="bottom" :total="cite.depenses.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />-->                   
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(depense, i) in itemsDepenses" :key="depense.idDepense || i" cols="6">
                                    <depense @deleted="removeDepense" :depense="depense" :source="source" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                        <depense-form @depenseAdded="pushDepense"  v-if="commandeDepense" :action="action" :cite="cite" @closeDepenseModal="onCloseSet" />   
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
import Batiment from '@/components/_patrimoine/Batiment.vue'
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
const php = require('phpjs')

export default {
    props: {
        cite: {type: Object, required: true}
    },
    components: {
        Batiment,
        Depense,
        DepenseForm
    },
    computed: {
        repeaterId() {
            return `repeat-added-batiment-form-${this.cite.idCite}`
        },
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() {
            return php.array_slice(this.cite.batiments || [], this.offset, this.perPage)
        },
        itemsDepenses(){
             return php.array_slice(this.cite.depenses || [], this.offset, this.perPage)
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        section: 'add-batiments',
        submitted: false,

        currentPage: 1,
        perPage: 10,
        source:1,
        
        //données manipulées pour l'ajout d'une dépense
        commandeDepense:false,
        action:""
    }),
   mounted() {
        this.section =  'batiments'
        this.makeRepeater()
    },
    methods: {
        pushDepense(newDepense) {
            this.cite.depenses.unshift(newDepense);
            this.commandeDepense =false;
        },

        makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({
                    isFirstItemUndeletable: true
                })
            }, 500);
        },

        addBatiments() {
            let batiments = $(`#${this.repeaterId}`).repeaterVal().group
            if (php.empty(batiments[0].nom) || php.empty(batiments[0].ref)) {
                return App.error('Vous devez remplir au moins les informations du premier batiment')
            }
            this.submitted = true

            axios.post('batiments', {batiments, idCite: this.cite.idCite}).then(response => {
                this.submitted = false

                if (!response.success) {
                    return App.alertError(response.message)
                }
                this.cite.batiments.push(...response.result)
                this.$emit('batimentsChanged', this.cite.batiments)
                this.section = 'batiments'
                if (!response.result.length) {
                    return App.notif('Aucun batiment rajouté', {})
                }
                return App.notifySuccess(response.message)
            })
        },
        /**
         * Retire un batiment
         */
        removeBatiment(idBatiment) {
            this.cite.batiments = this.cite.batiments.filter(elt => elt.idBatiment != idBatiment)
            this.$emit('batimentsChanged', this.cite.batiments)
        },
         /**
         * supprimer une dépense
         * ceci à pour but de  la marquer comme traitée en back
         */
        removeDepense(idDepense) {
            this.cite.depenses = this.cite.depenses.filter(elt => elt.idDepense != idDepense)
            this.$emit('depensesChanged', this.cite.depenses)
        },
        /**
         *traitement de l'appel à l'ajout d'une dépense dans le détail de la cité
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

<style>

</style>