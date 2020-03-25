<template>
    <div id="site-billsEdit" class="site">
        <h2 class="site-title" v-if="id != 'create'">Rechnung editieren</h2>
        <h2 class="site-title" v-if="id == 'create'">Rechnung erstellen</h2>

        <form action="#editBill" id="form" class="form form-bill" v-bind:class="{ error: '' }">
            <span class="form-error">{{ "" }}</span>

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
                    <comp-text-field
                        label="Fälligkeit"
                        name="dueDate"
                        :error="item.dueDate.error"
                        v-model="item.dueDate.value"
                    >
                    </comp-text-field>
                </div>

                <div class="col">
                    <comp-text-field
                        label="Betrag"
                        name="amount"
                        :error="item.amount.error"
                        v-model="item.amount.value"
                        innerClass="currency"
                    >
                    </comp-text-field>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <comp-checkbox
                        label="Bezahlt?"
                        name="payed"
                        :error="item.payed.error"
                        v-model="item.payed.value"
                    >
                    </comp-checkbox>
                </div>
                <div class="col">
                    <comp-select-field
                        label="Ausgangskonto"
                        name="relatedAccount"
                        v-bind:class="showAccountSelect"
                        :error="item.relatedAccount.error"
                        v-model="item.relatedAccount.value"
                        :options="accountOptions"
                    >
                    </comp-select-field>
                </div>
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
import CompCheckbox from "../components/CompCheckbox.vue";

import { store } from "../App.vue";
import { accounts } from "../../js/imports/accounts.js";
import { bills } from "../../js/imports/bills.js";

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
                dueDate: {
                    value: "",
                    error: ""
                },
                amount: {
                    value: "",
                    error: ""
                },
                relatedAccount: {
                    value: "",
                    error: ""
                },
                payed: {
                    value: false,
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
    components: {
        CompTextField,
        CompSelectField,
        CompTextarea,
        CompCheckbox
    },
    computed: {
        submitValue() {
            if (this.id == "create") {
                return "Erstellen";
            } else {
                return "Editieren";
            }
        },
        showAccountSelect() {
            if (this.item.payed.value) {
                return "";
            } else {
                return "visibility-hidden";
            }
        }
    },
    methods: {
        handleSubmitData: function(data) {
            if (data) {
                data = JSON.parse(data);
                if (data.success) {
                    this.$router.push({ path: "/rechnungen" });
                } else {
                    this.handleError(data);
                }
            }
        },
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
                bills.setBill(store.userToken, this.handleSubmitData, $("#form").serialize());
            } else {
                bills.updateBill(store.userToken, this.handleSubmitData, $("#form").serialize());
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/rechnungen" });
        },
        deleteBill: function(e) {
            bills.deleteBill(store.userToken, this.handleSubmitData, $("#form").serialize());
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
        if (this.id) {
            bills.getBill(data => {
                if (data) {
                    data = JSON.parse(data);
                    if (data.item) {
                        const item = data.item;
                    }
                    for (const [key, value] of Object.entries(data.item)) {
                        if (key in this.item) {
                            this.item[key].value = value;
                        }
                    }
                    if ("accountOptions" in data) {
                        this.accountOptions = data.accountOptions;
                    }
                }
            }, this.id);
        }
    }
};
</script>

<style></style>
