<template>
    <occupation :occupation="occupation" />
</template>

<script>
import Occupation from './occupations/Occupation.vue'

const php = require('phpjs')

export default {
    data:() =>({
        occupation: {},
    }),
    components: {
        Occupation   
    },
    beforeMount() {
        axios.get(`occupations/${this.$route.params.id}`).then(response => response.result || {}).then(occupation => {
            this.occupation = occupation
        })
    },
}
</script>