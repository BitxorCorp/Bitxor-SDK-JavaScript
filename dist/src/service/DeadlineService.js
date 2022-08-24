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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadlineService = void 0;
const core_1 = require("@js-joda/core");
const rxjs_1 = require("rxjs");
const transaction_1 = require("../model/transaction");
/**
 * A factory service that allows the client to generate Deadline objects based on different strategies.
 *
 * The main issue is that sometimes the local computer time is not in sync, the created deadlines may be too old or too in the future and rejected by the server.
 */
class DeadlineService {
    /**
     * Private constructor, use the create static method
     *
     * @param repositoryFactory the repository factory to call the rest servers.
     * @param epochAdjustment the server epochAdjustment
     * @param serverTime the latest known server time to calculate the remote and local time difference.
     */
    constructor(repositoryFactory, epochAdjustment, serverTime) {
        this.repositoryFactory = repositoryFactory;
        this.epochAdjustment = epochAdjustment;
        this.localTimeOffset = core_1.Instant.now().minusSeconds(epochAdjustment).toEpochMilli() - serverTime;
    }
    /**
     * It creates a deadline by querying the current time to the server each time. This is the most accurate but less efficient way.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingServerTime(deadline = transaction_1.defaultDeadline, chronoUnit = transaction_1.defaultChronoUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTime = (yield (0, rxjs_1.firstValueFrom)(this.repositoryFactory.createNodeRepository().getNodeTime())).receiveTimeStamp.compact();
            return transaction_1.Deadline.createFromAdjustedValue(core_1.Duration.ofMillis(serverTime).plus(deadline, chronoUnit).toMillis());
        });
    }
    /**
     * It creates a deadline using the known difference between the local and server time.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingOffset(deadline = transaction_1.defaultDeadline, chronoUnit = transaction_1.defaultChronoUnit) {
        return transaction_1.Deadline.createFromAdjustedValue(core_1.Instant.now().plus(deadline, chronoUnit).minusMillis(this.localTimeOffset).minusSeconds(this.epochAdjustment).toEpochMilli());
    }
    /**
     * It creates a deadline using the local time. If the local system time is not in sync, the Deadline may be rejected by the server.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingLocalTime(deadline = transaction_1.defaultDeadline, chronoUnit = transaction_1.defaultChronoUnit) {
        return transaction_1.Deadline.create(this.epochAdjustment, deadline, chronoUnit);
    }
    /**
     * Factory method of this object.
     *
     * @param repositoryFactory the repository factory to call the rest servers.
     */
    static create(repositoryFactory) {
        return __awaiter(this, void 0, void 0, function* () {
            const epochAdjustment = yield (0, rxjs_1.firstValueFrom)(repositoryFactory.getEpochAdjustment());
            const serverTime = (yield (0, rxjs_1.firstValueFrom)(repositoryFactory.createNodeRepository().getNodeTime())).receiveTimeStamp.compact();
            return new DeadlineService(repositoryFactory, epochAdjustment, serverTime);
        });
    }
}
exports.DeadlineService = DeadlineService;
//# sourceMappingURL=DeadlineService.js.map