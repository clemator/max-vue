<template>
    <div class="not-found-layout">
        <TopToolbar />
        <NotFoundComponent />
    </div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar';
import NotFoundComponent from '@/components/NotFoundComponent';

export default {
    name: 'NotFoundLayout',
    components: {
        TopToolbar,
        NotFoundComponent
    }
};
</script>

<style lang="scss">
.not-found-layout {
    height: 100%;
    overflow-y: hidden;
    background-color: #f0f0f0;
}
</style>