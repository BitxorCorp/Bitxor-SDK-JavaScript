import { UInt64 } from '../UInt64';
import { NormalBlockInfo } from './NomalBlockInfo';
export declare type GenesisImportanceBlockInfo = NormalBlockInfo & {
    votingEligibleAccountsCount?: number;
    harvestingEligibleAccountsCount?: UInt64;
    totalVotingBalance?: UInt64;
    previousImportanceBlockHash?: string;
};
