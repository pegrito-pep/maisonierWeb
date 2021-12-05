<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'rubriques'}" @click.prevent="section = 'rubriques'">{{$t('data.article_details_article_rubrique')}}</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'add-rubriques'}" @click.prevent="section = 'add-rubriques'">{{$t('data.article_details_article_ajouter_rubrique')}}</a></li>
        </ul>
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active">
                <div v-if="section == 'rubriques'">
                    <b-alert variant="info" show v-if="!article.rubriques.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">{{$t('data.article_details_article_pas_de_rubrique')}}</span>
                    </b-alert>   
                    <div v-else style="height: 75vh;">
                        <paginator no-control hr="bottom" :total="article.rubriques.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(rubrique, i) in items" :key="rubrique.idRubrique || i" cols="6">
                                    <rubriques @deleted="removeRubrique" :rubrique="rubrique" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                    </div>       
                </div> 
                <div v-show="section == 'add-rubriques'">
                    <div :id="repeaterId" style="height: 75vh;">
                        <div class="d-flex flex-column justify-content-between" style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <div data-repeater-list="group"><b-row data-repeater-item>
                                <b-col cols="12" md="6" lg="6">
                                    <b-form-group :label="$t('data.article_details_article_rubrique_description')">
                                        <b-form-textarea
                                        class="mb-2"
                                        :placeholder="$t('data.article_details_article_rubrique_description_exemple')"
                                        rows="8"
                                        name="description"
                                        ></b-form-textarea>
                                    </b-form-group>
                                <!--<b-form-group label="Description de la rubrique">
                                    <b-form-input name="description" placeholder="Ils ne pourront être utilisé même temporairement à d'autres usages que celui ainsi arrêté sous peine de résiliation de plein droit de bail, suivi d'un délaissement immédiat à la première demande du bailleur ." trim></b-form-input>
                                </b-form-group>-->
                                </b-col>
                                <b-col md="4" lg="4">
                                    <b-form-group label="A t'elle une valeur ?">
                                            <div class="form-radio">
                                                <form>
                                                    <div class="radio radio-outline radio-inline">
                                                        <label>
                                                            <input type="radio"  name="valeur" checked="checked">
                                                            <i class="helper"></i>{{$t("data.article_details_article_rubrique_avoir_valeur_oui")}}
                                                        </label>
                                                    </div>
                                                    <div class="radio radio-outline radio-inline">
                                                        <label>
                                                            <input type="radio" name="valeur">
                                                            <i class="helper"></i>{{$t("data.article_details_article_rubrique_avoir_valeur_non")}}
                                                        </label>
                                                    </div>
                                                </form>
                                            </div>
                                        </b-form-group>
                                </b-col>
                                <b-col><b-form-group label="Action">
                                    <b-button data-repeater-delete variant="outline-danger"><i class="fa fa-times"></i></b-button>
                                </b-form-group></b-col>
                            </b-row></div>
                        </div>
                        <div class="d-flex justify-content-end align-items-center mt-5">
                            <b-button variant="outline-primary" data-repeater-create>{{$t('data.article_details_article_ajouter_element')}}</b-button>
                            <b-button variant="danger" @click="addRubriques" class="ml-2" :disabled="submitted">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small /></b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rubriques from '@/components/_configuration-aide/Rubrique.vue'
const php = require('phpjs')

export default {
    props: {
        article: {type: Object, required: true}
    },
    components: {
        Rubriques
    },
    computed: {
        repeaterId() {
            return `repeat-added-batiment-form-${this.article.idArticle}`
        },
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() {
            return php.array_slice(this.article.rubriques, this.offset, this.perPage)
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    data: () => ({
        section: 'add-rubriques',
        submitted: false,
        valeur:false,
         options: [
          { text: 'Oui', value: 'true' },
          { text: 'Non', value: 'false' },
        ],
        currentPage: 1,
        perPage: 10,
    }),
   mounted() {
        this.section =  'rubriques'
        console.log(this.section)
        this.makeRepeater()
    },
    methods: {
        makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({
                    isFirstItemUndeletable: true
                })
            }, 500);
        },

        addRubriques() {
            let rubriques = $(`#${this.repeaterId}`).repeaterVal().group
            console.log(rubriques)
            if (php.empty(rubriques[0].description) || php.empty(rubriques[0].valeur)) {
                return App.error('Vous devez remplir au moins les informations de la première rubrique')
            }
            this.submitted = true
            console.log("rubrique", rubriques)
            axios.post('rubriques', {rubriques, idArticle: this.article.idArticle}).then(response => {
                this.submitted = false

                if (!response.success) {
                    return App.alertError(response.message)
                }
                this.article.rubriques.push(...response.result)
                this.$emit('rubriquesChanged', this.article.rubriques)
                this.section = 'rubriques'
                if (!response.result.length) {
                    return App.notif('Aucune rubrique rajouté', {})
                }
                storage.set('articles',null);
                return App.notifySuccess(response.message)
            })
        },
        /**
         * Retire un batiment
         */
        removeBatiment(idBatiment) {
            this.cite.batiments = this.cite.batiments.filter(elt => elt.idBatiment != idBatiment)
            this.$emit('batimentsChanged', this.cite.batiments)
        }
    }
}
</script>

<style>


</style>