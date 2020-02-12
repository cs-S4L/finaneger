<template>
  <div id="site-billsEdit" class="site">
    <h2 class="site-title">Rechnung editieren</h2>

    <form action="#editBill" id="form-bill" class="form form-bill" v-bind:class="{error: ''}">
      <span class="form-error">{{''}}</span>

      <div class="row">
        <div class="col noPadding">
          <comp-text-field 
            label="Bezeichnung" 
            name="description" 
            :error="''" 
            value="">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <comp-text-field 
            label="Bank" 
            name="bank" 
            :error="''" 
            value="">
          </comp-text-field>
        </div>

        <div class="col">
          <comp-text-field 
            label="Kontostand" 
            name="balance" 
            :error="'test'" 
            value=""
            innerClass="currency">
          </comp-text-field>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <comp-select-field
            label="Konto Ausgang"
            name="accountOut"
            :error="''"
            :options="accountsOptions">
          </comp-select-field>
        </div>
        <div class="col">
          <comp-checkbox
            label="Bezahlt?"
            name="payed"
            :error="''"
            value="payed">
          </comp-checkbox>
        </div>
      </div>

      <div class="row">
          <div class="col">
            <comp-textarea 
              label="Notiz" 
              name="note"
              :error="''"
              :value="''" 
              innerClass=""
              rows="5">
            </comp-textarea>
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
