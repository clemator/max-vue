<template>
    <div
        :class="['matrix-cell', {
            [data.resourceName]: !isCellHidden,
            'matrix-cell--hidden': isCellHidden,
        }]"
        @click="onCellClick({ ...data })"
    >
        {{ !isCellHidden ? getCellResourceToDisplay : '' }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MatrixCell',
    props: {
        data: {
            type: Object,
            required: true,
        },
        isCellHidden: {
            type: Boolean,
            required: true,
        },
        onCellClick: {
            type: Function,
            required: true,
        },
    },
    computed: {
        getCellResourceToDisplay() {
            return this.data.resourceQuantity;
        },
    },
});
</script>

<style lang="scss">
@use 'styles/variables/_color' as color;

.matrix-cell {
    border: 1px solid black;
    height: 25px;
    line-height: 25px;
    user-select: none;
    width: 25px;

    &.mineral {
        background-color: color.$mineralColor;
    }

    &.fuel {
        background-color: color.$fuelColor;
    }

    &.gold {
        background-color: color.$goldColor;
    }

    &--hidden {
        background-color: color.$lightGrey;
        cursor: pointer;
    }
}
</style>
