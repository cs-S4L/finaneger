<template>
    <div id="site-finances" class="site">
        <h2 class="site-title">Ein-/Ausgabe</h2>

        <app-financeList></app-financeList>
    </div>
</template>

<script>
import Vue from "vue";

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
