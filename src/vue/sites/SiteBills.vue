<template>
  <div id="site-bills" class="site">
    <h2 class="site-title">Rechnungen</h2>
      
    <!-- <div class="list-item"> -->
    <router-link class="list-item" v-bind:to="'/rechnungen/edit'">    
      <div class="header">
        <span class="right">Fällig: 01.02.2021</span>
      </div>
      <div class="text">Das ist eine Bezeichnung Für eine Rechnung</div>
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
