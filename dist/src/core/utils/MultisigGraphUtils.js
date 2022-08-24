"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigGraphUtils = void 0;
class MultisigGraphUtils {
    /**
     * creates a structred Tree object containing Current multisig account with children
     * @param {MultisigAccountInfo[][]} multisigEnteries
     * @returns {MultisigChildrenTreeObject[]} Array of multisigChildrentTree objects
     */
    static getMultisigChildren(multisigAccountGraphInfoMapped) {
        if (multisigAccountGraphInfoMapped) {
            const mappedTree = [];
            multisigAccountGraphInfoMapped.forEach((level) => {
                level.forEach((entry) => {
                    mappedTree.push({
                        address: entry.accountAddress.plain(),
                        children: [],
                    });
                    // find the entry matching with address matching cosignatory address and update his children
                    const updateRecursively = (address, object) => (obj) => {
                        if (obj.address === address) {
                            obj.children.push(object);
                        }
                        else if (obj.children) {
                            obj.children.forEach(updateRecursively(address, object));
                        }
                    };
                    entry.cosignatoryAddresses.forEach((addressVal) => {
                        mappedTree.forEach(updateRecursively(addressVal['address'], {
                            address: entry.accountAddress.plain(),
                            children: [],
                        }));
                    });
                });
            });
            return mappedTree;
        }
        return [];
    }
    /**
     * sort entries based on tree hierarchy from top to bottom
     * @param {Map<number, MultisigAccountInfo[]>} multisigEnteries
     * @returns {MultisigAccountInfo[]}  sorted multisig graph
     */
    static getMultisigGraphArraySorted(multisigEntries) {
        return [...multisigEntries.keys()]
            .sort((a, b) => b - a) // Get addresses from top to bottom
            .map((key) => multisigEntries.get(key) || [])
            .filter((x) => x.length > 0);
    }
    /**
     * returns sorted tree entries
     * @param {MultisigAccountGraphInfo} graphInfo
     * @returns {MultisigAccountInfo[][]}  array of sorted multisigInfo
     */
    static getMultisigInfoFromMultisigGraphInfo(graphInfo) {
        const { multisigEntries } = graphInfo;
        return [...this.getMultisigGraphArraySorted(multisigEntries)].map((item) => item);
    }
}
exports.MultisigGraphUtils = MultisigGraphUtils;
//# sourceMappingURL=MultisigGraphUtils.js.map