<template>
    <div
        :class="['matrix-cell', data.resourceName, {
            'matrix-cell--hidden': isCellHidden
        }]"
        @click="$emit('onCellClick', { ...data })"
    >
        {{ getCellResourceToDisplay }}
    </div>
</template>

<script>
import { RESOURCE } from '@/utils/constants/index';

export default {
    name: 'MatrixCell',
    props: {
        data: {
            type: Object,
            required: true
        },
        isCellHidden: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        getCellResourceToDisplay() {
            return this.data.resourceQuantity;
        }
    }
}
</script>

<style lang="scss">
.matrix-cell {
    width: 25px;
    height: 25px;
    border: 1px solid black;
    cursor: pointer;

    &.mineral {
        background-color: $mineralColor;
    }

    &.fuel {
        background-color: $fuelColor;
    }

    &.gold {
        background-color: $goldColor;
    }

    &--hidden {
        background-color: #F0F0F0;
        border: none;
        cursor: initial;
    }
}
</style>
