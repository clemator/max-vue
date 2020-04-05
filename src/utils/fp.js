/**
 * Smart Reference for Ramda methods
 *
 * - Dissociate Ramda `isEmpty` and real `isEmpty` one
 * - Add extra methods
 *   - `isEmpty`
 *   - `typeOf`
 *   - `toString`
 *   - `fromJSON`
 */

import {
    toString as _toString
} from 'ramda';

/**
 * Is Empty
 * - Dissociated from ramda `isEmpty`
 * - Returns `true` when `mixedVar` is one of the following
 *   - `undefined`
 *   - `null`
 *   - `false`
 *   - `0`
 *   - `''`
 *   - `{}`
 *   - `[]`
 * @param {*} mixedVar
 * @return {boolean}
 */
export function isEmpty(mixedVar) {
    const emptyValues = [undefined, null, false, 0, ''];

    for (let i = 0; i < emptyValues.length; i++)
        if (mixedVar === emptyValues[i])
            return true;

    if (typeof mixedVar === 'object') {
        for (let key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    return false;
}

/**
 * From JSON
 *   - leave value as is if not an object nor an array
 *   - eg.
 *     - <string> "{}"   → <object> {}
 *     - <string> "[]"   → <array> []
 *     - <string> "foo"  → <string> "foo"
 *     - <string> "3"    → <number> 3
 *     - <string> "true" → <boolean> true
 * @public
 * @param {*} mixedVar
 * @return {*} 
 */
export function fromJSON(mixedVar) {
    try {
        return JSON.parse(mixedVar);
    } catch (e) {
        return mixedVar;
    }
}

/**
 * Type Of
 * @public
 * @param {*} mixedVar
 * @return {string}
 */
export function typeOf(mixedVar) {
    var s = Object.prototype.toString.call(mixedVar);
    return s.slice(8, s.length - 1).toLowerCase();
}

/**
 * To String
 * @param {*} mixedVar
 * @return {string}
 */
export function toString(mixedVar) {
    if (typeOf(mixedVar) === 'error' && mixedVar.hasOwnProperty('message'))
        return mixedVar.message;
    return _toString(mixedVar);
}

export * from 'ramda';