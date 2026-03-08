<template>
    <div
        :class="[
            'base-ripple',
            {
                'base-ripple--fluid': fluid,
                'base-ripple--spread': spread,
                'base-ripple--disabled': disabled
            }
        ]"
    >
        <slot/>
        <div
            :class="[
                'rippleJS',
                'base-ripple__inner',
                {
                    'fill': spread
                }
            ]"
        />
  </div>
</template>

<script lang="ts" setup>
/**
 *  Base component proxy for Vanilly Ripple JS effect library
 *  @link https://github.com/samthor/rippleJS
 *
 *  @props {boolean} fluid
 *  @props {boolean} spread
 *  @props {boolean} disabled
 *
 *  @link https://github.com/greyby/vue-spinner
 */

const props = defineProps<{
    fluid: boolean,
    spread: boolean,
    disabled: boolean,
    color: string,
}>();
</script>

<style lang="scss">
.base-ripple {
    $self: &;

    position: relative;
    // Default opacity
    &__inner { opacity: 0.4; }
    // Helper class allowing ripple effect to be applied
    // within the whole surface of the inner element
    &--fluid { height: 100%; width: 100%; display: block; }

    &--disabled {

        #{ $self }__inner { visibility: hidden; }
    }
}
</style>
