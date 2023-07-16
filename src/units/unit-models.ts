import { UnitTypeAttack, UnitTypeBuild, UnitTypeProbe } from "@/units/unit-types";

export enum UNIT_NAMES {
    PROBE = 'probe',
    ATTACK = 'attack',
    BUILD = 'build',
}

export const baseProbeUnit: UnitTypeProbe = {
    type: UNIT_NAMES.PROBE,
    position: {
        X: -1,
        Y: -1,
    },
    movement: 4,
    resourceScanRange: 3,
}

export const baseAttackUnit: UnitTypeAttack = {
    type: UNIT_NAMES.ATTACK,
    position: {
        X: -1,
        Y: -1,
    },
    movement: 4,
    damage: 1,
    unitScanRange: 3,
}

export const baseBuildUnit: UnitTypeBuild = {
    type: UNIT_NAMES.BUILD,
    position: {
        X: -1,
        Y: -1,
    },
    movement: 4,
    cargo: 0,
}
