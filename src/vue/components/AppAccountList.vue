<template>
    <div id="app-accountList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`/konten/edit/${item.id}`"
        >
            <div class="header">
                <span class="left">{{ convertType(item.type) }}</span>
            </div>
            <div class="text">{{ item.description }}</div>
            <div class="number currency">{{ item.balance }}</div>
        </router-link>

        <button
            class="button button--blue"
            v-on:click="loadMore"
            v-bind:class="{ hide: !bol_loadMore || !bol_loadMore_prop }"
        >
            Load More
        </button>
    </div>
</template>

<script>
import Vue from "vue";

import { store } from "../App.vue";
import { accounts } from "../../js/imports/accounts.js";

export default {
    props: {
        accounts: false,
        bol_loadMore_prop: { default: true }
    },
    data: function() {
        return {
            itemList: {},
            offset: 0,
            bol_loadMore: true
        };
    },
    components: {},
    computed: {},
    watch: {
        accounts: function(newVal, oldVal) {
            this.addToItemList(newVal);
        }
    },
    methods: {
        convertType(type) {
            if (type == "checking") {
                return "Girokonto";
            }
            if (type == "saving") {
                return "Sparkonto";
            }
            return "Konto";
        },
        addToItemList(accounts) {
            let currentLength = 0;

            if (this.itemList) {
                currentLength = Object.entries(this.itemList).length;
            }
            for (const [key, value] of Object.entries(accounts)) {
                let _key = parseInt(key) + currentLength;
                if (value.balance) {
                    value.balance = this.$numeral(value.balance).format("0,0.00");
                }
                Vue.set(this.itemList, _key, value);
            }
        },
        handleDataResponse: function(data) {
            if (!data) {
                console.log("No Data Response", data);
                return;
            }

            data = JSON.parse(data);

            this.addToItemList(data);

            var dataLength = Object.keys(data).length;
            this.offset += dataLength;
            if (dataLength < accounts.limit) {
                this.bol_loadMore = false;
            }
        },
        loadMore: function(e) {
            accounts.getAccounts(
                store.userToken,
                data => {
                    if (data) {
                        this.handleDataResponse(data);
                    }
                },
                this.offset
            );
        }
    },
    mounted: function() {
        console.log(this.accounts);
        if (this.accounts) {
            this.addToItemList(this.accounts);
        } else {
            console.log("test ajax");
            accounts.getAccounts(store.userToken, data => {
                if (data) {
                    this.handleDataResponse(data);
                }
            });
        }
    }
};
</script>

<style></style>
