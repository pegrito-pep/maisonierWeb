<template>
    <div >
        <page-description :path="[{label: 'Mes cités', route: 'cites',}, {label: 'Mes batiments', route: 'batiments',}, {label: 'Mes logements', route: 'logements',}]" />
        <Cites v-if=" path == ''" />
        <router-view v-else />
    </div>
</template>

<script>
import Cites from './Cites.vue'
export default {
    components : {
        Cites
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
            this.path = this.$route.path.replace('/patrimoine', '')
        }
    }
}
</script>

<style>
</style>