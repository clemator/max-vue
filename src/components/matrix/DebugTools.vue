<template>
    <div class="debug-tools">
        <button @click="unveilMap">
            UNVEIL MAP
        </button>

        <button @click="hideMap">
            HIDE MAP
        </button>

        <button @click="waveFunctionCollapseAll">
            COLLAPSE ALL
        </button>

        <button @click="waveFunctionCollapse">
            COLLAPSE ONE
        </button>
    </div>
</template>

<script lang="ts" setup>
import { useGridStore } from '@/store/useGridStore';

const { hideMap, unveilMap, waveFunctionCollapse, waveFunctionCollapseAll } = useGridStore();
</script>

<style lang="scss">
.debug-tools {
    visibility: visible;
}
</style>
