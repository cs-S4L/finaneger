<template>
    <div id="comp-checkbox" class="input input-checkbox" :class="errorClass" :error="error">
        <input type="checkbox" :name="name" v-model="compChecked" :id="name" />
        <label :for="name">{{ label }}</label>
        <span class="error">{{ error }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: {},
        label: {},
        error: {},
        value: {}
    },
    components: {},
    computed: {
        errorClass() {
            if (this.error) {
                return "error";
            } else {
                return "";
            }
        },
        compChecked: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    methods: {}
};
</script>

<style></style>
