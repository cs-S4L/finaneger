<template>
    <div id="app-accountList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`/konten/edit/${id}`"
        >
            <div class="header">
                <span class="left">{{ item.type }}</span>
            </div>
            <div class="text">{{ item.description }}</div>
            <div class="number">{{ item.balance }}</div>
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

export default {
    data: function() {
        return {
            itemList: {},
            offset: { default: 0 },
            bol_loadMore: true
        };
    },
    components: {},
    computed: {},
    methods: {
        loadMore: function(e) {
            accounts.getAcocunts(
                store.userToken,
                data => {
                    if (data) {
                        data = JSON.parse(data);
                        for (const [key, value] of Object.entries(data)) {
                            Vue.set(this.itemList, key, value);
                        }
                        var dataLength = Object.keys(data).length;
                        this.offset += dataLength;
                        if (dataLength < accounts.limit) {
                            this.bol_loadMore = false;
                        }
                    }
                },
                this.offset
            );
        }
    },
    mounted: function() {
        accounts.getAccounts(store.userToken, data => {
            if (data) {
                data = JSON.parse(data);
                for (const [key, value] of Object.entries(data)) {
                    Vue.set(this.itemList, key, value);
                }
                var dataLength = Object.keys(data).length;
                this.offset += dataLength;
                if (dataLength < accounts.limit) {
                    this.bol_loadMore = false;
                }
            }
        });
    }
};
</script>

<style></style>
