import { CellTypes, Directions } from '@/models/constants/config.const';

export type Cell = {
    addNeighbour: (direction: Directions, cell: Cell) => void;
    collapse: () => void;
    constraint: (neighbourPossibilities: CellTypes[], direction: Directions) => boolean;
    entropy: number;
    getDirections: () => Directions[];
    getNeighbour: (direction: Directions) => Cell;
    getPossibilities: () => CellTypes[];
    module: string;
    neighbours: Map<Directions, Cell>;
    owner: string;
    possibilities: CellTypes[];
    resourceName: string;
    resourceQuantity: number;
    status: string;
    type: CellTypes | null;
    X: number;
    Y: number;
};
