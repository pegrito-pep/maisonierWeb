<template>
    <footer class="footer" style="background:#F6F7FB;border:none;">
        <div class="w-100 clearfix" style="background:transparent">
            <span style="color:#BDBDBD;font-size:.7rem">Copyright © {{annee}} By Flysoft engineering | All Rights Reserved.</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data: ()=>{
        return {
            annee:0,
        }
        
    },
    
    methods: {
        updateDate(){
           let date = new Date()
           let exact = 2000 + date.getYear() - 100
           this.annee = exact
           
        },
    },
    mounted() {
        this.updateDate()
    }
}
</script>