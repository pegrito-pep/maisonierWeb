<template>
    <div >
        <page-description :path="[{label: $t('data.configuration_contrats'), route: 'contrats',}, {label: $t('data.configuration_documentation'), route: 'doc',}]" />
        <Contrats v-if=" path == ''" />
        <router-view v-else />
    </div>
</template>

<script>

import Contrats from '@/views/configuration-aide/Contrats/Contrats.vue'

export default {
    components : {
        Contrats
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
            this.path = this.$route.path.replace('/configuration', '')
        }
    }
}
</script>

<style>
</style>