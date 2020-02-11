<template>
  <div id="site-fixedCosts" class="site">
    <h2 class="site-title">Fixkosten</h2>
    
    <!-- <div class="list-item"> -->
    <router-link class="list-item" v-bind:to="'/fixkosten/edit'">
      <div class="header">
        <span class="left">31.12.2020</span>
        <span class="right">monatlich</span>
      </div>
      <div class="text">Das ist eine Bezeichnung Für eine fixe Ausgabe</div>
      <div class="number">-9999,99€</div>
    </router-link>
    <!-- </div> -->
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
