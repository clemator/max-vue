<template>
    <div class="building">
        {{ type }}
    </div>
</template>

<script lang="ts">
import { BUILDING_SIZE, BUILDING_STATUS, BUILDING_TYPE } from '@/components/building/enums';

export default {
    name: 'Building',
    propsData: {
        coordinates: {
            type: Array,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        size: {
            type: BUILDING_SIZE,
            required: true,
        },
        status: {
            type: BUILDING_STATUS,
            required: true,
        },
        type: {
            type: BUILDING_TYPE,
            required: true,
        },
    },
}
</script>
