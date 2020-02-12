<template>
  <div id="site-login" class="site">
      <h2 class="welcome">Herzlich Willkommen bei deinem</h2>
      <h1 class="title">Finaneger</h1>
      <h1 style="text-align: center">Logoplatzhalter</h1>

      <form action="login" method="POST" id="form-log-in" class="form form-log-in" v-bind:class="{error: err_LoginForm}">
        <h2 class="form-title">Melde dich an!</h2>
        <span class="form-error">Fehlerhafte Eingabe! E-Mail oder Passwort falsch!</span>

        <div class="row">
          <div class="col">
            
            <comp-text-field 
              label="E-Mail"
              type="email"
              name="email" 
              :value="name">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="Passwort"
              type="password"
              name="password" 
              :value="password">
            </comp-text-field>
          </div>
        </div>

        <input type="text" value="Login" class="button button--default" v-on:click="submitLogin">
      </form>

      <div class="divider"></div>

      <form action="register" id="form-register" method="POST" class="form form-register" v-bind:class="{error: err_RegisterForm}">
        <h2 class="form-title">Oder registriere dich jetzt!</h2>
        <span class="form-error">{{err_RegisterForm}}</span>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="E-Mail"
              type="email"
              :error="err_RegisterMail"
              name="email" 
              value="">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="Vorname"
              :error="err_RegisterName"
              name="name" 
              value="">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="Nachname"
              :error="err_RegisterSurname"
              name="surname" 
              value="">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="Passwort"
              type="password"
              :error="err_RegisterPassword"
              name="password" 
              value="">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <input type="text" value="Registrieren" class="button button--default" v-on:click="submitRegister">
          </div>
        </div>
      </form>

  </div>
</template>

<script>
import {store} from '../App.vue';
import CompTextField from '../components/CompTextField.vue';
import {Api} from '../../js/imports/finanegerApi.js';

export default {
  data: function () {
    return {
      err_LoginForm: '',
      err_RegisterForm: '',
      err_RegisterMail: '',
      err_RegisterName: '',
      err_RegisterSurname: '',
      err_RegisterPassword: '',
      name: '',
      password: '',
    }
  },
  components: {
    CompTextField,
  },
  computed: {},
  methods: {
      submitLogin: function(e) {
        e.preventDefault();

        Api.submitAjaxForm(
          $('#form-log-in'),
          (data) => {
            data = JSON.parse(data);
            if (data.error) {
              this.err_LoginForm = data.error;
            } else if (data.userToken) {
              store.userToken = data.userToken;
            } else {
              console.log('Error! Something went wrong!');
            }
          }
        );
      },
      submitRegister: function(e) {
        e.preventDefault();

        Api.submitAjaxForm(
          $('#form-register'),
          (data) => {
            data = JSON.parse(data);
            if (data.error) {
              for (const [key, value] of Object.entries(data.error)) {
                this[key] = value;
              }
            } else if (data.userToken) {
              store.userToken = data.userToken;
            } else {
              console.log('Error! Something went wrong');
            }
          }
        );

      }
  }
}
</script>

<style>
</style>
