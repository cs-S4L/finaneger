<template>
    <div id="site-home" class="site">
        <h2 class="site-title">Herzlich Willkommen</h2>
        <div class="row">
            <div class="col noPadding col-total center-content">
                <div class="circle">
                    <div class="circle-content">
                        <h2 class="total-heading">Alle Konten</h2>
                        <span class="total" :class="totalClass">{{ total }}€</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col col-account-list noPadding">
                <app-accountList :accounts="accounts" :bol_loadMore_prop="false"></app-accountList>
            </div>
        </div>
    </div>
</template>

<script>
import AppAccountList from "../components/AppAccountList.vue";

import { store } from "../App.vue";
import { accounts } from "../../js/imports/accounts.js";

export default {
    data: function() {
        return {
            accounts: true
        };
    },
    components: {
        AppAccountList
    },
    computed: {
        total() {
            let total = 0;
            for (const [key, value] of Object.entries(this.accounts)) {
                total += parseInt(value.balance);
            }
            return total;
        },
        totalClass() {
            if (this.total < 0) {
                return "red";
            } else {
                return "green";
            }
        }
    },
    methods: {},
    beforeCreate: function() {
        accounts.getAccounts(
            store.userToken,
            data => {
                if (data) {
                    data = JSON.parse(data);
                    this.accounts = data;
                }
            },
            0,
            ""
        );
    }
};
</script>

<style></style>
