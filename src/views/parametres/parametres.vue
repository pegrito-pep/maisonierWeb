<template>
    <div >
        <page-description :path="[{label: $t('data.sidebar_preferences'), route: 'preferences',}, {label: $t('data.sidebar_formules_dutilisation'), route: 'packs'}]" />
        <Preferences v-if=" path == ''" />
        <router-view v-else />
    </div>
</template>

<script>
import Preferences from './preferences.vue'
export default {
    components : {
        Preferences
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
            this.path = this.$route.path.replace('/parametres', '')
        }
    }
}
</script>

<style>
</style>