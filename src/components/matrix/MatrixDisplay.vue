<template>
    <div class="matrix-display">
        <div
            class="matrix-display__line"
            v-for="(line, index) in grid"
            :key="index"
        >
            <div
                v-for="cell in line"
                :key="cell.Y + ',' + cell.X"
            >
                <MatrixCell
                    :data="cell"
                    :isCellHidden="cell.status === 'default' ? true : false"
                    @onCellClick="onCellClick"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MatrixCell from '@/components/matrix/MatrixCell';
import { CELL } from '@/utils/constants/index';

export default {
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
        /**
         * On Cell Click
         * - Handle the cell click interaction
         * @param {Object} cellData
         */
        onCellClick(cellData) {
            const modifiedCellData = { ...cellData };

            this.$store.dispatch('board/grid/setCellData', modifiedCellData);
        }
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
}
</style>
