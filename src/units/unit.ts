import { UNIT_NAMES } from '@/units/unit-models';
import { UnitType } from '@/units/unit-types';
import { getBaseUnitType } from '@/units/unit-tools';

export default function useUnit() {
    const createUnit = (unitName: UNIT_NAMES, X: number, Y: number): UnitType => {
        return getBaseUnitType(unitName);
    }
    
    return {
        createUnit,
    };
};