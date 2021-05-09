import { BUILDING_ACTION, BUILDING_TYPE } from '@/components/building/enums';
import Building, { BuildingResources } from '@/components/building/type';
import Cell from '@/components/cell/type';
import { RESOURCE_NAME } from '@/utils/enums/resource';

class BuildingManager {
    public invokeBuildingAction(building: Building): void {
        const action = this.getActionTypeByBuildingType(building.type);
        this.actionsByType[action](building);
    }

    private getActionTypeByBuildingType(type: BUILDING_TYPE): BUILDING_ACTION {
        switch (type) {
            case BUILDING_TYPE.REFINERY:
                return BUILDING_ACTION.REFINE;
            case BUILDING_TYPE.WALL:
            default:
                return BUILDING_ACTION.NONE;
        }
    }

    private actionsByType: { [key in BUILDING_ACTION]: (building: Building) => void} = {
        [BUILDING_ACTION.REFINE]: (building) => {
            return this.getBuildingCellsResources(building);
        },
        [BUILDING_ACTION.PRODUCE]: (building) => {
            // TODO: fix when implementing production
            return building;
        },
        [BUILDING_ACTION.NONE]: (_) => {},
    }

    private getBuildingCellsResources(building: Building) {
        const resourcesOnBuilding: BuildingResources = {
            [RESOURCE_NAME.MINERAL]: 0,
            [RESOURCE_NAME.FUEL]: 0,
            [RESOURCE_NAME.GOLD]: 0,
        };

        return building.cells.reduce((acc: BuildingResources, cell: Cell) => {
            acc[cell.resourceName] += cell.resourceQuantity;
            return acc;
        }, resourcesOnBuilding);
    }
}

const buildingManager = new BuildingManager();
export default buildingManager;
