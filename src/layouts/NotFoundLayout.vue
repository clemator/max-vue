<template>
    <div class="not-found-layout">
        <TopToolbar />
        <NotFoundComponent />
    </div>
</template>

<script lang="ts">
import TopToolbar from '@/components/TopToolbar.vue';
import NotFoundComponent from '@/components/NotFoundComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotFoundLayout',
    components: {
        TopToolbar,
        NotFoundComponent
    }
});
</script>

<style lang="scss">
.not-found-layout {
    height: 100%;
    overflow-y: hidden;
    background-color: #f0f0f0;
}
</style>