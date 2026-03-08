<template>
    <div class="matrix-display">
        <div
            class="matrix-display__line"
            v-for="(line, index) in grid"
            :key="`line-${index}`"
        >
            <MatrixCell
                v-for="cell in line"
                :key="cell.Y + ',' + cell.X"
                :data="cell"
                :isCellHidden="isCellHidden(cell)"
                :onCellClick="onCellClick"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import MatrixCell from '@/components/matrix/MatrixCell.vue';
import CELL from '@/models/constants/cell';
import { Cell } from '@/models/types/cell.type';
import { useGridStore } from '@/store/useGridStore';
import { computed } from 'vue';

const gridStore = useGridStore();

const grid = computed(() => {
    return gridStore.gridMatrix;
});

const isCellHidden = (cell: Cell) => {
    return cell.status === CELL.STATUS.HIDDEN;
};

const onCellClick = (cell: Cell) => {
    if (cell.status === CELL.STATUS.HIDDEN) {
        gridStore.setCellData({ ...cell, status: CELL.STATUS.DEFAULT});
    }
};
</script>

<style lang="scss">
@use 'styles/variables/_color' as color;

.matrix-display {
    align-items: center;
    background-color: color.$lightGrey;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    margin: 16px;

    &__line {
        display: flex;
        max-width: 100%;
    }
}
</style>
