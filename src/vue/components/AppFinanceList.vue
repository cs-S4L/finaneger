<template>
    <div id="app-financeList" class="site">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`finanzen/edit/${id}`"
        >
            <div class="header">
                <span class="left">{{ item.left }}</span>
            </div>
            <div class="text">{{ item.text }}</div>
            <div class="number">{{ item.number }}</div>
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

import { finances } from "../../js/imports/finances.js";

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
            finances.loadFinances(
                data => {
                    if (data) {
                        data = JSON.parse(data);
                    }
                    for (const [key, value] of Object.entries(data)) {
                        Vue.set(this.itemList, key, value);
                    }
                    var dataLength = Object.keys(data).length;
                    this.offset += dataLength;
                    if (dataLength < finances.limit) {
                        this.bol_loadMore = false;
                    }
                },
                { limit: finances.limit, offset: this.offset }
            );
        }
    },
    mounted: function() {
        finances.loadFinances(
            data => {
                if (data) {
                    data = JSON.parse(data);
                }
                for (const [key, value] of Object.entries(data)) {
                    Vue.set(this.itemList, key, value);
                }
                var dataLength = Object.keys(data).length;
                this.offset += dataLength;
                if (dataLength < finances.limit) {
                    this.bol_loadMore = false;
                }
            },
            { limit: finances.limit }
        );
    }
};
</script>

<style></style>
