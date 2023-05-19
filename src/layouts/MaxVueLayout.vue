<template>
    <div class="max-vue-layout">
        <TopToolbar />
        <MatrixDisplay />
        <DebugTools />
    </div>
</template>

<script lang="ts">
import TopToolbar from '@/components/TopToolbar.vue';
import MatrixDisplay from '@/components/matrix/MatrixDisplay.vue';
import DebugTools from '@/components/matrix/DebugTools.vue';
import CELL from '@/utils/constants/cell';
import RESOURCE from '@/utils/constants/resource';
import { defineComponent } from 'vue';

export default defineComponent({
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
                status: CELL.STATUS.HIDDEN,
                mineralRatio: RESOURCE.RATIO.MINERAL,
                fuelRatio: RESOURCE.RATIO.FUEL,
                goldRatio: RESOURCE.RATIO.GOLD,
            },
        }
    },
    created() {
        this.$store.dispatch('board/grid/initializeGrid', this.gridOptions);
    },
});
</script>

<style lang="scss">
.max-vue-layout {
    background-color: $lightGrey;
}
</style>