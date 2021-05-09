<template>
    <div class="max-vue-layout">
        <TopToolbar />
        <MatrixDisplay />
        <DebugTools />
    </div>
</template>

<script>
import { CELL_STATUS } from '@/components/cell/enums';
import DebugTools from '@/components/matrix/DebugTools';
import MatrixDisplay from '@/components/matrix/MatrixDisplay';
import TopToolbar from '@/components/TopToolbar';
import RESOURCE from '@/utils/constants/resource';

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