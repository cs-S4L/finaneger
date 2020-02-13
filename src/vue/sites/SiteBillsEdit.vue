<template>
    <div id="site-billsEdit" class="site">
        <h2 class="site-title">Rechnung editieren</h2>

        <form action="#editBill" id="form" class="form form-bill" v-bind:class="{ error: '' }">
            <span class="form-error">{{ "" }}</span>

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
                    <comp-text-field
                        label="Fälligkeit"
                        name="dueDate"
                        :error="item.dueDate.error"
                        :value="item.dueDate.value"
                    >
                    </comp-text-field>
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
                        label="Ausgangskonto"
                        name="relatedAccount"
                        :error="item.relatedAccount.error"
                        :value="item.relatedAccount.value"
                        :options="accountOptions"
                    >
                    </comp-select-field>
                </div>
                <div class="col">
                    <comp-checkbox
                        label="Bezahlt?"
                        name="payed"
                        :error="item.payed.error"
                        :value="item.payed.value"
                    >
                    </comp-checkbox>
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
                value="Login"
                class="button button--default"
                v-on:click="submitEdit"
            />
            <input
                type="submit"
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
import CompCheckbox from "../components/CompCheckbox.vue";

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
        CompTextarea,
        CompCheckbox
    },
    computed: {},
    methods: {
        submitEdit: function(e) {
            e.preventDefault();

            if (this.id && this.id == "create") {
                bills.setBill(data => {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            this.$router.push({ path: "/rechnungen" });
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
                bills.updateBill(data => {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            this.$router.push({ path: "/rechnungen" });
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
            this.$router.push({ path: "/rechnungen" });
        }
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
