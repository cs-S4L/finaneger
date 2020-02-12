<template>
    <div id="comp-textfield" class="input input-text" :class="errorClass" :error="error">
        <label :for="name">{{label}}</label>
        <span class="error">{{error}}</span>
        <div class="input-inner" :class="innerClass">
            <input :type="type" :name="name" :value="value">
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: {},
        label: {},
        type: {default: 'text'},
        error: {},
        value: {},
        innerClass: {},
    },
    components: {},
    computed: {
        errorClass() {
            if (this.error) {
                return 'error';
            } else {
                return '';
            }
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>
