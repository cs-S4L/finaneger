<template>
  <div id="site-finances" class="site">
    <h2 class="site-title">Ein-/Ausgabe</h2>
    
    <router-link class="list-item" :key="" v-for="(item, id) in itemList" :id="id" :to="'/finanzen/edit'">
      <div class="header">
        <span class="left">{{item.left}}</span>
      </div>
      <div class="text">{{item.text}}</div>
      <div class="number">{{item.number}}</div>
    </router-link>
    <button class="button button--blue" v-on:click="loadMore" v-bind:class="{hide: bol_loadMore}">Load More</button>
  </div>
</template>

<script>
import Vue from 'vue';

import {finances} from '../../js/imports/finances.js';

export default {
  data: function () {
    return {
      itemList: {},
      offset: 0,
      bol_loadMore: false,
    }
  },
  components: {},
  computed: {},
  methods: {
    loadMore: function (e) {
      finances.loadFinanceList(
        (data) => {
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
        finances.limit,
        this.offset
      );
    }
  },
  mounted: function() {
    finances.loadFinanceList(
      (data) => {
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
      finances.limit
    );
  }
}
</script>

<style>

</style>
