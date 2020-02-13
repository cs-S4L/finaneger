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

import { accounts } from "../../js/imports/accounts.js";

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
                accounts.setAccount(data => {
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
                }, $("#form").serialize());
            } else {
                accounts.updateAccount(data => {
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
                }, $("#form").serialize());
            }
        },
        abortEdit: function(e) {
            this.$router.push({ path: "/finanzen" });
        }
    },
    mounted: function() {
        if (this.id && this.id != "create") {
            accounts.getAccount(data => {
                console.log(data);
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
                }
            }, this.id);
        }
    }
};
</script>

<style></style>
