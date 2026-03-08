<template>
    <div class="not-found-layout">
        <TopToolbar />
        <NotFoundComponent />
    </div>
</template>

<script lang="ts" setup>
import TopToolbar from '@/components/TopToolbar.vue';
import NotFoundComponent from '@/components/NotFoundComponent.vue';
</script>

<style lang="scss">
.not-found-layout {
    height: 100%;
    overflow-y: hidden;
    background-color: #f0f0f0;
}
</style>