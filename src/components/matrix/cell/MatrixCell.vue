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

<script>
export default {
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
}
</script>

<style lang="scss">
.matrix-cell {
    border: 1px solid black;
    height: $cellSize;
    line-height: $cellSize;
    user-select: none;
    width: $cellSize;

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
        background-color: $lightGrey;
        cursor: pointer;
    }
}
</style>
