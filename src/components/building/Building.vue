<template>
    <div class="building">
        {{ type }}
    </div>
</template>

<script>
import { BUILDING_SIZE, BUILDING_STATUS, BUILDING_TYPE } from '@/utils/enums/building';

export default {
    name: 'Building',
    props: {
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
