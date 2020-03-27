<template>
    <div id="site-accounts" class="site">
        <div class="site-inner">
            <h2 class="site-title">Konten</h2>

            <app-accountList></app-accountList>

            <router-link
                :to="'/konten/edit/create'"
                class="material-icons button button--fixed button--round button--blue-outline"
            >
                add
            </router-link>
        </div>
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
