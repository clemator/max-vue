import CELL from '@/models/constants/cell.const';
import { cellRules, Directions } from '@/models/constants/config.const';
import RESOURCE from '@/models/constants/resource';
import { Cell } from '@/models/types/cell.type';
import initCell from '@/utils/cellConstructor';
import { _filter, _flatten } from '@/utils/fp';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useGridStore = defineStore('useGridStore', () => {
    const MAX_ENTROPY = 10;
    const gridHeight = ref(100);
    const gridWidth = ref(100);
    const gridMatrix = ref<Array<Cell[]>>([]);

    const getCell = computed(() => {
        return ({ X, Y }) => {
            return gridMatrix.value[Y][X];
        };
    });

    const modifiedMatrixCells = computed(() => {
        return _filter(
            (cell) => cell.status !== CELL.STATUS.HIDDEN,
            _flatten(gridMatrix.value)
        );
    });

    const unmodifiedMatrixCells = computed(() => {
        return _filter(
            (cell) => cell.status === CELL.STATUS.HIDDEN,
            _flatten(gridMatrix.value)
        );
    });

    const setGridSize = ({ height, width }) => {
        gridHeight.value = height;
        gridWidth.value = width;
    };

    const setGridContent = (matrix) => {
        gridMatrix.value = matrix;
    };

    const setCellData = ({ X, Y, status, owner, module }) => {
        gridMatrix.value[Y][X].status = status;
        gridMatrix.value[Y][X].owner = owner;
        gridMatrix.value[Y][X].module = module;
    };

    /**
     * Initialize the grid with given properties
     * @param {Object} gridOptions the options
     * @param {Number} gridOptions.height grid total height
     * @param {Number} gridOptions.width grid total width
     * @param {Number} gridOptions.mineralRatio grid mineral ratio
     * @param {Number} gridOptions.fuelRatio grid fuel ratio
     * @param {Number} gridOptions.goldRatio grid gold ratio
     * @param {String} gridOptions.status the cells status
     * @param {String} gridOptions.owner the cells owner
     * @param {String} gridOptions.module the cells module
     */
    const initializeGrid = (gridOptions) => {
        const {
            height,
            width,
            mineralRatio,
            fuelRatio,
            goldRatio,
        } = gridOptions;
        let matrix: Array<Cell[]> = [];
        let matrixArray = [];

        setGridSize({ height, width });

        for (let i = 0; i < height; i++) {
            matrixArray = [];
            for (let j = 0; j < width; j++) {
                const resourceTypeRand = Math.random();
                let resourceName = RESOURCE.NAME.NONE;
                let resourceQuantity = 0;

                if (resourceTypeRand <= mineralRatio) {
                    resourceName = resourceTypeRand <= goldRatio
                        ? RESOURCE.NAME.GOLD : resourceTypeRand <= fuelRatio
                        ? RESOURCE.NAME.FUEL : RESOURCE.NAME.MINERAL;
                    resourceQuantity = Math.trunc(Math.random() * RESOURCE.MAXIMUM_PER_CELL) + RESOURCE.MINIMUM_PER_CELL;
                }
                const matrixArrayCell = initCell(j, i, resourceName, resourceQuantity);
                matrixArray.push({ ...matrixArrayCell, X: j, Y: i });
            }
            matrix.push(matrixArray);
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = matrix[y][x];
                if (y > 0) cell.addNeighbour(Directions.NORTH, matrix[y-1][x]);
                if (x < width - 1) cell.addNeighbour(Directions.EAST, matrix[y][x+1]);
                if (y < height - 1) cell.addNeighbour(Directions.SOUTH, matrix[y+1][x]);
                if (x > 0) cell.addNeighbour(Directions.WEST, matrix[y][x-1]);
            }
        }

        setGridContent(matrix);
    };

    const waveFunctionCollapse = () => {
        const lowestEntropyCells = getLowestEntropyCells();

        if (lowestEntropyCells.length === 0) return 0;

        const cellToCollapse = lowestEntropyCells[Math.floor(Math.random() * lowestEntropyCells.length)];
        cellToCollapse.collapse();

        const stack: Cell[] = [];
        stack.push(cellToCollapse);

        while (stack.length > 0) {
            const cell = stack.pop();
            const cellPossibilities = cell.getPossibilities();
            const cellDirections = cell.getDirections();

            for (const direction of cellDirections) {
                const neighbour = cell.getNeighbour(direction);
                if (neighbour.entropy > 0) {
                    const reduced = neighbour.constraint(cellPossibilities, direction);
                    if (reduced === true) stack.push(neighbour);
                }
            }
        }

        return 1;
    };

    const getLowestEntropyCells = () => {
        let lowestEntropy = Object.keys(cellRules).length;
        const lowestCells = [];

        for (let y = 0; y < gridHeight.value; y++) {
            for (let x = 0; x < gridWidth.value; x++) {
                const cell = getCell.value({X: x, Y: y});
                if (cell.entropy > 0) {
                    if (cell.entropy < lowestEntropy) {
                        lowestEntropy = cell.entropy;
                        lowestCells.splice(0);
                    }
                    if (cell.entropy === lowestEntropy) {
                        lowestCells.push(getCell.value({X: x, Y: y}));
                    }
                }
            }
        }

        return lowestCells;
    };

    const hideMap = () => {
        modifiedMatrixCells.value.forEach(
            (cell) => {
                setCellData({ ...cell, status: CELL.STATUS.HIDDEN });
            }
        );
    };

    const resetGrid = () => {
        setGridContent([]);
        setGridSize({ height: 100, width: 100});
    };

    const unveilMap = () => {
        unmodifiedMatrixCells.value.forEach(
            (cell) => {
                setCellData({ ...cell, status: CELL.STATUS.DEFAULT });
            }
        );
    };

    const waveFunctionCollapseAll = () => {
        while (waveFunctionCollapse() === 1) {};
    };

    return {
        getCell,
        gridMatrix,
        hideMap,
        initializeGrid,
        resetGrid,
        setCellData,
        setGridContent,
        setGridSize,
        unveilMap,
        waveFunctionCollapse,
        waveFunctionCollapseAll,
    };
});
