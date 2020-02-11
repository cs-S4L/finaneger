<template>
  <div id="site-accounts" class="site">
    <h2 class="site-title">Konten</h2>
      
    <router-link class="list-item" v-bind:to="'/konten/edit'">
    <!-- <div class="list-item"> -->
      <div class="header">
        <span class="left">Girokonto</span>
      </div>
      <div class="text">Das ist eine Bezeichnung Für ein Konto</div>
      <div class="number">-9999,99€</div>
    <!-- </div> -->
    </router-link>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  methods: {}
}
</script>

<style>

</style>
