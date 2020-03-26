<template>
    <div id="app-billList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`/rechnungen/edit/${item.id}`"
        >
            <div class="header">
                <span class="right">{{ getFormatedDate(item.dueDate) }}</span>
            </div>
            <div class="text">{{ item.description }}</div>
            <div class="number currency">{{ item.amount }}</div>
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
import { bills } from "../../js/imports/bills.js";

export default {
    data: function() {
        return {
            itemList: {},
            offset: 0,
            bol_loadMore: true
        };
    },
    components: {},
    computed: {},
    methods: {
        getFormatedDate: date => {
            return moment(date, ["DD.MM.YYYY", "YYYY.MM.DD"]).format("DD.MM.YYYY");
        },
        handleDataResponse: function(data) {
            let currentLength = 0;
            if (!data) {
                console.log("No Data Response", data);
                return;
            }

            data = JSON.parse(data);
            console.log(data);
            if (this.itemList) {
                currentLength = Object.entries(this.itemList).length;
            }
            for (const [key, value] of Object.entries(data)) {
                let _key = parseInt(key) + currentLength;
                Vue.set(this.itemList, _key, value);
            }
            var dataLength = Object.keys(data).length;
            this.offset += dataLength;
            console.log(dataLength);
            if (dataLength < bills.limit) {
                this.bol_loadMore = false;
            }
        },
        loadMore: function(e) {
            bills.getBills(store.userToken, this.handleDataResponse, this.offset);
        }
    },
    mounted: function() {
        bills.getBills(store.userToken, this.handleDataResponse);
    }
};
</script>

<style></style>
