<template>
  <div id="site-login">
      <h2 class="welcome">Herzlich Willkommen bei deinem</h2>
      <h1 class="title">Finaneger</h1>
      <h1 style="text-align: center">Logoplatzhalter</h1>

      <form action="#login" id="form-log-in" class="form form-log-in" v-bind:class="{error: loginFormError}">
        <h2 class="form-title">Melde dich an!</h2>
        <span class="form-error">Fehlerhafte Eingabe! E-Mail oder Passwort falsch!</span>

        <div class="input input-text">
          <label for="email">E-Mail</label>
          <!-- <span class="error">Das ist ein Fehler. Das ist ein Fehler.</span> -->
          <input type="email" name="email" class="">
        </div>
        <div class="input input-text">
          <label for="password">Passwort</label>
          <!-- <span class="error">Das Passwort passt nicht zum </span> -->
          <input type="password" name="password" class="">
        </div>
        <input type="text" value="Login" class="button button--default" v-on:click="submitLogin">
      </form>

      <div class="divider"></div>

      <form action="#register" id="form-register" class="form form-register" v-bind:class="{error: registerFormError}">
        <h2 class="form-title">Oder registriere dich jetzt!</h2>
        <span class="form-error">Fehlerhafte Eingabe! E-Mail oder Passwort falsch!</span>

        <div class="input input-text">
          <label for="email">E-Mail</label>
          <span class="error">Error!</span>
          <input type="email" name="email" class="">
        </div>

        <div class="input input-text">
          <label for="name">Vorname</label>
          <span class="error">Error</span>
          <input type="text" name="name" class="">
        </div>

        <div class="input input-text">
          <label for="surname">Name</label>
          <span class="error">Error!</span>
          <input type="text" name="surname" class="">
        </div>

        <div class="input input-text">
          <label for="password">Passwort</label>
          <!-- <span class="error">Das Passwort passt nicht zum </span> -->
          <input type="password" name="password" class="">
        </div>
        <input type="text" value="Registrieren" class="button button--default" v-on:click="submitRegister">
      </form>

  </div>
</template>

<script>
import {store} from '../App.vue';

export default {
  data: function () {
    return {
      loginFormError: false,
      registerFormError: false,
    }
  },
  components: {},
  computed: {},
  methods: {
      submitLogin: (e) => {
        e.preventDefault();
        console.log('submitLogin');
        store.loggedIn = true;
      },
      submitRegister: (e) => {
        e.preventDefault();
        console.log('submitRegister');
      }
  }
}
</script>

<style>
</style>
