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
exports.Deployment = void 0;
/**
 * The deployment information that helps tracking how the node was created.
 */
class Deployment {
    /**
     * @param deploymentTool The tool used to create, maintain and deploy the node. Examples: bitxor-bootstrap, manual.
     * @param deploymentToolVersion The version of the tool used to create, maintain and deploy the node.
     * @param lastUpdatedDate When was the node upgraded.
     */
    constructor(
    /**
     * deploymentTool The tool used to create, maintain and deploy the node. Examples: bitxor-bootstrap, manual.
     */
    deploymentTool, 
    /**
     * deploymentToolVersion The version of the tool used to create, maintain and deploy the node.
     */
    deploymentToolVersion, 
    /**
     * lastUpdatedDate When was the node last upgraded.
     */
    lastUpdatedDate) {
        this.deploymentTool = deploymentTool;
        this.deploymentToolVersion = deploymentToolVersion;
        this.lastUpdatedDate = lastUpdatedDate;
    }
}
exports.Deployment = Deployment;
//# sourceMappingURL=Deployment.js.map