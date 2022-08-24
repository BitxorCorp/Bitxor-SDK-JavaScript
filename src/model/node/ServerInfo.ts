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

import { Deployment } from './Deployment';

/**
 * The server information.
 */
export class ServerInfo {
    /**
     * @param restVersion - The bitxorcore-rest component version
     * @param sdkVersion - the bitxorcore-sdk component version
     * @param deployment - the deployment information.
     */
    constructor(
        /**
         * restVersion The bitxorcore-rest component version
         */
        public readonly restVersion: string,
        /**
         * sdkVersion the bitxorcore-sdk component version
         */
        public readonly sdkVersion: string,
        /**
         * deployment The deployment information that helps tracking how the node was created.
         */
        public readonly deployment: Deployment | undefined,
    ) {}
}
