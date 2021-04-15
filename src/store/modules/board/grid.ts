import Cell from '@/components/matrix/cell/type';
import RESOURCE from '@/utils/constants/resource';
import { CELL_MODULE, CELL_STATUS } from '@/utils/enums/cell';
import { RESOURCE_NAME } from '@/utils/enums/resource';
import { filter, flatten, isEmpty } from '@/utils/fp';
import cache from '@/storage/cache';
import { RootState } from '@/store/types';
import {
    ActionContext,
    ActionTree,
    GetterTree,
    Module,
    MutationTree,
} from 'vuex';

export interface GridState {
    height: number;
    width: number;
    gridMatrix: Cell[][];
}

const state: GridState = {
    height: 100,
    width: 100,
    gridMatrix: []
};

const getters: GetterTree<GridState, RootState> = {
    modifiedMatrixCells: (state): Cell[] => {
        return filter(
            (cell) => cell.status !== CELL_STATUS.HIDDEN,
            flatten(state.gridMatrix)
        );
    },
    unmodifiedMatrixCells: (state): Cell[] => {
        return filter(
            (cell) => cell.status === CELL_STATUS.HIDDEN,
            flatten(state.gridMatrix)
        );
    },
    getCell: (state) => ({ X, Y }: { X: number; Y: number }): Cell => state.gridMatrix[Y][X],
};

const actions: ActionTree<GridState, RootState> = {
    /**
     * Set Cache Data
     *  - Retrieve cached data and hydrate the store
     * @param {Object} context
     */
    async setCacheData({ commit }: ActionContext<GridState, RootState>) {
        const cells: Cell[] = await cache.get('GRID', 'CELLS');

        if (isEmpty(cells))
            cache.set('GRID', 'CELLS', []);

        cells.forEach((cell) => {
            commit('mutateCellData', cell);
        });
    },
    /**
     * Initialize the grid with given properties
     * @param {Object} param0 
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
    initializeGrid({ commit }: ActionContext<GridState, RootState>, gridOptions) {
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
        const cellDefaultStatus = CELL_STATUS.HIDDEN;
        const cellDefaultOwner = '';
        const cellDefaultModule = CELL_MODULE.NONE;
        const matrixArrayCell: Cell = {
            status: status || cellDefaultStatus,
            owner: owner || cellDefaultOwner,
            module: module || cellDefaultModule,
            resourceName: RESOURCE_NAME.NONE,
            resourceQuantity: 0,
            coordinates: { X: 0, Y: 0 },
        };
        let matrix = [];
        let matrixArray = [];

        commit('setGridSize', { height, width });

        for (let i = 0; i < height; i++) {
            matrixArray = [];
            for (let j = 0; j < width; j++) {
                const resourceTypeRand = Math.random();
                matrixArrayCell.coordinates.X = j;
                matrixArrayCell.coordinates.Y = i;
                matrixArrayCell.resourceName = RESOURCE_NAME.NONE;
                matrixArrayCell.resourceQuantity = 0;

                if (resourceTypeRand <= mineralRatio) {
                    matrixArrayCell.resourceName = resourceTypeRand <= goldRatio
                        ? RESOURCE_NAME.GOLD : resourceTypeRand <= fuelRatio
                        ? RESOURCE_NAME.FUEL : RESOURCE_NAME.MINERAL;
                    matrixArrayCell.resourceQuantity = Math.trunc(Math.random() * RESOURCE.MAXIMUM_PER_CELL) + RESOURCE.MINIMUM_PER_CELL;
                }
                matrixArray.push({ ...matrixArrayCell });
            }
            matrix.push(matrixArray);
        }

        commit('setGridContent', matrix);
    },
    async setCellData({ commit, getters }: ActionContext<GridState, RootState>, cell: Cell) {
        commit('mutateCellData', cell);
        await cache.set('GRID', 'CELLS', getters.modifiedMatrixCells);
    },
    async resetGrid({ commit }: ActionContext<GridState, RootState>) {
        commit('setGridContent', []);
        commit('setGridSize', {});
        await cache.set('GRID', 'CELLS', undefined);
    },
    unveilMap({ commit, getters }: ActionContext<GridState, RootState>) {
        getters.unmodifiedMatrixCells.forEach(
            (cell: Cell) => commit('mutateCellData', { ...cell, status: CELL_STATUS.DEFAULT })
        );
    }
};

const mutations: MutationTree<GridState> = {
    setGridSize(state, { height, width }: { height: number; width: number }) {
        state.height = height;
        state.width = width;
    },
    setGridContent(state, matrix: Cell[][]) {
        state.gridMatrix = matrix;
    },
    mutateCellData(state,
        { X, Y, status, owner, module }:
        { X: number; Y: number; status: CELL_STATUS; owner: string; module: CELL_MODULE }
    ) {
        state.gridMatrix[Y][X].status = status;
        state.gridMatrix[Y][X].owner = owner;
        state.gridMatrix[Y][X].module = module;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
