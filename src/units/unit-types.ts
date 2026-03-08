export type UnitType = {
    type: string;
    position: {
        X: number;
        Y: number;
    };
    movement: number;
}

export type UnitTypeProbe = UnitType & {
    resourceScanRange: number;
}

export type UnitTypeAttack = UnitType & {
    damage: number;
    unitScanRange: number;
}

export type UnitTypeBuild = UnitType & {
    cargo: number;
}
