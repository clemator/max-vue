import { BUILDING_SIZE, BUILDING_STATUS, BUILDING_TYPE } from '@/components/building/enums';
import Cell from '@/components/cell/type';

export default interface Building {
    cells: Cell[],
    owner: string,
    size: BUILDING_SIZE,
    status: BUILDING_STATUS,
    type: BUILDING_TYPE,
}

export interface BuildingResources {
    [index: string]: number;
}
