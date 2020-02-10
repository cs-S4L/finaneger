import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../vue/App.vue';

import "../sass/main.scss";

import SiteHome from '../vue/sites/SiteHome.vue';
import SiteFinances from '../vue/sites/SiteFinances.vue';
import SiteAccounts from '../vue/sites/SiteAccounts.vue';
import SiteBills from '../vue/sites/SiteBills.vue';
import SiteFixedCosts from '../vue/sites/SiteFixedCosts.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path:'/', component: SiteHome},
        {path:'/finanzen', component: SiteFinances},
        {path:'/konten', component: SiteAccounts},
        {path:'/rechnungen', component: SiteBills},
        {path:'/fixkosten', component: SiteFixedCosts},
    ],
    mode: 'history',
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app')