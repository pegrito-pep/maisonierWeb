<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'logements'}" @click.prevent="section = 'logements'">{{$t('data.batiment_detail_logements')}}</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-logement'}" @click.prevent="section = 'add-logement'">{{$t('data.batiment_detail_ajouter_logement')}}</a></li>
            <!--<li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'depenses'}" @click.prevent="section = 'depenses'">{{$t('data.batiment_detail_depenses_batiment')}}</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-depense'}" @click.prevent="section = 'add-depense'">{{$t('data.batiment_detail_ajouter_depense')}}</a></li>-->
            <li class="nav-item">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link"
                :class="{ active: section == 'depenses' || section == 'add-depense' }"
                @click.prevent="section = 'depenses'"
                >{{$t('data.logement_detail_depenses')}}</a
                >
            </li>
        </ul>
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active">
                <div v-if="section == 'logements'">
                    <b-alert variant="info" show v-if="!batiment.logements.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">{{$t('data.batiment_detail_pas_de_logements')}}</span>
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
                    <add-logement :batiment="batiment"  @logementAdded="addedLogement" :action='action'/>
                </div>

                <!--<div v-if="section == 'depenses'">
                    <b-alert variant="info" show v-if="!batiment.depenses.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">{{$t('data.batiment_detail_pas_de_depenses')}}</span>
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
                    </div>
                </div> 
                <div v-show="section == 'add-depense'">
                        <depense-form :batiment="batiment"  @depenseAdded="addedDepense" :provenance="provenance"/>
                </div> --> 
            <b-container v-if="section == 'depenses' || section == 'add-depense'">
                <div v-if="section == 'depenses'">
                    <div class="d-flex justify-content-between border-bottom pb-1 mb-2">
                    <div>
                        <paginator
                        v-if="batiment.depenses.length"
                        no-control
                        :total="batiment.depenses.length"
                        :limit="perPage"
                        :page="currentPage"
                        @pageChanged="
                            (page) => {
                            currentPage = page;
                            }
                        "
                        @limitChanged="
                            (limit) => {
                            perPage = limit;
                            }
                        "
                        />
                    </div>
                    <b-button
                        size="sm"
                        variant="outline-secondary"
                        @click.prevent="section = 'add-depense'"
                        >{{$t('data.logement_detail_ajouter_depense')}}</b-button
                    >
                    </div>
                    <b-alert variant="info" show v-if="!batiment.depenses.length">
                    <i class="fa fa-exclamation-triangle fa-3x float-left"></i>
                    <span class="h4 d-inline-flex ml-2"
                        > {{$t('data.logement_detail_pas_de_depense')}} </span
                    >
                    </b-alert>
                    <div v-else style="height: 75vh">
                    <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                        <b-row class="layout-wrap">
                        <div
                            v-for="(depense, i) in itemsDepenses"
                            :key="depense.idDepense || i"
                            class="col-12 list-item list-item-thumb"
                        >
                            <depense
                            @deleted="removeDepense"
                            :depense="depense"
                            :source="source"
                            is-sub
                            />
                        </div>
                        </b-row>
                    </div>
                    </div>
                </div>
                <div v-show="section == 'add-depense'">
                    <depense-form
                    :batiment="batiment"
                    @cancel="section = 'depenses'"
                    @depenseAdded="addedDepense"
                    :provenance="provenance"
                    :action="action"
                    />
                </div>
            </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import Logement from '@/components/_patrimoine/Logement.vue'
import Depense from "@/views/gestion-immobiliere/depenses/Depense.vue";
import DepenseForm from "@/views/gestion-immobiliere/depenses/DepenseForm.vue";
import AddLogement from "@/views/logements/LogementForm.vue";


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
        source: 3,
        provenance:"2",
        action:'add'
    }),
   mounted() {
    },
    methods: {
              /**
         * réponse à l'évènement d'ajout d'une dépense
         * dans le détail du batiment, la réponse consiste juste à mettre à jour la liste des dépenses du batiment
         */
         addedDepense() {
            axios.get(`batiments/${this.batiment.idBatiment}/depenses`).then(response => response.result || []).then(depenses => {
                this.batiment.depenses = depenses
                this.section = 'depenses'
            })
        },
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
