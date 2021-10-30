<template>
    <div class="tab-container">
        <div class="first">
            <i class="ik ik-command"></i>
            <span>Navigation rapide</span>
        </div>
        <div class="tabs">
            <div>
                <b-link class="tab-item" v-for="(p, i) in path" :key="i" :to="{name: p.route}">{{ p.label}}</b-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        path: {type: Array, default: []}
    }, 
    data: () => ({
        premier: 0,
        temoin:''
    }), 

    methods: {
    },
    mounted() {
    },
}
</script>

<style scoped>
    .tab-container{
        margin-bottom: 3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .05);
    }
    .tabs{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: calc(100% - 200px);
        height: 50px;
        background: #f5365c;
    }
    .tabs > div{
        padding-top: .3rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 45px;
        background: #191c22;
    }
    .tab-item{
        padding-top: .3rem;
        box-sizing: border-box;
        font-weight: 800;
        padding: 10px 20px;
        height: 100%;
        background: #191c22;
        border-radius: 5px 5px 0 0;
        color: white;
    }
    
    /*.tabs > div a:nth-child(2){
        background: #f5365c;
    }*/
    .router-link-exact-active{
        background: #f5365c;
    }
    .first{
        padding-left: .8rem;
        display: flex;
        align-items: center;
        height: 100%;
        width: 200px;
        font-weight: 700;
        border-radius: 8px 0 0 8px;
        color: #f5365c;
        background: white;
    }
    .first span{
        font-size: 1.2em;
    }
    .first i{
        margin-right: 5px;
        font-size: 1.2em;
    }
    @media only screen and (max-width:600px){
        .tab-container{
            margin-bottom: 1rem;
        }
        .tabs > div{
            white-space: nowrap;
            overflow: auto;
        }
        .first{
            padding-left: .5rem;
            height: 100%;
            width: 150px;
        }
        .first span{
            font-size: 1em;
        }
        .first i{
            margin-right: 5px;
            font-size: 1em;
        }
        .tabs{
            width: calc(100% - 150px);
        }
    }
</style>