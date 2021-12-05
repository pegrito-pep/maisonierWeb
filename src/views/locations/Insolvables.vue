<template>
    <div class="container-fluid">
        <!--page header start -->
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <div class="collapse d-md-block display-options" id="displayOptions">               
                        <div class="d-block d-md-inline-block">
                            <SearchForm v-model="search" />
                        </div>
                         <div class="float-md-right d-flex">
                            <paginatorTop :offset="offset" :libelle='$t("data.insolvables")' :total="insolvables.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" class="mr-2 d-flex justify-content-center align-items-center" /> 
                            <btnAdd v-if="canCreateHabitant"  :message="$t('data.habitant_form_ajouter_habitant')" v-b-modal.habitantForm ref="buttonAdd"/>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>
                <b-overlay :show="showOverlay" rounded="sm">
                    <b-alert variant="info" class="text-center" show v-if="!insolvables.length">
                        <i class="fa fa-exclamation-triangle fa-3x"></i> <br>
                        <span class="h4 d-inline-flex ml-2">{{$t('data.ionsolvable_pas_de_insolvable')}}</span>
                    </b-alert> 
                    <b-row v-else>
                        <b-col cols="12" md="3" lg="4" v-for="({habitant, impayerTotal, impayerLoyer, impayerEau, impayerEnergie, impayerCharges}, i) in items" :key="habitant.idLocataire || i">
                            <b-card>
                                <b-row>
                                <b-col sm="auto" class="pr-0">
                                    <b-avatar :src="habitant.avatar" size="6em" />
                                </b-col>
                                <b-col>
                                    <h5 class="text-center">{{ habitant.nomLocataire + ' ' + habitant.prenomLocataire }}</h5>
                                    <h6 class="text-center text-muted">{{ habitant.tel }}</h6>
                                    <h6 v-if="habitant.cniLocataire!=null&&habitant.cniLocataire!=''" class="text-center small text-muted mb-15">{{ habitant.cniLocataire }}<span v-if="habitant.profession!=null&&habitant.profession!=''"></span> / {{ habitant.profession }}</h6>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <hr>
                                    <dl class="row">
                                        <dd class="col-5 my-1">{{$t('data.occupation_informations_loyer')}}</dd><dt class="col-7 my-1">{{ impayerLoyer }} F</dt>
                                        <dd class="col-5 my-1">{{$t('data.ionsolvable_en_eau')}}</dd><dt class="col-7 my-1">{{ impayerEau }} F</dt>
                                        <dd class="col-5 my-1">{{$t('data.ionsolvable_en_lumiere')}}</dd><dt class="col-7 my-1">{{ impayerEnergie }} F</dt>
                                        <dd class="col-5 my-1">{{$t('data.ionsolvable_charges_insolvable')}}</dd><dt class="col-7 my-1">{{ impayerCharges }} F</dt>
                                        <dd class="col-5 my-1">{{$t('data.ionsolvable_total_insolvable')}}</dd><dt class="col-7 my-1 text-danger h4">{{ impayerTotal }} F</dt>
                                    </dl>
                                    <!--<b-button :to="{name: 'habitants', query: {target: habitant.idLocataire}}" size="sm" block variant="outline-secondary">{{$t('data.ionsolvable_voir_dossier_locataire')}}</b-button>-->
                                    <b-button @click.prevent="showDetails(habitant)" size="sm" block variant="outline-secondary">{{$t('data.ionsolvable_voir_dossier_locataire')}}</b-button>
                                    
                                </b-col>
                            </b-row>
                            </b-card>
                            
                        </b-col>
                    </b-row>
                    <paginator hr="top" :offset="offset" :total="insolvables.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                </b-overlay>
            </div>
        </div>
               <!-- MODALE POUR AFFICHER LES DETAILS D'UN HABITANT -->
        <div v-if="locataire" class="modal fade edit-layout-modal" id="editLayoutItem" tabindex="-1" role="dialog" aria-labelledby="editLayoutItemLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLayoutItemLabel">{{$t('data.habitant_form_dossier_de')}} <b v-if="locataire.titre=='M'||locataire.titre=='Monsieur'||locataire.titre=='Mr'">M.</b>
                        <b v-if="locataire.titre=='Madamme'||locataire.titre=='Mme'||locataire.titre=='Mlle'">Mme.</b> <b>{{ locataire.nomLocataire }}</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body pt-2">
                        <details-habitant2 :locataire="locataire"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchForm from '../../components/parts/SearchForm.vue'
   import DetailsHabitant2 from '@/views/gestion-immobiliere/habitants/DetailsHabitant2.vue';
const php  = require ( 'phpjs' ) ; 

export default {
  components: { SearchForm,DetailsHabitant2 },
    name: 'Insolvables',
    data: () => ({
        insolvables: [],
        trueInsolvables: [],
        search: null,
        showOverlay: true,
        currentPage: 1,
        perPage: 10,
        //propriétées detail habitant
        locataire:null
    }),

    watch: {
         search(value) {
            this.insolvables = !php.empty(value)
                ? this.trueInsolvables.filter(elt =>
                    elt.habitant.nomLocataire.toLowerCase().includes(value.toLowerCase()) || elt.habitant.tel.toLowerCase().includes(value.toLowerCase())
                )
                : this.trueInsolvables;
        }
    },
     computed: {
        /**
         * Elements affichés avec prise en charge de la pagination
         */
        items() { 
            return php.array_slice(this.insolvables, this.offset, this.perPage) 
        },
        offset() {
            return (this.currentPage * this.perPage) - this.perPage
        }
    },
    beforeMount() {
        this.getInsolvables()
    },
    methods: {
        getInsolvables() {
            axios.get('insolvables').then(response => response.result || []).then(insolvables => {
                this.insolvables = this.trueInsolvables = insolvables
                this.showOverlay = false
                console.log("Insolvables");
                console.log(this.insolvables);
            })
        },
        showDetails(habitant) {
          
            this.locataire = habitant
            console.log('locataire',this.locataire)
            setTimeout(() => {
                $('#editLayoutItem').modal('show')
                $('#editLayoutItem').on('hide.bs.modal', (e) => {
                    this.locataire = null
                })
                $('#editLayoutItem').on('hidden.bs.modal', (e) => {
                    this.locataire = null
                })
            }, 100)          
        },
    }
}
</script>