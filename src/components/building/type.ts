import { BUILDING_SIZE, BUILDING_STATUS, BUILDING_TYPE } from '@/utils/enums/building';
import Coordinates from '@/components/matrix/type';

export default interface Building {
    coordinates: Coordinates[],
    owner: string,
    size: BUILDING_SIZE,
    status: BUILDING_STATUS,
    type: BUILDING_TYPE,
}
