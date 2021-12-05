<template>
    <b-modal
      id="modal-prevent-closing"
      ref="load-csv-modal"
      :title="$t('data.loadcsv_modal_title')"
      @show="resetModal"
      @hidden="resetModal"
    >
        <b-overlay :show="showOverlay" rounded="sm">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <div class="form-group">
                        <label></label>
                        <b-form-select{{$t('data.loadcsv_label_batiment_associe')}}
                            v-model="idBatiment"
                            :options="tousLesBatiments"
                            class="mb-3"
                            value-field="idBatiment"
                            text-field="nomBatiment"
                            disabled-field="notEnabled"
                        ></b-form-select>
                    </div>
                    <div class="form-group">
                        <label>{{$t('data.loadcsv_label_categorie_associe')}}</label>
                        <b-form-select
                            v-model="idSousType"
                            :options="sousTypesLogements || []"
                            class="mb-3"
                            :class="!requiredSousType ? 'is-red' : ''"
                            value-field="idSousType"
                            text-field="libelleSousType"
                        ></b-form-select>
                        <span v-if="!requiredSousType" style="color:red;">{{$t('data.loadcsv_label_choisir_sous_type')}}</span>
                    </div>
                </form>
        </b-overlay>
        <template #modal-footer>
            <download-excel
                class="btn btn-default"
                :data="dataForExcel"
                type="csv"
                name="fichiermodel.xls"
                :before-finish = "finishDownload">
            
                <b-button class="btn btn-info ml-4"><i class="fa fa-download"></i>{{$t('data.loadcsv_label_telecharger')}}</b-button>
            </download-excel>
    
    </template>
    </b-modal>
</template>
<script>
  import Vue from "vue";
  import JsonExcel from "vue-json-excel";
  Vue.component("downloadExcel", JsonExcel);
export default {
    name:'load-csv_model',
    data:()=>({
        tousLesBatiments:[],
        idBatiment:"",
        sousTypesLogements:[],
        idSousType:"",
        requiredSousType:true,
        showOverlay:true,

    }),
    computed: {
         dataForExcel() {
             return [
                {"ref": '',"description":'',"prixMin":'',"prixMax":'',
                "SousTypeLogement": this.idSousType,
                "batiment":this.idBatiment,
                "pays":'',
                "ville":'',"quartier":'',"lat":'',"lon":'',"nombreChambres":'',"nombreCuisines":'',"nombreDouches":'',"nombreSalons":'', "nombreParkings":''},
                ]
         },
    },
    async beforeMount() {
        await this.getLogementsData()
    },
    methods:{
        //je récupère la liste des sous-types de logements et des batiments
        async getLogementsData(){
            try {
                 this.tousLesBatiments=await axios.get("batiments").then(response => response.result)
            } catch (error) {
                console.log(error);
            }
            try {
                 this.sousTypesLogements = await axios.get("soustypes-logements").then(response => response.result);
            } catch (error) {
                 console.log(error);
            }
            this.showOverlay=false;
        },
        resetModal(){
            this.idBatiment="";
        },
        //methode permettant la gestion et la configuration du fichier modèle

        finishDownload(){
            this.$refs['load-csv-modal'].hide()
        }

    }
}
</script>