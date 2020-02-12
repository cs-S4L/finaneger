<template>
  <div id="site-accountsEdit" class="site">
    <h2 class="site-title">Konto editieren</h2>

    <form action="#editFinance" id="form-finance" class="form form-finance" v-bind:class="{error: err_Form}">
      <span class="form-error">{{err_Form}}</span>

      <div class="row">
        <div class="col noPadding">
          <comp-text-field 
            label="Bezeichnung" 
            name="description" 
            :error="err_Description" 
            value="">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <comp-text-field 
            label="Bank" 
            name="bank" 
            :error="err_Bank" 
            value="">
          </comp-text-field>
        </div>

        <div class="col">
          <comp-text-field 
            label="Kontostand" 
            name="balance" 
            :error="err_Balance" 
            value=""
            innerClass="currency">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col noPadding">
          <comp-text-field 
            label="Kontoinhaber" 
            name="owner"
            :error="err_Owner" 
            value="">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <comp-checkbox
            label="Dispo"
            name="dispoCheckbox"
            :error="'test'"
            value="dispo">
          </comp-checkbox>
        </div>

        <div class="col">
          <comp-text-field 
            label="Dispo" 
            name="dispo" 
            :error="err_Dispo" 
            value=""
            innerClass="currency">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <comp-text-field 
            label="Abbuchungsdatum" 
            name="resetDate" 
            :error="''" 
            value="31.12.2018">
          </comp-text-field>
        </div>

        <div class="col">
          <comp-select-field
              label="Konto Eingang"
              name="accountIn"
              :error="''"
              :options="accountsOptions">
            </comp-select-field>
        </div>
      </div>

      <input type="submit" value="Login" class="button button--default" v-on:click="submitEdit">
      <input type="submit" value="abort" class="button button--white" v-on:click="abortEdit">
    </form>

  </div>
</template>

<script>
import CompTextField from '../components/CompTextField.vue';
import CompSelectField from '../components/CompSelectField.vue';
import CompTextarea from '../components/CompTextarea.vue';
import CompCheckbox from '../components/CompCheckbox.vue';

export default {
  data: function () {
      return {
        err_Form: '',
        err_Description: '',
        err_Bank: '',
        err_Balance: '',
        err_Owner: '',
        err_Dispo: '',
        err_DebitDate: '',
        err_ReferenceAccount: '',
        accountsOptions: [
          {'value': 'idaccount1', 'name': 'Konto1'},
          {'value': 'idaccount2', 'name': 'Konto2'}
        ],
      
      }
  },
  components: {
    CompTextField,
    CompSelectField,
    CompTextarea,
    CompCheckbox,
  },
  computed: {},
  methods: {
    submitEdit: function(e) {
      e.preventDefault();
      // const form = document.querySelector('#form-finance');
      // this.err_Description = 'test err';
    },
    abortEdit: function(e) {

    }
  }
}
</script>

<style>

</style>
