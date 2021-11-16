<template>
  <div>
        <div class="well-display" style="height: 130em;">
            <printer :display="true"  v-model="print" @input="print = false" id="printer-contrat">
                <vue-editor :disabled="true" :editorToolbar="customToolbar" v-model="occupation.contrat.contenu" style="height: 120em;"></vue-editor>
            </printer>
           
            <div class="float-right">
                 <b-button variant="outline-primary" v-b-tooltip.top="'Imprimer'" @click.prevent="setPrint" class="mt-4"><i class="fas fa-print"></i>Imprimer</b-button>
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