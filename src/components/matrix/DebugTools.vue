<template>
    <div class="debug-tools">
        <button @click="unveilMap">
            UNVEIL MAP
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'DebugTools',
    methods: {
        ...mapActions('board/grid', [
            'unveilMap'
        ]),
    },
}
</script>

<style lang="scss">
.debug-tools {
    visibility: visible;
}
</style>
