<template>
    <div >
        <page-description :path="[{label: $t('data.locations_mes_habitants'), route: 'habitants'}, {label: $t('data.locations_Insolvables'), route: 'insolvables'}]" />
        <Habitants v-if="path == ''" />
        <router-view v-else />
    </div>
</template>

<script>
import Habitants from '../gestion-immobiliere/habitants/Habitants.vue'
export default {
    components : {
        Habitants
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
            this.path = this.$route.path.replace('/locations', '')
        }
    }
}
</script>

<style>
</style>