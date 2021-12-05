<template>
    <div >
        <page-description :path="[{label: $t('data.finance_indexes'), route: 'indexes',}, {label: $t('data.sidebar_loyers'), route: 'loyers'}, {label: $t('data.finance_recharges'), route: 'recharges'}]" />
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