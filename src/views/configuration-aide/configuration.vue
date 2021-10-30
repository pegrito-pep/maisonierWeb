<template>
    <div >
        <page-description :path="[ {label: 'Mes articles et rubriques', route: 'articles'}, {label: 'Templates de  contrat', route: 'contrat'}, {label: 'Documentation', route: 'boum'}]" />
        <Article v-show="path == ''" />
        <router-view />
    </div>
</template>

<script>
import Article from './article.vue'
export default {
    components : {
        Article
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
        console.log('fgff');
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