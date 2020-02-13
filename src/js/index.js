import Vue from "vue";
import VueRouter from "vue-router";
import App from "../vue/App.vue";

import "../sass/main.scss";

import SiteHome from "../vue/sites/SiteHome.vue";
import SiteFinances from "../vue/sites/SiteFinances.vue";
import SiteFinancesEdit from "../vue/sites/SiteFinancesEdit.vue";
import SiteAccounts from "../vue/sites/SiteAccounts.vue";
import SiteAccountsEdit from "../vue/sites/SiteAccountsEdit.vue";
import SiteBills from "../vue/sites/SiteBills.vue";
import SiteBillsEdit from "../vue/sites/SiteBillsEdit.vue";
import SiteFixedCosts from "../vue/sites/SiteFixedCosts.vue";
import SiteFixedCostsEdit from "../vue/sites/SiteFixedCostsEdit.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", component: SiteHome },
        { path: "/finanzen", component: SiteFinances },
        { path: "/finanzen/edit/:id", component: SiteFinancesEdit, props: true },
        { path: "/konten", component: SiteAccounts },
        { path: "/konten/edit/:id", component: SiteAccountsEdit, props: true },
        { path: "/rechnungen", component: SiteBills },
        { path: "/rechnungen/edit/:id", component: SiteBillsEdit, props: true },
        { path: "/fixkosten", component: SiteFixedCosts },
        { path: "/fixkosten/edit/:id", component: SiteFixedCostsEdit, props: true },
        { path: "/*", component: SiteHome }
    ],
    mode: "history"
});

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
