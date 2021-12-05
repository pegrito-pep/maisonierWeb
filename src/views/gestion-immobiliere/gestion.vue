  

<template>
    <div>
        <page-description :path="[{label: $t('data.gestion_menu_mes_occupations'), route: 'occupations'}, {label: $t('data.gestion_menu_mes_annonces'), route: 'annonces'},]" />
        <occupations v-if="path == ''" />
        <router-view v-else />
    </div>
</template>

<script>
import Occupations from './Occupations.vue'
export default {
    components : {
        Occupations 
    },
    data: () => ({
        path: ""
    }), 
    created() {
        this.getPath()
    },
    mounted() {
        this.getPath()
    },
    updated() {
        this.getPath()
    },
    methods: {
        getPath() {
            this.path = this.$route.path.replace('/gestion', '')
        }
    }
}
</script>

<style>
</style>