<template>
  <div>
        <b-alert variant="info" class="text-center" show v-if="!occupation.contrat">
            <i class="fa fa-exclamation-triangle fa-3x"></i>
            <br />
            <span class="h4 d-inline-flex ml-2">{{$t('data.contratoccupation_aucun_contrat_pour_occupation')}}</span>
          </b-alert>
        <div class="well-display" style="height: 130em;" v-else>
            <printer :display="true"  v-model="print" @input="print = false" id="printer-contrat">
                <vue-editor :disabled="true" :editorToolbar="customToolbar" v-model="occupation.contrat.contenu" style="height: 120em;"></vue-editor>
            </printer>
           
            <div class="float-right">
                 <b-button variant="outline-primary" v-b-tooltip.top="$t('data.contratoccupation_imprimer')" @click.prevent="setPrint" class="mt-4"><i class="fas fa-print"></i>{{$t('data.contratoccupation_imprimer')}}</b-button>
            </div>
            <!--<div class="float-right position-relative">
                <b-button variant="outline-primary display-print-button" v-b-tooltip.top="'Imprimer'" @click.prevent="setPrint"><i class="fas fa-print"></i></b-button>
            </div>-->
            
        </div>
  </div>
</template>

<script>


import { VueEditor } from "vue2-editor";
import Printer from '@/components/PrinterContrat.vue'
export default {
  components: {
    VueEditor,
    Printer
  },
  props: {
    occupation: { type: Object, required: true },
  },
  data: () => ({
    print:false,
    customToolbar: [
        [],
      ]
  }),
  computed: {

  },
  mounted() {
   //this.content=this.occupation.contrat.content;
  },
  methods: {
    setPrint(){
        this.print=true;
    }
  },
};
</script>

<style scoped>
    .display-print-button{
         position:absolute;
         right:4em;
    }

</style>