<template>
    <div id="app-fixedCostList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`fixkosten/edit/${id}`"
        >
            <div class="header">
                <span class="left">{{ item.date }}</span>
                <span class="right">{{ item.iteration }}</span>
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

import { fixedCosts } from "../../js/imports/fixedCosts.js";

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
            fixedCosts.loadFixedCosts(data => {
                if (data) {
                    data = JSON.parse(data);
                }
                for (const [key, value] of Object.entries(data)) {
                    Vue.set(this.itemList, key, value);
                }
                var dataLength = Object.keys(data).length;
                this.offset += dataLength;
                if (dataLength < fixedCosts.limit) {
                    this.bol_loadMore = false;
                }
            }, this.offset);
        }
    },
    mounted: function() {
        fixedCosts.loadFixedCosts(data => {
            if (data) {
                data = JSON.parse(data);
            }
            for (const [key, value] of Object.entries(data)) {
                Vue.set(this.itemList, key, value);
            }
            var dataLength = Object.keys(data).length;
            this.offset += dataLength;
            if (dataLength < fixedCosts.limit) {
                this.bol_loadMore = false;
            }
        });
    }
};
</script>

<style></style>
