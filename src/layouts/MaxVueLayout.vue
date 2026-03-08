<template>
    <div class="max-vue-layout">
        <TopToolbar />
        <MatrixDisplay />
        <DebugTools />
    </div>
</template>

<script lang="ts" setup>
import TopToolbar from '@/components/TopToolbar.vue';
import MatrixDisplay from '@/components/matrix/MatrixDisplay.vue';
import DebugTools from '@/components/matrix/DebugTools.vue';
import CELL from '@/models/constants/cell';
import RESOURCE from '@/models/constants/resource';
import { useGridStore } from '@/store/useGridStore';
import { onMounted } from 'vue';

const gridStore = useGridStore();
const gridOptions = {
    height: 25,
    width: 25,
    status: CELL.STATUS.HIDDEN,
    mineralRatio: RESOURCE.RATIO.MINERAL,
    fuelRatio: RESOURCE.RATIO.FUEL,
    goldRatio: RESOURCE.RATIO.GOLD,
};

onMounted(() => {
    gridStore.initializeGrid(gridOptions);
});
</script>

<style lang="scss">
@use 'styles/variables/_color' as color;

.max-vue-layout {
    background-color: color.$lightGrey;
}
</style>