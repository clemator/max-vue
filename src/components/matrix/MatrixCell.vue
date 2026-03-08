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

<script lang="ts" setup>
import { Cell } from '@/models/types/cell.type';
import { computed } from 'vue';

const props = defineProps<{
    data: Cell,
    isCellHidden: boolean,
    onCellClick: (cellData: Cell) => void,
}>();

const getCellResourceToDisplay = computed(() => {
    return props.data.resourceQuantity;
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
