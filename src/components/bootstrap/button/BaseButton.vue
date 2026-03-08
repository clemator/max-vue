<template>
    <button
        :class="[
            'base-button',
            {
                'base-button--primary': variant === 'primary',
                'base-button--disabled': status === 'disabled',
                'base-button--waiting': status === 'waiting',
            }
        ]"
        :disabled="status === 'disabled'"
        :type="type"
        @click="status !== 'disabled' ? onClick : undefined"
    >
        <base-ripple
            class="base-button__inner"
            :color="'#000'"
            :disabled="status === 'disabled'"
            fluid
        >
            <base-spinner
                v-if="status === 'waiting'"
                size="14px"
                color="#FAFAFA"
                margin="2px 2px"
            />
            <slot v-else />
        </base-ripple>
    </button>
</template>

<script lang="ts" setup>
import BaseSpinner from '@/components/bootstrap/effect/BaseSpinner.vue';
import BaseRipple from '@/components/bootstrap/effect/BaseRipple.vue';

const props = defineProps<{
    onClick: () => void,
    status: string,
    type: 'button' | 'reset' | 'submit',
    variant: string,
}>();
</script>

<style lang="scss">
.base-button {
    display: inline-flex;

    padding: 0 16px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: #FFF;
    border-radius: 6px;
    transition: background-color 0.2s;
    min-height: 25px;
    outline: none;
    cursor: pointer;

    &__inner {
        padding: 5px 0;
    }

    &--primary {
        background-color: $primaryGreen;

        &:not([disabled]):hover, &:not([disabled]):focus {
            background-color: rgba(76, 175, 80, 0.85);
        }

        .rippleJS .ripple {
            color: rgb(46, 55, 50);
        }
    }

    &--disabled {
        opacity: 0.6;
    }

    &--disabled,
    &--waiting {
        cursor: initial;
    }
}
</style>