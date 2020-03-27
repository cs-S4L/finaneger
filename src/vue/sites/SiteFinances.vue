<template>
    <div id="site-finances" class="site">
        <div class="site-inner">
            <h2 class="site-title">Ein-/Ausgabe</h2>

            <app-financeList></app-financeList>

            <router-link
                :to="'finanzen/edit/create'"
                class="material-icons button button--fixed button--round button--blue-outline"
            >
                add
            </router-link>
        </div>
    </div>
</template>

<script>
import AppFinanceList from "../components/AppFinanceList.vue";

export default {
    components: {
        AppFinanceList
    }
};
</script>

<style></style>
