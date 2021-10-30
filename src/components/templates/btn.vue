<template>
  <b-button variant="danger" @click="$emit('click')"><i class="fa fa-plus-circle"></i> {{message}}</b-button>
</template>

<script>
export default {
    props: {
        message: {type: "", default: "maisonnier"}
    },
}
</script>

<style scoped>
    button{
     height: 45px; 
     width: auto; 
     border-radius: 5px; 
     font-weight: bold; 
     border: none;
     transition: .3s ease;
     box-shadow: 0 5px 12px rgba(59, 41, 41, 0.089);
    }
    button:hover{
      transform: scale(1.03);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.199);
    }
</style>