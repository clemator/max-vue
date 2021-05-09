<template>
    <div class="debug-tools">
        <button @click="unveilMap">
            UNVEIL MAP
        </button>
        <button @click="debugFunction">
            DEBUG FUNCTION
        </button>
    </div>
</template>

<script lang="ts">
import buildingManager from '@/components/building/BuildingManager';
import { BUILDING_SIZE, BUILDING_STATUS, BUILDING_TYPE } from '@/components/building/enums';
import Building from '@/components/building/type';
import Cell from '@/components/cell/type';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'DebugTools',
    computed: {
        ...mapGetters('board/grid', ['getCell']),
        getFirstCell(): Cell {
            return this.getCell({ X: 0, Y: 0 });
        }
    },
    methods: {
        ...mapActions('board/grid', [
            'unveilMap'
        ]),
        debugFunction() {
            const building: Building = {
                cells: [this.getFirstCell],
                owner: '',
                size: BUILDING_SIZE.SMALL,
                status: BUILDING_STATUS.DEFAULT,
                type: BUILDING_TYPE.REFINERY,
            };
            buildingManager.invokeBuildingAction(building);
        }
    },
}
</script>

<style lang="scss">
.debug-tools {
    visibility: visible;
}
</style>
