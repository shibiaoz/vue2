// main.js
// var Vue = require('vue/dist/vue.js');
var Vue = require('vue/dist/vue.js');
var App = require('./app.vue');
var VueRouter = require('vue-router');
var router = require('./router.js');
var $ = require('zepto');
Vue.use(VueRouter);
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#wraper')