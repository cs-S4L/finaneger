<template>
    <div id="site-accountsEdit" class="site">
        <div class="site-inner">
            <h2 class="site-title">Konto editieren</h2>

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
                        <comp-text-field
                            label="Bank"
                            name="bank"
                            :error="item.bank.error"
                            v-model="item.bank.value"
                        >
                        </comp-text-field>
                    </div>

                    <div class="col">
                        <comp-text-field
                            label="Kontostand"
                            name="balance"
                            :error="item.balance.error"
                            v-model="item.balance.value"
                            innerClass="currency"
                            formatType="currency"
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
                            :options="accountTypes"
                        >
                        </comp-select-field>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <comp-text-field
                            label="Kontoinhaber"
                            name="owner"
                            :error="item.owner.error"
                            v-model="item.owner.value"
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

                <div class="row">
                    <div class="col left-content">
                        <input
                            type="button"
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
        setErrors: function(errors) {
            for (const [key, value] of Object.entries(data.error)) {
                if (key in this.item) {
                    this.item[key].error = value;
                }
            }
        },
        handleSubmitData: function(data) {
            if (data) {
                data = JSON.parse(data);
                if (data.success) {
                    this.$router.push({ path: "/konten" });
                } else {
                    if (data.error) {
                        this.setErrors(data.error);
                    } else {
                        console.log("Error! No further Information given!");
                    }
                }
            }
        },
        submitEdit: function(e) {
            if (this.id && this.id == "create") {
                accounts.setAccount(
                    store.userToken,
                    data => {
                        this.handleSubmitData(data);
                    },
                    $("#form").serialize()
                );
            } else {
                accounts.updateAccount(
                    store.userToken,
                    data => {
                        this.handleSubmitData(data);
                    },
                    $("#form").serialize()
                );
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/konten" });
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
