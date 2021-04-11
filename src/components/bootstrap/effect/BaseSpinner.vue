<script>
/**
 *  Base component proxy from "vue-spinner" library
 *    - Only importing the PulseLoader component for now as base one
 *
 *  @props {string} size (css format)
 *  @props {string} color
 *  @props {string} margin (css format)
 *  @props {string} radius
 *
 *  @link https://github.com/greyby/vue-spinner
 */
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
    name: "BaseSpinner",
    components: {
        PulseLoader,
    },
};
</script>

<template>
    <pulse-loader v-bind="$attrs" class="base-spinner" />
</template>

<style lang="scss">
.base-spinner {
    display: flex;
    justify-content: center;
}
</style>
