import { CELL_MODULE, CELL_STATUS } from '@/utils/enums/cell';
import { RESOURCE_NAME } from '@/utils/enums/resource';
import Coordinates from '@/components/matrix/type';

export default interface Cell {
    coordinates: Coordinates,
    module: CELL_MODULE,
    owner: string,
    resourceName: RESOURCE_NAME,
    resourceQuantity: number,
    status: CELL_STATUS,
}
