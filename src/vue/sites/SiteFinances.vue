<template>
    <div id="site-finances" class="site">
        <h2 class="site-title">Ein-/Ausgabe</h2>

        <app-financeList></app-financeList>

        <router-link
            :to="'finanzen/edit/new'"
            class="material-icons button button--fixed button--round button--white"
        >
            add
        </router-link>
    </div>
</template>

<script>
import AppFinanceList from "../components/AppFinanceList.vue";

export default {
    data: function() {
        return {};
    },
    components: {
        AppFinanceList
    },
    computed: {},
    methods: {}
};
</script>

<style></style>
