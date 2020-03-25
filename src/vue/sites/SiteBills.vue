<template>
    <div id="site-bills" class="site">
        <h2 class="site-title">Rechnungen</h2>

        <app-billList></app-billList>

        <router-link
            :to="'rechnungen/edit/create'"
            class="material-icons button button--fixed button--round button--white"
        >
            add
        </router-link>
    </div>
</template>

<script>
import AppBillList from "../components/AppBillList.vue";

export default {
    components: {
        AppBillList
    }
};
</script>

<style></style>
