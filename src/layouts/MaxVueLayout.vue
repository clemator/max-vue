<template>
    <div class="max-vue-layout">
        <TopToolbar />
        <MatrixDisplay />
        <DebugTools />
    </div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar';
import MatrixDisplay from '@/components/matrix/MatrixDisplay';
import DebugTools from '@/components/matrix/DebugTools';
import RESOURCE from '@/utils/constants/resource';
import { CELL_STATUS } from '@/utils/enums/cell';

export default {
    name: 'MaxVueLayout',
    components: {
        DebugTools,
        MatrixDisplay,
        TopToolbar,
    },
    data() {
        return {
            gridOptions: {
                height: 25,
                width: 25,
                status: CELL_STATUS.HIDDEN,
                mineralRatio: RESOURCE.RATIO.MINERAL,
                fuelRatio: RESOURCE.RATIO.FUEL,
                goldRatio: RESOURCE.RATIO.GOLD,
            },
        }
    },
    created() {
        this.$store.dispatch('board/grid/initializeGrid', this.gridOptions);
    },
}
</script>

<style lang="scss">
.max-vue-layout {
    background-color: $lightGrey;
}
</style>