<template>
    <div class="debug-tools">
        <button @click="unveilMap">
            UNVEIL MAP
        </button>
    </div>
</template>

<script lang="ts" setup>
import { useGridStore } from '@/store/useGridStore';

const { unveilMap } = useGridStore();
</script>

<style lang="scss">
.debug-tools {
    visibility: visible;
}
</style>
