<template>
    <div class="matrix-display">
        <div
            class="matrix-display__line"
            v-for="(line, index) in grid"
            :key="index"
        >
            <div
                class="matrix-display__cell"
                v-for="cell in line"
                :key="`${cell.coordinates.Y},${cell.coordinates.X}`"
            >
                <CellComponent
                    :data="cell"
                    :isCellHidden="isCellHidden(cell)"
                    :onCellClick="onCellClick"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import CellComponent from '@/components/cell/Cell.vue';
import { CELL_STATUS } from '@/components/cell/enums';
import Cell from '@/components/cell/type';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'MatrixDisplay',
    components: {
        CellComponent,
    },
    computed: {
        ...mapState('board/grid', {
            grid: (state: any): Cell[][] => state.gridMatrix
        }),
    },
    methods: {
        ...mapActions('board/grid', [
            'setCellData',
        ]),
        isCellHidden(cell: Cell) {
            return cell.status === CELL_STATUS.HIDDEN;
        },
        onCellClick(cell: Cell) {
            if (cell.status === CELL_STATUS.HIDDEN) {
                this.setCellData({ ...cell, status: CELL_STATUS.DEFAULT});
            }
        },
    }
}
</script>

<style lang="scss">
.matrix-display {
    align-items: center;
    background-color: $lightGrey;
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

    &__cell {
        border: 1px solid black;
    }
}
</style>
