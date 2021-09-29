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
import Paginator from '@/components/Paginator.vue'
Vue.component('PageDescription', PageDescription)
Vue.component('Paginator', Paginator)

import VueRepeater from 'vue-repeater'
import 'vue-repeater/dist/lib/vue-repeater.css'
Vue.component('vue-repeater', VueRepeater)

export default {
    name: 'DefaultLayout',
    components: {
        AppHeader, 
        Sidebar,
        AppFooter,
        FullFeatures
    },
    created() {
        const token = storage.get('access_token')
        if (token && token != null && token != '') {
            axios.get(`utilisateurs/${token}`).then(response => response.result).then(user => {
                this.$store.dispatch('user', user)
            }).catch(error => {
                storage.clear()
                this.$router.push({name: 'login'})
            })
        }
  	},
    mounted() {
        this.activeSidebarItem()
    },
    updated() {
		this.activeSidebarItem()
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