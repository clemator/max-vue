import { UNIT_NAMES, baseAttackUnit, baseBuildUnit, baseProbeUnit } from '@/units/unit-models';
import { _clone } from '@/utils/fp';
import { UnitTypeAttack, UnitTypeBuild, UnitTypeProbe } from '@/units/unit-types';

export const getBaseUnitType = (unitName: UNIT_NAMES) => {
    switch (unitName) {
        case UNIT_NAMES.PROBE:
            return _clone<UnitTypeProbe>(baseProbeUnit);
        case UNIT_NAMES.BUILD:
            return _clone<UnitTypeBuild>(baseBuildUnit);
        case UNIT_NAMES.ATTACK:
            return _clone<UnitTypeAttack>(baseAttackUnit);
    }
}
