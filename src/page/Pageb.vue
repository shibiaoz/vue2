// app.vue
<style>
    .pageb {
        color: #f00;
    }
</style>
<template>
   <div class="pageb">
       {{msg}}
       <hello></hello>
   </div>
</template>
<script>
    import Hello from '../components/Hello.vue';
    export default {
        name: 'Pageb',
        data() {
            return {
                msg: 'pageb!!!'
            }
        },
        components: {
            Hello
        }
    }
</script>