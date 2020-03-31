<template>
    <div id="site-fixedCostsEdit" class="site">
        <div class="site-inner">
            <h2 class="site-title" v-if="id != 'create'">Fixe Einnahme/Ausgabe editieren</h2>
            <h2 class="site-title" v-if="id == 'create'">Fixe Einnahme/Ausgabe erstellen</h2>

            <form
                action="#editFinance"
                id="form-finance"
                class="form form-finance"
                v-bind:class="{ error: formError }"
            >
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
                            label="Konto Eingang"
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
                            label="Nächste Wertstellung"
                            name="nextValuation"
                            :error="item.nextValuation.error"
                            v-model="item.nextValuation.value"
                            innerClass=""
                            formatType="date"
                        >
                        </comp-text-field>
                    </div>
                    <div class="col">
                        <comp-select-field
                            label="Wiederholung"
                            name="iteration"
                            :error="item.iteration.error"
                            v-model="item.iteration.value"
                            :options="[
                                { value: 'weekly', name: 'wöchentlich' },
                                { value: 'monthly', name: 'monatlich' }
                            ]"
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
                            v-on:click="deleteFixedCost"
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

import { accounts } from "../../js/imports/accounts.js";
import { fixedCosts } from "../../js/imports/fixedCosts.js";
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
                nextValuation: {
                    value: moment().format("DD.MM.YYYY"),
                    error: ""
                },
                iteration: {
                    value: "",
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
        setAccountOptions(accounts) {
            for (const [key, value] of Object.entries(accounts)) {
                this.accountOptions.push({
                    value: `${value.id}`,
                    name: value.description
                });
            }
        },
        handleSubmitData: function(data) {
            if (data) {
                data = JSON.parse(data);
                if (data.success) {
                    this.$router.push({ path: "/fixkosten" });
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
        submitEdit: function(e) {
            e.preventDefault();

            if (this.id && this.id == "create") {
                fixedCosts.setFixedCost(
                    store.userToken,
                    this.handleSubmitData,
                    $("#form-finance").serialize()
                );
            } else {
                fixedCosts.updateFixedCost(
                    store.userToken,
                    this.handleSubmitData,
                    $("#form-finance").serialize()
                );
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/fixkosten" });
        },
        deleteFixedCost: function(e) {
            fixedCosts.deleteFixedCost(
                store.userToken,
                this.handleSubmitData,
                $("#form-finance").serialize()
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
        if (this.id) {
            fixedCosts.getFixedCost(
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
