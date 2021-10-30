<template>
    <div >
        <page-description :path="[{label: 'indexes', route: 'indexes',}, {label: 'Loyers', route: 'loyers',}]" />
        <Indexes v-if=" path == ''" />
        <router-view v-else />
    </div>
</template>

<script>
import Indexes from './Indexes.vue'
export default {
    components : {
        Indexes
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
            this.path = this.$route.path.replace('/finances', '')
        }
    }
}
</script>

<style>
</style>