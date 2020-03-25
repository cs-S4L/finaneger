<template>
    <div id="site-fixedCosts" class="site">
        <h2 class="site-title">Fixkosten</h2>

        <app-fixedCostsList></app-fixedCostsList>

        <router-link
            :to="'fixkosten/edit/create'"
            class="material-icons button button--fixed button--round button--white"
        >
            add
        </router-link>
    </div>
</template>

<script>
import AppFixedCostsList from "../components/AppFixedCostsList.vue";

export default {
    components: {
        AppFixedCostsList
    },
    computed: {},
    methods: {}
};
</script>

<style></style>
