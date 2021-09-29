<template>
	<component :is="layout">
    <vue-page-transition name="fade-in-right">
      <router-view/>
    </vue-page-transition>
	</component>
</template>

<script>
const DEFAULT_LAYOUT = 'default'

import Vue from 'vue'

import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)

export default {
  name: 'App',
  computed: {
	  layout() {
		  return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout'
	  }
  },
  mounted() {
	  initTemplateScript(window, document, jQuery)
  },
  updated() {
    //alert('s')
	  //initTemplateScript(window, document, jQuery)
  },
}
</script>