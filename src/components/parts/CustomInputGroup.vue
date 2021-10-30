<template>
    <b-form-group :label="label" :description="description">
        <b-form-input :type="type" :min="min" @input="(data) => { $emit('input', data) }" v-model="val" :placeholder="placeholder" trim></b-form-input>
    </b-form-group>
</template>

<script>

export default {
    name: 'CustomInputGroup',

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
        min: {
            type: [String, Number],
        },
        type: { type: String, default: 'text' }
    },
    data: () => ({
        val: null
    }),
    mounted: () => {
        this.val = JSON.parse(JSON.stringify(this.value))
    }
}

</script>

<style scoped>

</style>
