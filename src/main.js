
import Vue from 'vue'
import './plugins/fluid-storage'
import './plugins/bootstrap-vue'
//import './plugins/pij'
import './plugins/axios'
import './plugins/dayjs'
import './plugins/helpers'

//import './plugins/custom/files-url'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//global registration
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

Vue.config.productionTip = true

import Default from './layouts/Default.vue'
import Empty from './layouts/Empty.vue'

Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)

import VueGeolocation from 'vue-browser-geolocation'
Vue.use(VueGeolocation)

import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
Vue.component('img-inputer', ImgInputer)



import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: { key: 'AIzaSyB4wnGV-GeVMiv-_yT2qO_iKyaM_bMGX7w' }
})


new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')