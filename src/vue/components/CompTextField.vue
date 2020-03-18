<template>
    <div id="comp-textfield" class="input input-text" :class="errorClass" :error="error">
        <label :for="name">{{ label }}</label>
        <span class="error">{{ error }}</span>
        <div class="input-inner" :class="innerClass">
            <input
                :type="type"
                :name="name"
                :value="compValue"
                v-on:blur="updateValue($event)"
                ref="input"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {},
        label: {},
        type: { default: "text" },
        error: {},
        value: {},
        innerClass: {},
        formatType: {}
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
        compValue() {
            var newVal = this.value;
            switch (this.formatType) {
                case "currency":
                    newVal = this.$numeral(this.value).format("0,0.00");
                    break;
                case "date":
                    newVal = moment(this.value, ["DD.MM.YYYY", "YYYY.MM.DD"]).format("DD.MM.YYYY");
                    break;
                default:
                    newVal = this.value;
            }
            this.$emit("input", newVal);

            return newVal;
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
