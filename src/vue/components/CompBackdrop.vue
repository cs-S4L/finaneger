<template>
    <div id="comp-backdrop" class="backdrop" :class="visibleClass">
        <div class="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {}
    },
    components: {},
    computed: {
        visibleClass() {
            if (this.visible) {
                return "test";
            } else {
                return "hide";
            }
        }
    },
    methods: {}
};
</script>

<style></style>
