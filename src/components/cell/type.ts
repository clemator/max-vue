import { CELL_MODULE, CELL_STATUS } from '@/components/cell/enums';
import Coordinates from '@/components/matrix/type';
import { RESOURCE_NAME } from '@/utils/enums/resource';

export default interface Cell {
    coordinates: Coordinates,
    module: CELL_MODULE,
    owner: string,
    resourceName: RESOURCE_NAME,
    resourceQuantity: number,
    status: CELL_STATUS,
}
