<template>
    <div id="app-billList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`/rechnungen/edit/${id}`"
        >
            <div class="header">
                <span class="right">{{ item.dueDate }}</span>
            </div>
            <div class="text">{{ item.description }}</div>
            <div class="number">{{ item.amount }}</div>
        </router-link>

        <button
            class="button button--blue"
            v-on:click="loadMore"
            v-bind:class="{ hide: bol_loadMore }"
        >
            Load More
        </button>
    </div>
</template>

<script>
import Vue from "vue";

import { bills } from "../../js/imports/bills.js";

export default {
    data: function() {
        return {
            itemList: {},
            offset: { default: 0 },
            bol_loadMore: false
        };
    },
    components: {},
    computed: {},
    methods: {
        loadMore: function(e) {
            bills.loadBills(
                data => {
                    if (data) {
                        data = JSON.parse(data);
                    }
                    for (const [key, value] of Object.entries(data)) {
                        Vue.set(this.itemList, key, value);
                    }
                    var dataLength = Object.keys(data).length;
                    this.offset += dataLength;
                    if (dataLength < bills.limit) {
                        this.bol_loadMore = false;
                    }
                },
                { limit: bills.limit, offset: this.offset }
            );
        }
    },
    mounted: function() {
        bills.loadBills(
            data => {
                if (data) {
                    data = JSON.parse(data);
                }
                for (const [key, value] of Object.entries(data)) {
                    Vue.set(this.itemList, key, value);
                }
                var dataLength = Object.keys(data).length;
                this.offset += dataLength;
                if (dataLength < bills.limit) {
                    this.bol_loadMore = false;
                }
            },
            { limit: bills.limit }
        );
    }
};
</script>

<style></style>
