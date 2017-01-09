var VueRouter = require('vue-router');
var Pagea = require('./page/Pagea.vue');
var Pageb = require('./page/Pageb.vue');
var router = new VueRouter({
    routes: [{
        name: 'Pagea',
        path: '/pagea',
        component: Pagea
    }, {
        name: 'Pageb',
        path: '/pageb',
        component: Pageb
    }, {
        path: '*',
        component: Pagea
    }, {
        path: '/',
        redirect: '/Pagea'
    }]
});
module.exports = router;
// export default router;