<template>
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-12">
                <div class="page-header-title">
                    <i :class="'fa fa-'+icon+' bg-red'"></i>
                    <div class="d-inline">
                        <h5>{{ title }}</h5>
                        <span>{{ description }}</span>
                    </div>
                </div>
            </div>
            <!--<div class="col-lg-4">
                <nav class="breadcrumb-container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><b-link :to="{name: 'home'}"><i class="ik ik-home"></i></b-link></li>
                        <li class="breadcrumb-item" v-for="(p, i) in path" :key="i"><b-link href="#" onclick="return false">{{ p }}</b-link></li>
                    </ol>
                </nav>
            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        icon: {type: String, default: 'file-alt'},
        path: {type: Array, default: []}
    }
}
</script>

<style>

</style>
