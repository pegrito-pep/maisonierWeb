<template>
    <div>
        <hr v-if="hr === 'top'">
        <div class="d-flex align-items-center">
            <div v-if="noControl === false">
                <span class="font-weight-bold h6">{{$t('data.pagination_affichage_de')}} {{ offset + 1 }} - {{ last }} {{$t('data.pagination_de')}} <span class="font-weight-bolder">{{ total }} {{ libelle }} </span></span>
                <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ limit }} <i class="ik ik-chevron-down mr-0 align-middle"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a v-for="i in [5, 10, 15, 20, 25]" @click.prevent="changeLimit(i)" :key="i" class="dropdown-item" href="#">{{ i }}</a>
                </div>
            </div>
            <!--<b-pagination @input="(page) => {$emit('pageChanged', page)}" v-model="current" :total-rows="total" :per-page="limiter" ></b-pagination>-->
        </div>
        <hr v-if="hr === 'bottom'" class="mt-0">
    </div>
</template>

<script>
export default {
    props: {
        total: {type: Number, required: true},
        limit: {type: Number, default: 20},
        offset: {type: Number, default: 0},
        page: {type:Number, default: 1},
        hr: {type:[String, Boolean], default: false},
        libelle: {type:[String, Boolean], default: 'élements'},
        noControl: {type:Boolean, default: false},
    },
    data: () => ({
        limiter: 20,
        current: 1
    }),
    mounted() {
        this.limiter = this.limit
        this.current = this.page
    },
    computed: {
        last() {
            const last = this.offset + this.limiter
            if (last > this.total) {
                return this.total
            }
            return last
        }
    },
    methods: {
        changeLimit(val) {
            this.limiter = val 
            this.$emit('limitChanged', val)
        }
    }
}
</script>

<style>

</style>