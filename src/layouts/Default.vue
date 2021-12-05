<template>
    <div id="app" class="wrapper">
        <app-header />
        <div class="page-wrap">
            <sidebar />
            <div class="main-content">
                <div class="container-fluid">
                    <slot/>
                </div>
            </div>
            <full-features />
            <AppFooter />
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/templates/Header.vue'
import Sidebar from '@/components/templates/Sidebar.vue'
import AppFooter from '@/components/templates/Footer.vue'
import FullFeatures from '@/components/templates/FullFeatures.vue'

import Vue from 'vue'

import PageDescription from '@/components/templates/PageDescription.vue'
import BtnAdd from '@/components/templates/btn.vue'
import Paginator from '@/components/Paginator.vue'
import PaginatorTop from '@/components/PaginatorTop.vue'
Vue.component('PageDescription', PageDescription)
Vue.component('BtnAdd', BtnAdd)
Vue.component('Paginator', Paginator)
Vue.component('PaginatorTop', PaginatorTop)

import VueRepeater from 'vue-repeater'
import 'vue-repeater/dist/lib/vue-repeater.css'
Vue.component('vue-repeater', VueRepeater)

const php = require('phpjs')

export default {
    name: 'DefaultLayout',
    components: {
        AppHeader, 
        Sidebar,
        AppFooter,
        FullFeatures
    },
    async created() {
        if (php.empty(this.$store.state.user.nom)) {
            let user = storage.get('user') 
            if (php.empty(user)) {
                const token = storage.get('access_token')
                if (token && token != null && token != '') {
                    try {
                        user = await axios.get(`utilisateurs/${token}`).then(response => response.result)
                        storage.set('user', user)
                    } catch (error) {
                         // storage.clear()
                        // this.$router.push({name: 'login'})
                    }
                }
            }
            if (!php.empty(user)) {
                console.log('user',user)
                this.$store.dispatch('user', user)
            }
        }
  	},
    mounted() {
        this.activeSidebarItem()
    },
    updated() {
		this.activeSidebarItem()
        console.log('updqted');
	},
	methods: {
		/**
		 * Marque un item de la sidebar comme etant actif
		 */
		activeSidebarItem() {
			$('#main-menu-navigation *').removeClass('active')
			$('#main-menu-navigation .router-link-exact-active').parent('.nav-item').addClass('active')
		}
	}
}
</script>