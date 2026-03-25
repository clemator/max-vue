import CELL from '@/models/constants/cell';
import RESOURCE from '@/models/constants/resource';
import { Cell } from '@/models/types/cell.type';

const MAX_ENTROPY = 10;
const cellDefaultStatus = CELL.STATUS.HIDDEN;
const cellDefaultOwner = '';
const cellDefaultModule = CELL.MODULE.NONE;

function initCell(x: number, y: number, resourceName: string, resourceQuantity): Cell {
    const cell: Cell = {
        addNeighbour: (direction, cell) => {
            this.neighbours.set(direction, cell);
        },
        collapse: () => {
            // TODO: fix this by adding weight to each type of cell
            this.type = this.possibilities[Math.floor(Math.random() * this.possibilities.length)];
            this.entropy = 0;
        },
        constraint: (neighbourPossibilities, direction) => {
            let reduced = false;
            if (this.entropy > 0) {
                const connectors = [];
            }
        },
        entropy: MAX_ENTROPY,
        getDirections: () => {
            return this.neighbours.keys();
        },
        getNeighbour: (direction) => {
            return this.neighbours.get(direction);
        },
        getPossibilities: () => this.possibilities,
        module: cellDefaultModule,
        neighbours: new Map(),
        owner: cellDefaultOwner,
        possibilities: [''], // TODO: fix possibilites
        type: 'none',
        resourceName,
        resourceQuantity,
        status: cellDefaultStatus,
        X: x,
        Y: y,
    };

    return cell;
};

export default initCell;
