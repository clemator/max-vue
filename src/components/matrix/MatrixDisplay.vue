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

<script lang="ts">
import { mapActions, mapState } from 'vuex';
import MatrixCell from '@/components/matrix/MatrixCell.vue';
import CELL from '@/utils/constants/cell';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MatrixDisplay',
    components: {
        MatrixCell
    },
    computed: {
        ...mapState('board/grid', {
            grid: state => state.gridMatrix
        }),
    },
    methods: {
        ...mapActions('board/grid', [
            'setCellData',
        ]),
        isCellHidden(cell) {
            return cell.status === CELL.STATUS.HIDDEN;
        },
        onCellClick(cell) {
            if (cell.status === CELL.STATUS.HIDDEN) {
                this.setCellData({ ...cell, status: CELL.STATUS.DEFAULT});
            }
        },
    }
});
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
}
</style>
