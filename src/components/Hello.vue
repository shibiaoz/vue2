// app.vue
<style>
/* test*/
  button {
    color: blue;
  }
</style>

<template>
    <div class="hello">
        11111
        <button type="button" @click="click">{{tips}}</button>      
    </div>
</template>

<script>
export default  {
  name:'hello',
  data () {
    return {
      tips: 'this is a button component'
    }
  },
  methods: {
      click: function () {
          $.ajax({
              url:'{{getTokenApi}}',
              method:'POST',
              dataType:'json',
              success: function (res) {
                  alert(JSON.stringify(res));
              }
          })
      }
  }

}
</script>