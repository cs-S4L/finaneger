<template>
    <div id="comp-selectfield" class="input input-select" :class="errorClass" :error="error">
        <label :for="name">{{ label }}</label>
        <span class="error">{{ error }}</span>
        <div class="select-wrapper">
            <select :name="name" :value="value" v-on:change="updateValue($event)">
                <option value=""></option>
                <option :value="option.value" :key="" v-for="option in options">{{
                    option.name
                }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {},
        label: {},
        error: {},
        value: {},
        options: {}
    },
    components: {},
    computed: {
        errorClass() {
            if (this.error) {
                return "error";
            } else {
                return "";
            }
        }
    },
    methods: {
        updateValue: function(e) {
            this.$emit("input", e.target.value);
        }
    }
};
</script>

<style></style>
