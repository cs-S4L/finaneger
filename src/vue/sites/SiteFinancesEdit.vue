<template>
  <div id="site-financesEdit" class="site">
    <h2 class="site-title">Einnahme/Ausgabe editieren</h2>

    <form action="#editFinance" id="form-finance" class="form form-finance" v-bind:class="{error: formError}">
        <!-- <h2 class="form-title">Melde dich an!</h2> -->

        <span class="form-error">Fehlerhafte Eingabe! E-Mail oder Passwort falsch!</span>

        <div class="row">
          <div class="col noPadding">
            <div class="input input-text">
              <label for="description">E-Mail</label>
              <span class="error">Das ist ein Fehler. Das ist ein Fehler.</span>
              <input type="text" name="description" class="">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="input input-select">
              <label for="type">Typ</label>
              <!-- <span class="error">Das Passwort passt nicht zum </span> -->
              <div class="select">
                <select name="type" form="form-finance">
                  <option value="income">Einnahme</option>
                  <option value="expenses">Ausgabe</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="input input-text">
              <label for="amount">Betrag</label>
              <span class="error">Das Passwort passt nicht zum </span>
              <input type="text" name="amount" class="">
            </div>
          </div>
        </div>

        <input type="text" value="Login" class="button button--default" v-on:click="submitEdit">
      </form>
  </div>
    
</template>

<script>
export default {
  data: function () {
      return {
        formError: true,
      }
  },
  components: {},
  computed: {},
  methods: {
    submitEdit: () => {
      console.log('Submit edit')
    }
  }
}
</script>

<style>

</style>
