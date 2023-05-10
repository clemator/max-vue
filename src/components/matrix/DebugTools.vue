<template>
    <div class="debug-tools">
        <button @click="unveilMap">
            UNVEIL MAP
        </button>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DebugTools',
    methods: {
        ...mapActions('board/grid', [
            'unveilMap'
        ]),
    },
});
</script>

<style lang="scss">
.debug-tools {
    visibility: visible;
}
</style>
