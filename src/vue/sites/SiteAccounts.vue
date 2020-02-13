<template>
    <div id="site-accounts" class="site">
        <h2 class="site-title">Konten</h2>

        <app-accountList></app-accountList>

        <router-link
            :to="'konten/edit/create'"
            class="material-icons button button--fixed button--round button--white"
        >
            add
        </router-link>
    </div>
</template>

<script>
import AppAccountList from "../components/AppAccountList.vue";

export default {
    components: {
        AppAccountList
    },
    computed: {},
    methods: {}
};
</script>

<style></style>
