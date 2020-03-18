<template>
    <div id="app-financeList" class="">
        <router-link
            class="list-item"
            :key=""
            v-for="(item, id) in itemList"
            :id="id"
            :to="`finanzen/edit/${id}`"
        >
            <div class="header">
                <span class="left">{{ getFormatedDate(item.date) }}</span>
            </div>
            <div class="text">{{ item.description }}</div>
            <div
                class="number currency"
                :class="{ green: isEinnahme(item.type), red: isAusgabe(item.type) }"
            >
                {{ item.amount }}
            </div>
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
import { store } from "../App.vue";

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
        isEinnahme: type => {
            return type == "income" ? true : false;
        },
        isAusgabe: type => {
            return type == "spending" ? true : false;
        },
        getFormatedDate: date => {
            return moment(date, ["DD.MM.YYYY", "YYYY.MM.DD"]).format("DD.MM.YYYY");
        },
        handleDataResponse: function(data) {
            console.log(data);
            data = JSON.parse(data);
            for (const [key, value] of Object.entries(data)) {
                Vue.set(this.itemList, key, value);
            }
            var dataLength = Object.keys(data).length;
            this.offset += dataLength;
            if (dataLength < finances.limit) {
                this.bol_loadMore = false;
            }
        },
        loadMore: function(e) {
            finances.getFinances(
                store.userToken,
                data => {
                    if (!data) {
                        console.log("Unbekannter Fehler", data);
                        return;
                    }
                    this.handleDataResponse(data);
                },
                this.offset
            );
        }
    },
    mounted: function() {
        finances.getFinances(store.userToken, data => {
            if (!data) {
                console.log("Unbekannter Fehler", data);
                return;
            }
            this.handleDataResponse(data);
        });
    }
};
</script>

<style></style>
