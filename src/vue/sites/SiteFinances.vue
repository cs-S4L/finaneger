<template>
  <div id="site-finances" class="site">
    <h2 class="site-title">Ein-/Ausgabe</h2>
    
    <router-link class="list-item" v-bind:to="'/finanzen/edit'">
    <!-- <div class="list-item"> -->
      <div class="header">
        <span class="left">31.12.2020</span>
      </div>
      <div class="text">Das ist eine Bezeichnung Für eine Ausgabe</div>
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
