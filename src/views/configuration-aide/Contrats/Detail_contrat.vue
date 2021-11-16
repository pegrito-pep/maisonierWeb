<template>
  <div>
        <div class="well-display" style="height: 130em;">
            <vue-editor :disabled="true" :editorToolbar="customToolbar" v-model="contrat.contenu" style="height: 120em;"></vue-editor>
        </div>
  </div>
</template>

<script>


import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,

  },
  props: {
    contrat: { type: Object, required: true },
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

  },
  methods: {

  },
};
</script>

<style scoped>

</style>