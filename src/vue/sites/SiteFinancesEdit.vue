<template>
    <div id="site-financesEdit" class="site">
        <h2 class="site-title">Einnahme/Ausgabe editieren {{ id }}</h2>

        <form id="form" class="form form-finance" v-bind:class="{ error: formError }">
            <!-- <h2 class="form-title">Melde dich an!</h2> -->

            <span class="form-error">{{ formError }}</span>

            <div class="row">
                <div class="col noPadding">
                    <comp-text-field
                        label="Bezeichnung"
                        name="description"
                        :error="item.description.error"
                        v-model="item.description.value"
                    >
                    </comp-text-field>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <comp-select-field
                        label="Typ"
                        name="type"
                        :error="item.type.error"
                        v-model="item.type.value"
                        :options="[
                            { value: 'income', name: 'Einnahme' },
                            { value: 'spending', name: 'Ausgabe' }
                        ]"
                    >
                    </comp-select-field>
                </div>

                <div class="col">
                    <comp-text-field
                        label="Betrag"
                        name="amount"
                        :error="item.amount.error"
                        v-model="item.amount.value"
                        innerClass="currency"
                        formatType="currency"
                    >
                    </comp-text-field>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <comp-select-field
                        label="Konto"
                        name="account"
                        :error="item.account.error"
                        v-model="item.account.value"
                        :options="accountOptions"
                    >
                    </comp-select-field>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <comp-text-field
                        label="Datum"
                        name="date"
                        :error="item.date.error"
                        v-model="item.date.value"
                        innerClass=""
                        formatType="date"
                    >
                    </comp-text-field>
                </div>
                <div class="col"></div>
            </div>

            <div class="row">
                <div class="col">
                    <comp-textarea
                        label="Notiz"
                        name="note"
                        :error="item.note.error"
                        :value="item.note.value"
                        innerClass=""
                        rows="5"
                    >
                    </comp-textarea>
                </div>
            </div>

            <input type="hidden" name="id" :value="id" />

            <input
                type="submit"
                :value="submitValue"
                class="button button--default"
                v-on:click="submitEdit"
            />
            <input
                type="button"
                value="Abbrechen"
                class="button button--white"
                v-on:click="abortEdit"
            />
            <input
                type="button"
                value="Löschen"
                class="button button--red"
                v-on:click="deleteAccount"
                v-if="id != 'create'"
            />
        </form>
    </div>
</template>

<script>
import CompTextField from "../components/CompTextField.vue";
import CompSelectField from "../components/CompSelectField.vue";
import CompTextarea from "../components/CompTextarea.vue";

import { accounts } from "../../js/imports/accounts.js";
import { finances } from "../../js/imports/finances.js";
import { store } from "../App.vue";

export default {
    props: {
        id: { default: "" }
    },
    data: function() {
        return {
            formError: "",
            item: {
                description: {
                    value: "",
                    error: ""
                },
                type: {
                    value: "",
                    error: ""
                },
                amount: {
                    value: "",
                    error: ""
                },
                account: {
                    value: "",
                    error: ""
                },
                date: {
                    value: moment().format("DD.MM.YYYY"),
                    error: ""
                },
                note: {
                    value: "",
                    error: ""
                }
            },
            accountOptions: []
        };
    },
    watch: {
        "item.date.value": function(newVal, oldVal) {
            this.item.date.error = "";
            if (newVal == "Invalid date") {
                this.item.date.error = "Invalid Date. " + oldVal;
            }
        }
    },
    components: {
        CompTextField,
        CompSelectField,
        CompTextarea
    },
    computed: {
        submitValue() {
            if (this.id == "create") {
                return "Erstellen";
            } else {
                return "Editieren";
            }
        }
    },
    methods: {
        handleError: function(data) {
            if (data.error) {
                for (const [key, value] of Object.entries(data.error)) {
                    if (key in this.item) {
                        this.item[key].error = value;
                    }
                }
            } else {
                console.log("Error! No further Information given!");
            }
        },
        setAccountOptions(accounts) {
            for (const [key, value] of Object.entries(accounts)) {
                this.accountOptions.push({
                    value: `${value.id}`,
                    name: value.description
                });
            }
        },
        submitEdit: function(e) {
            e.preventDefault();

            if (this.id && this.id == "create") {
                finances.setFinance(
                    store.userToken,
                    data => {
                        if (data) {
                            data = JSON.parse(data);
                            if (data.success) {
                                this.$router.push({ path: "/finanzen" });
                            } else {
                                this.handleError(data);
                            }
                        }
                    },
                    $("#form").serialize()
                );
            } else {
                finances.updateFinance(
                    store.userToken,
                    data => {
                        if (data) {
                            data = JSON.parse(data);
                            if (data.success) {
                                this.$router.push({ path: "/finanzen" });
                            } else {
                                this.handleError(data);
                            }
                        }
                    },
                    $("#form").serialize()
                );
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/finanzen" });
        },
        deleteAccount: function(e) {
            accounts.deleteAccount(
                store.userToken,
                data => {
                    this.handleSubmitData(data);
                },
                $("#form").serialize()
            );
        }
    },
    beforeCreate: function() {
        accounts.getAccounts(
            store.userToken,
            data => {
                if (data) {
                    data = JSON.parse(data);
                    this.setAccountOptions(data);
                }
            },
            0,
            ""
        );
    },
    mounted: function() {
        if (this.id && this.id != "create") {
            finances.getFinance(
                store.userToken,
                data => {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            if (data.success != "accounts") {
                                for (const [key, value] of Object.entries(data.success)) {
                                    if (key in this.item) {
                                        switch (key) {
                                            case "account":
                                                this.item.account.value = `${value}`;
                                                break;
                                            default:
                                                this.item[key].value = value;
                                        }
                                    }
                                }
                            }
                        } else {
                            this.handleError(data);
                        }
                    }
                },
                this.id
            );
        }
    }
};
</script>

<style></style>
