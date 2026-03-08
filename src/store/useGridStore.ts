import CELL from '@/models/constants/cell';
import RESOURCE from '@/models/constants/resource';
import { Cell } from '@/models/types/cell.type';
import { _filter, _flatten } from '@/utils/fp';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useGridStore = defineStore('useGridStore', () => {
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
            status,
            owner,
            module,
            mineralRatio,
            fuelRatio,
            goldRatio,
        } = gridOptions;
        const cellDefaultStatus = CELL.STATUS.HIDDEN;
        const cellDefaultOwner = '';
        const cellDefaultModule = CELL.MODULE.NONE;
        const matrixArrayCell = {
            status: status || cellDefaultStatus,
            owner: owner || cellDefaultOwner,
            module: module || cellDefaultModule,
            resourceName: RESOURCE.NAME.NONE,
            resourceQuantity: 0,
        };
        let matrix = [];
        let matrixArray = [];

        setGridSize({ height, width });

        for (let i = 0; i < height; i++) {
            matrixArray = [];
            for (let j = 0; j < width; j++) {
                const resourceTypeRand = Math.random();
                matrixArrayCell.resourceName = RESOURCE.NAME.NONE;
                matrixArrayCell.resourceQuantity = 0;

                if (resourceTypeRand <= mineralRatio) {
                    matrixArrayCell.resourceName = resourceTypeRand <= goldRatio
                        ? RESOURCE.NAME.GOLD : resourceTypeRand <= fuelRatio
                        ? RESOURCE.NAME.FUEL : RESOURCE.NAME.MINERAL;
                    matrixArrayCell.resourceQuantity = Math.trunc(Math.random() * RESOURCE.MAXIMUM_PER_CELL) + RESOURCE.MINIMUM_PER_CELL;
                }
                matrixArray.push({ ...matrixArrayCell, X: j, Y: i });
            }
            matrix.push(matrixArray);
        }

        setGridContent(matrix);
    };

    const resetGrid = () => {
        setGridContent([]);
        setGridSize({ height: 100, width: 100});
    };

    const unveilMap = () => {
        unmodifiedMatrixCells.value.forEach(
            (cell) => setCellData({ ...cell, status: CELL.STATUS.DEFAULT })
        );
    };

    return {
        getCell,
        gridMatrix,
        initializeGrid,
        resetGrid,
        setCellData,
        setGridContent,
        setGridSize,
        unveilMap,
    };
});
