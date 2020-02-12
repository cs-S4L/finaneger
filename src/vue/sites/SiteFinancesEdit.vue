<template>
  <div id="site-financesEdit" class="site">
    <h2 class="site-title">Einnahme/Ausgabe editieren</h2>

    <form action="#editFinance" id="form-finance" class="form form-finance" v-bind:class="{error: err_Form}">
        <!-- <h2 class="form-title">Melde dich an!</h2> -->

        <span class="form-error">{{err_Form}}</span>

        <div class="row">
          <div class="col noPadding">
            <comp-text-field 
              label="Bezeichnung" 
              name="description" 
              :error="err_Description" 
              value="Testbezeichnung">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-select-field
              label="Typ"
              name="type"
              :error="err_Type"
              :options="[
                {'value': 'income', 'name': 'Einnahme'},
                {'value': 'expenses', 'name': 'Ausgabe'}
              ]">
            </comp-select-field>
          </div>

          <div class="col">
            <comp-text-field 
              label="Betrag" 
              name="amount"
              :error="err_Amount"
              value="999,99" 
              innerClass="currency">
            </comp-text-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-select-field
              label="Konto Eingang"
              name="accountIn"
              :error="err_AccountIn"
              :options="accountsOptions">
            </comp-select-field>
          </div>
          <div class="col">
            <comp-select-field
              label="Konto Ausgang"
              name="accountOut"
              :error="err_AccountOut"
              :options="accountsOptions">
            </comp-select-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <comp-text-field 
              label="Datum" 
              name="date"
              :error="err_Date"
              :value="val_Date" 
              innerClass="">
            </comp-text-field>
          </div>
          <div class="col"></div>
        </div>

        <div class="row">
          <div class="col">
            <comp-textarea 
              label="Notiz" 
              name="note"
              :error="err_Note"
              :value="val_Note" 
              innerClass=""
              rows="5"
              >
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

export default {
  data: function () {
      return {
          err_Form: '',
          err_Description: '',
          err_Type: '',
          err_Amount: '',
          err_AccountIn: '',
          err_AccountOut: '',
          err_Date: '',
          err_Note: '',
          accountsOptions: [
            {'value': 'idaccount1', 'name': 'Konto1'},
            {'value': 'idaccount2', 'name': 'Konto2'}
          ],
          val_Date: '31.12.2019',
          val_Note: '',
      }
  },
  components: {
    CompTextField,
    CompSelectField,
    CompTextarea,
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
