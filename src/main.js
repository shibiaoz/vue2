// main.js
var Vue = require('vue/dist/vue.min.js');
var App = require('./app.vue');
var VueRouter = require('vue-router');
var router = require('./router.js');
var request = require('superagent');
Vue.use(VueRouter);
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#wraper')