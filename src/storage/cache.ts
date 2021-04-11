/**
 * Simple singleton performing cache methods
 */

import { fromJSON } from '@/utils/fp';

const CACHE_DB_NAME = 'maxVue';

const cache = {
    handler: window.localStorage,
    /**
     * Get key from cache
     * @param {String} store
     * @param {String} key
     * @return {Promise} <*>
     */
    get(store: string, key: string) {
        let keyName = `${CACHE_DB_NAME}::${store}::${key}`;
        let keyValue = fromJSON(this.handler.getItem(keyName));

        return Promise.resolve(keyValue);
    },
    /**
     * Set a value in cache
     * @param {String} store
     * @param {String} key
     * @return {Promise} <*>
     */
    set(store: string, key: string, value: any) {
        let keyName = `${CACHE_DB_NAME}::${store}::${key}`;

        this.handler.setItem(keyName, JSON.stringify(value));

        return this.get(store, key);
    },
    /**
     * Destroy current cache
     * @return {Promise}
     */
    destroy() {
        this.handler.clear();

        return Promise.resolve();
    }
}

export default cache;
