<template>
    <div id="site-financesEdit" class="site">
        <h2 class="site-title">Einnahme/Ausgabe editieren {{ id }}</h2>

        <form
            action="#editFinance"
            id="form"
            class="form form-finance"
            v-bind:class="{ error: formError }"
        >
            <!-- <h2 class="form-title">Melde dich an!</h2> -->

            <span class="form-error">{{ formError }}</span>

            <div class="row">
                <div class="col noPadding">
                    <comp-text-field
                        label="Bezeichnung"
                        name="description"
                        :error="item.description.error"
                        :value="item.description.value"
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
                        :value="item.type.value"
                        :options="[
                            { value: '', name: '' },
                            { value: 'income', name: 'Einnahme' },
                            { value: 'expenses', name: 'Ausgabe' }
                        ]"
                    >
                    </comp-select-field>
                </div>

                <div class="col">
                    <comp-text-field
                        label="Betrag"
                        name="amount"
                        :error="item.amount.error"
                        :value="item.amount.value"
                        innerClass="currency"
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
                        :value="item.account.value"
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
                        :value="item.date.value"
                        innerClass=""
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
                value="Login"
                class="button button--default"
                v-on:click="submitEdit"
            />
            <input
                type="button"
                value="abort"
                class="button button--white"
                v-on:click="abortEdit"
            />
        </form>
    </div>
</template>

<script>
import CompTextField from "../components/CompTextField.vue";
import CompSelectField from "../components/CompSelectField.vue";
import CompTextarea from "../components/CompTextarea.vue";

import { finances } from "../../js/imports/finances.js";
import Vue from "vue";

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
                    value: "",
                    error: ""
                },
                note: {
                    value: "",
                    error: ""
                }
            },
            accountOptions: {
                value: ""
            }
        };
    },
    components: {
        CompTextField,
        CompSelectField,
        CompTextarea
    },
    computed: {},
    methods: {
        submitEdit: function(e) {
            e.preventDefault();

            if (this.id && this.id != "create") {
                finances.setFinance(data => {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            this.$router.push({ path: "/finanzen" });
                        } else {
                            if (data.error) {
                                for (const [key, value] of Object.entries(data.error)) {
                                    if (key in this.item) {
                                        this.item[key].error = value;
                                    }
                                }
                            } else {
                                console.log("Error! No further Information given!");
                            }
                        }
                    }
                }, $("#form").serialize());
            } else {
                finances.updateFinance(data => {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            this.$router.push({ path: "/finanzen" });
                        } else {
                            if (data.error) {
                                for (const [key, value] of Object.entries(data.error)) {
                                    if (key in this.item) {
                                        this.item[key].error = value;
                                    }
                                }
                            } else {
                                console.log("Error! No further Information given!");
                            }
                        }
                    }
                }, $("#form").serialize());
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/finanzen" });
        }
    },
    mounted: function() {
        if (this.id && this.id != "create") {
            finances.loadFinance(data => {
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
