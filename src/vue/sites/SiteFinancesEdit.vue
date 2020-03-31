<template>
    <div id="site-financesEdit" class="site">
        <div class="site-inner">
            <h2 class="site-title" v-if="id != 'create'">Einnahme/Ausgabe editieren</h2>
            <h2 class="site-title" v-if="id == 'create'">Einnahme/Ausgabe erstellen</h2>

            <form id="form" class="form form-finance" v-bind:class="{ error: formError }">
                <span class="form-error">{{ formError }}</span>

                <div class="row">
                    <div class="col">
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

                <div class="row">
                    <div class="col" v-if="item.fixedCost.value">
                        <router-link
                            :to="`/fixkosten/edit/${item.fixedCost.value}`"
                            class="form-link"
                        >
                            Zum Fixkostenpunkt
                        </router-link>
                    </div>
                    <div class="col" v-if="item.bill.value">
                        <router-link :to="`/rechnungen/edit/${item.bill.value}`" class="form-link">
                            Zur Rechnung
                        </router-link>
                    </div>
                </div>

                <input type="hidden" name="id" :value="id" />

                <div class="row">
                    <div class="col left-content">
                        <input
                            type="submit"
                            :value="submitValue"
                            class="button button--default button--form"
                            v-on:click="submitEdit"
                        />
                        <input
                            type="button"
                            value="Abbrechen"
                            class="button button--white button--form"
                            v-on:click="abortEdit"
                        />
                        <input
                            type="button"
                            value="Löschen"
                            class="button button--red button--form"
                            v-on:click="deleteAccount"
                            v-if="id != 'create'"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import CompTextField from "../components/CompTextField.vue";
import CompSelectField from "../components/CompSelectField.vue";
import CompTextarea from "../components/CompTextarea.vue";

import { store } from "../App.vue";
import { accounts } from "../../js/imports/accounts.js";
import { finances } from "../../js/imports/finances.js";

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
                },
                fixedCost: {
                    value: false
                },
                bill: {
                    value: false
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
        handleSubmitData: function(data) {
            if (data) {
                data = JSON.parse(data);
                if (data.success) {
                    this.$router.push({ path: "/finanzen" });
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
                finances.setFinance(store.userToken, this.handleSubmitData, $("#form").serialize());
            } else {
                finances.updateFinance(
                    store.userToken,
                    this.handleSubmitData,
                    $("#form").serialize()
                );
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/finanzen" });
        },
        deleteAccount: function(e) {
            finances.deleteFinance(store.userToken, this.handleSubmitData, $("#form").serialize());
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
