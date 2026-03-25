export type Cell = {
    addNeighbour: (direction: string, cell: Cell) => void;
    collapse: () => void;
    constraint: (neighbourPossibilities: string[], direction: string) => void;
    entropy: number;
    getDirections: () => string[];
    getNeighbour: (direction: string) => Cell;
    getPossibilities: () => string[];
    module: string;
    neighbours: Map<string, Cell>;
    owner: string;
    possibilities: string[];
    resourceName: string;
    resourceQuantity: number;
    status: string;
    type: string;
    X: number;
    Y: number;
};
