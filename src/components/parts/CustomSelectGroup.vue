<template>
    <b-form-group :label="label" :description="description">
        <b-form-select @input="(data) => { $emit('input', data) }" v-model="val" :options="options" />
    </b-form-group>
</template>

<script>

export default {
    name: 'CustomSelectGroup',

    props: {
        label: { 
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
        },
        value: {
            type: [String, Number],
            required: true,
        },
        options: {
            type: Array, default: [],
        }
    },
    data: () => ({
        val: null
    }),
    mounted: () => {
        this.val = JSON.parse(JSON.stringify(this.value))
    },

}

</script>

<style scoped>

</style>
