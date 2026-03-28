import CELL from '@/models/constants/cell.const';
import { CellEdges, cellRules, Directions } from '@/models/constants/config.const';
import { Cell } from '@/models/types/cell.type';

const cellDefaultStatus = CELL.STATUS.HIDDEN;
const cellDefaultOwner = '';
const cellDefaultModule = CELL.MODULE.NONE;
const MAX_ENTROPY = Object.keys(cellRules).length;

function initCell(x: number, y: number, resourceName: string, resourceQuantity): Cell {
    const cell: Cell = {
        addNeighbour: function(direction, cell) {
            this.neighbours.set(direction, cell);
        },
        collapse: function() {
            // TODO: fix this by adding weight to each type of cell
            this.type = this.possibilities[Math.floor(Math.random() * this.possibilities.length)];
            this.possibilities = [this.type];
            this.entropy = 0;
        },
        constraint: function(neighbourPossibilities, direction) {
            let reduced = false;
            if (this.entropy > 0) {
                const connectors: CellEdges[] = [];
                let oppositeDirection: Directions;

                for (const neighbourPossibility of neighbourPossibilities) {
                    connectors.push(cellRules[neighbourPossibility][direction]);
                }

                if (direction === Directions.NORTH) oppositeDirection = Directions.SOUTH;
                if (direction === Directions.SOUTH) oppositeDirection = Directions.NORTH;
                if (direction === Directions.WEST) oppositeDirection = Directions.EAST;
                if (direction === Directions.EAST) oppositeDirection = Directions.WEST;

                for (const possibility of [...this.possibilities]) {
                    if (!connectors.includes(cellRules[possibility][oppositeDirection])) {
                        this.possibilities = this.possibilities.filter((val) => val !== possibility);
                        reduced = true;
                    }
                }
                this.entropy = this.possibilities.length;

                return reduced;
            }
        },
        entropy: MAX_ENTROPY,
        getDirections: function() {
            return this.neighbours.keys();
        },
        getNeighbour: function(direction) {
            return this.neighbours.get(direction);
        },
        getPossibilities: function() {
            return this.possibilities;
        },
        module: cellDefaultModule,
        neighbours: new Map(),
        owner: cellDefaultOwner,
        possibilities: Array.from(Array(35).keys()),
        type: null,
        resourceName,
        resourceQuantity,
        status: cellDefaultStatus,
        X: x,
        Y: y,
    };

    return cell;
};

export default initCell;
