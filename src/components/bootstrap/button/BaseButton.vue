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
        v-on="onEvent()"
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

<script lang="ts">
import BaseSpinner from '@/components/bootstrap/effect/BaseSpinner.vue';
import BaseRipple from '@/components/bootstrap/effect/BaseRipple.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseButton',
    components: {
        BaseSpinner,
        BaseRipple
    },
    props: {
        status: {
            type: String,
            required: false,
            default: 'default'
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        },
        variant: {
            type: String,
            required: false,
            default: 'primary'
        }
    },
    methods: {
        onEvent() {
            return {
                ...this.$listeners,
                click: this.onClick
            }
        },
        onClick() {
            if (this.status !== 'disabled')
                return this.$emit('click')
        }
    }
});
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