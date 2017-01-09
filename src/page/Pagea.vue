// app.vue
<style>
    .pagea {
        color: #f00;
    }
</style>
<template>
   <div class="pagea">
       {{msg}}
       <router-link to="/pagea">
            <button>pagea</button>
        </router-link>

        <router-link to="/pageb">
            <button>pageb</button>
        </router-link>
   </div>
</template>
<script>
    import Hello from '../components/Hello.vue';
    export default {
        name: 'Pagea',
        data() {
            return {
                msg: 'pagea!!!'
            }
        },
        components: {
            Hello
        }
    }
</script>