<template>
    <div id="app-financeList" class="">
        <router-link
            class="finance-list"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`finanzen/edit/${item.id}`"
        >
            <div class="left">
                <p class="left-content date">{{ getFormatedDate(item.date) }}</p>
                <div class="text">
                    <p class="left-content description">{{ item.description }}</p>
                    <p class="left-content account">{{ getAccountName(item.account) }}</p>
                </div>
            </div>

            <div class="right">
                <span
                    class="right-content amount"
                    :class="{ green: isEinnahme(item.type), red: isAusgabe(item.type) }"
                    ><span v-if="isAusgabe(item.type)">-</span
                    >{{ getFormatedBalance(item.amount) }}€</span
                >
            </div>
        </router-link>

        <button
            class="button button--blue"
            v-on:click="loadMore"
            v-bind:class="{ hide: !bol_loadMore }"
        >
            Load More
        </button>
    </div>
</template>

<script>
import Vue from "vue";

import { store } from "../App.vue";
import { accounts } from "../../js/imports/accounts.js";
import { finances } from "../../js/imports/finances.js";

export default {
    data: function() {
        return {
            itemList: {},
            offset: 0,
            bol_loadMore: true,
            accounts: false
        };
    },
    components: {},
    computed: {},
    methods: {
        isEinnahme: type => {
            return type == "income" ? true : false;
        },
        isAusgabe: type => {
            return type == "spending" ? true : false;
        },
        getFormatedDate: date => {
            let str = moment(date, ["DD.MM.YYYY", "YYYY.MM.DD"]).format("DD.MM.YY");
            return str.replace(/\./g, "\n");
        },
        getFormatedBalance(balance) {
            return this.$numeral(balance).format("0,0.00");
        },
        getAccountName: function(account) {
            if (this.accounts[account]) {
                return this.accounts[account].description;
            } else {
                return "";
            }
        },
        handleDataResponse: function(data) {
            let currentLength = 0;

            if (!data) {
                console.log("No Data Response", data);
                return;
            }

            data = JSON.parse(data);
            if (this.itemList) {
                currentLength = Object.entries(this.itemList).length;
            }
            for (const [key, value] of Object.entries(data)) {
                let _key = parseInt(key) + currentLength;
                Vue.set(this.itemList, _key, value);
            }
            var dataLength = Object.keys(data).length;
            this.offset += dataLength;
            if (dataLength < finances.limit) {
                this.bol_loadMore = false;
            }
        },
        loadMore: function(e) {
            finances.getFinances(store.userToken, this.handleDataResponse, this.offset);
        }
    },
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
    },
    mounted: function() {
        finances.getFinances(store.userToken, this.handleDataResponse);
    }
};
</script>

<style></style>
