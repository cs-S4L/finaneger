<template>
    <div id="site-accountsEdit" class="site">
        <h2 class="site-title">Konto editieren</h2>

        <form id="form" class="form form-finance" v-bind:class="{ error: formError }">
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
                    <comp-text-field
                        label="Bank"
                        name="bank"
                        :error="item.bank.error"
                        :value="item.bank.value"
                    >
                    </comp-text-field>
                </div>

                <div class="col">
                    <comp-text-field
                        label="Kontostand"
                        name="balance"
                        :error="item.balance.error"
                        :value="item.balance.value"
                        innerClass="currency"
                    >
                    </comp-text-field>
                </div>
            </div>

            <div class="row">
                <div class="col noPadding">
                    <comp-select-field
                        label="Typ"
                        name="type"
                        :error="item.type.error"
                        :value="item.type.value"
                        :options="accountTypes"
                    >
                    </comp-select-field>
                </div>
            </div>

            <div class="row">
                <div class="col noPadding">
                    <comp-text-field
                        label="Kontoinhaber"
                        name="owner"
                        :error="item.owner.error"
                        :value="item.owner.value"
                    >
                    </comp-text-field>
                </div>
            </div>

            <!--<div class="row">
                <div class="col">
                    <comp-checkbox label="Dispo" name="dispoCheckbox" :error="'test'" value="dispo">
                    </comp-checkbox>
                </div>

                <div class="col">
                    <comp-text-field
                        label="Dispo"
                        name="dispo"
                        :error="err_Dispo"
                        value=""
                        innerClass="currency"
                    >
                    </comp-text-field>
                </div>
            </div>-->

            <!--<div class="row">
                <div class="col">
                    <comp-text-field
                        label="Abbuchungsdatum"
                        name="resetDate"
                        :error="''"
                        value="31.12.2018"
                    >
                    </comp-text-field>
                </div>

                <div class="col">
                    <comp-select-field
                        label="Konto Eingang"
                        name="accountIn"
                        :error="''"
                        :options="accountsOptions"
                    >
                    </comp-select-field>
                </div>
            </div>-->

            <input type="hidden" name="id" :value="id" />

            <input
                type="submit"
                value="Editieren"
                class="button button--default"
                v-on:click="submitEdit"
            />
            <input
                type="submit"
                value="Abbrechen"
                class="button button--white"
                v-on:click="abortEdit"
            />
            <input
                type="submit"
                value="Löschen"
                class="button button--red"
                v-on:click="deleteAccount"
            />
        </form>
    </div>
</template>

<script>
import CompTextField from "../components/CompTextField.vue";
import CompSelectField from "../components/CompSelectField.vue";
import CompTextarea from "../components/CompTextarea.vue";
import CompCheckbox from "../components/CompCheckbox.vue";

import { accounts } from "../../js/imports/accounts.js";
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
                bank: {
                    value: "",
                    error: ""
                },
                balance: {
                    value: "",
                    error: ""
                },
                type: {
                    value: "",
                    error: ""
                },
                owner: {
                    value: "",
                    error: ""
                }
                // dispoCheckbox: {
                //     value: "",
                //     error: ""
                // },
                // dispo: {
                //     value: "",
                //     error: ""
                // }
                // resetDate: {
                //     value: "",
                //     error: ""
                // },
                // relatedAccount: {
                //     value: "",
                //     error: ""
                // }
            },
            accountTypes: [
                { name: "Girokonto", value: "checking" },
                { name: "Sparkonto", value: "saving" }
            ]
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
                accounts.setAccount(
                    store.userToken,
                    data => {
                        if (data) {
                            data = JSON.parse(data);
                            if (data.success) {
                                this.$router.push({ path: "/konten" });
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
                    },
                    $("#form").serialize()
                );
            } else {
                accounts.updateAccount(
                    store.userToken,
                    data => {
                        if (data) {
                            data = JSON.parse(data);
                            if (data.success) {
                                this.$router.push({ path: "/konten" });
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
                    },
                    $("#form").serialize()
                );
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/konten" });
        },
        deleteAccount: function(e) {
            e.preventDefault();

            accounts.deleteAccount(
                store.userToken,
                data => {
                    console.log(data);
                    if (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            this.$router.push({ path: "/konten" });
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
                },
                $("#form").serialize()
            );
        }
    },
    mounted: function() {
        if (this.id && this.id != "create") {
            accounts.getAccount(
                store.userToken,
                data => {
                    if (data) {
                        data = JSON.parse(data);
                        for (const [key, value] of Object.entries(data.item)) {
                            if (key in this.item) {
                                this.item[key].value = value;
                            }
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
