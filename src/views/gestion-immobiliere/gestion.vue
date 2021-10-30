<template>
    <div >
        <page-description :path="[{label: 'Mes annonces', route: 'annonces'}, {label: 'Mes occupations', route: 'occupations'}, {label: 'Mes habitants', route: 'habitants'}]" />
        <annonces v-if="path == ''" />
        <router-view />
    </div>
</template>

<script>
import Annonces from './annonces/Annonces.vue'
export default {
    components : {
        Annonces
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