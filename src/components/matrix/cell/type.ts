import { CELL_MODULE, CELL_STATUS } from '@/utils/enums/cell';
import { RESOURCE_NAME } from '@/utils/enums/resource';

export default interface Cell {
    status: CELL_STATUS,
    owner: string,
    module: CELL_MODULE,
    resourceName: RESOURCE_NAME,
    resourceQuantity: number,
}
