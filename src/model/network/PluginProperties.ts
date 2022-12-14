/*
import { AccountLinkNetworkProperties } from './AccountLinkNetworkProperties';
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

import { AccountLinkNetworkProperties } from './AccountLinkNetworkProperties';
import { AccountRestrictionNetworkProperties } from './AccountRestrictionNetworkProperties';
import { AggregateNetworkProperties } from './AggregateNetworkProperties';
import { HashLockNetworkProperties } from './HashLockNetworkProperties';
import { MetadataNetworkProperties } from './MetadataNetworkProperties';
import { MultisigNetworkProperties } from './MultisigNetworkProperties';
import { NamespaceNetworkProperties } from './NamespaceNetworkProperties';
import { SecretLockNetworkProperties } from './SecretLockNetworkProperties';
import { TokenNetworkProperties } from './TokenNetworkProperties';
import { TokenRestrictionNetworkProperties } from './TokenRestrictionNetworkProperties';
import { TransferNetworkProperties } from './TransferNetworkProperties';

/**
 * Network related configuration properties.
 */
export class PluginProperties {
    /**
     * @param accountlink - Network identifier.
     * @param aggregate - Genesis public key.
     * @param lockhash - Genesis generation hash.
     * @param locksecret - Genesis epoch time adjustment.
     * @param metadata -
     * @param token -
     * @param multisig -
     * @param namespace -
     * @param restrictionaccount -
     * @param restrictiontoken -
     * @param transfer -
     */
    constructor(
        public readonly accountlink?: AccountLinkNetworkProperties,
        public readonly aggregate?: AggregateNetworkProperties,
        public readonly lockhash?: HashLockNetworkProperties,
        public readonly locksecret?: SecretLockNetworkProperties,
        public readonly metadata?: MetadataNetworkProperties,
        public readonly token?: TokenNetworkProperties,
        public readonly multisig?: MultisigNetworkProperties,
        public readonly namespace?: NamespaceNetworkProperties,
        public readonly restrictionaccount?: AccountRestrictionNetworkProperties,
        public readonly restrictiontoken?: TokenRestrictionNetworkProperties,
        public readonly transfer?: TransferNetworkProperties,
    ) {}
}
