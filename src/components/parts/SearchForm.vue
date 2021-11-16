<template>
    <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
        <form action="" onSubmit="return false">
            <b-form-input type="text" :placeholder="placeholder" @input="(data) => { $emit('input', data) }" style="height: 40px; width: 350px; border-radius: 5px;" v-model="val" />
            <button type="submit" class="btn btn-icon" style="height: 40px; width:50px;"><i class="ik ik-search"></i></button>
        </form>
    </div>
</template>


<script>

export default {
    name: "SearchForm",
    props: {
        placeholder: { type: String, default: "Rechercher..."},
        value: { required: true, default: ""},
    },
    data: () => ({
        val: null,
    }),
    mounted() {
        this.val = this.value
    }
}
</script>

<style scoped>

</style>
