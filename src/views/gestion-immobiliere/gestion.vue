<template>
    <div>
        <page-description :path="[{label: 'Mes annonces', route: 'annonces'}, {label: 'Mes occupations', route: 'occupations'},]" />
        <annonces v-if="path == ''" />
        <router-view v-else />
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