import CELL from '@/utils/constants/cell';
import RESOURCE from '@/utils/constants/resource';
import { filter, flatten, isEmpty } from '@/utils/fp';
import cache from '@/storage/cache';

const state = {
    height: 100,
    width: 100,
    gridMatrix: []
};

const getters = {
    modifiedMatrixCells: state => {
        return filter(cell => cell.status !== CELL.STATUS.DEFAULT, flatten(state.gridMatrix));
    },
    getCell: state => ({ X, Y }) => state.gridMatrix[Y][X],
};

const actions = {
    /**
     * Set Cache Data
     *  - Retrieve cached data and hydrate the store
     * @param {Object} context
     */
    async setCacheData({ commit }) {
        const cells = await cache.get('GRID', 'CELLS');

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
    initializeGrid({ commit }, gridOptions) {
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

        commit('setGridSize', { height, width });

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

        commit('setGridContent', matrix);
    },
    async setCellData({ commit, getters }, cell) {
        commit('mutateCellData', cell);
        await cache.set('GRID', 'CELLS', getters.modifiedMatrixCells);
    },
    async resetGrid({ commit }) {
        commit('setGridContent', []);
        commit('setGridSize', {});
        await cache.set('GRID', 'CELLS', undefined);
    }
};

const mutations = {
    setGridSize(state, { height, width }) {
        state.height = height;
        state.width = width;
    },
    setGridContent(state, matrix) {
        state.gridMatrix = matrix;
    },
    mutateCellData(state, { X, Y, status, owner, module }) {
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
