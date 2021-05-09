<template>
    <div
        :class="['cell', {
            [data.resourceName]: !isCellHidden,
            'cell--hidden': isCellHidden,
        }]"
        @click="onCellClick({ ...data })"
    >
        {{ !isCellHidden ? getCellResourceToDisplay : '' }}
    </div>
</template>

<script>
export default {
    name: 'Cell',
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
.cell {
    height: $cellSize;
    line-height: $cellSize;
    user-select: none;
    width: $cellSize;

    &.mineral,
    &.fuel,
    &.gold {
        border-radius: 50%;
        font-weight: 700;
    }

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
