<template>
    <div class="max-vue-layout">
        <TopToolbar />
        <MatrixDisplay />
    </div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar';
import MatrixDisplay from '@/components/matrix/MatrixDisplay';
import { RESOURCE } from '@/utils/constants/index';

export default {
    name: 'MaxVueLayout',
    components: {
        MatrixDisplay,
        TopToolbar,
    },
    data() {
        return {
            gridOptions: {
                height: 25,
                width: 25,
                mineralRatio: RESOURCE.RATIO.MINERAL,
                fuelRatio: RESOURCE.RATIO.FUEL,
                goldRatio: RESOURCE.RATIO.GOLD,
            }
        }
    },
    created() {
        this.$store.dispatch('board/grid/initializeGrid', this.gridOptions);
    }
}
</script>

<style lang="scss">
.max-vue-layout {
    background-color: #f0f0f0;
}
</style>