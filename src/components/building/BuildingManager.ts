import { BUILDING_ACTION, BUILDING_TYPE } from '@/utils/enums/building';
import Building from '@/components/building/type';

class BuildingManager {
    public invokeBuildingAction(building: Building): void {
        return;
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
}

const buildingManager = new BuildingManager();
export default buildingManager;
