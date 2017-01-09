<style>
    .red {
        color: #f00;
    }
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                msg: 'Hello App!'
            }
        }
    }
</script>