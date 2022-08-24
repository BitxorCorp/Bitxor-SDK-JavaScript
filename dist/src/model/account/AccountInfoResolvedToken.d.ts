import { ResolvedToken } from '../token/ResolvedToken';
import { AccountInfo } from './AccountInfo';
/**
 * Account info with resolved token
 */
export declare type AccountInfoResolvedToken = AccountInfo & {
    resolvedTokens?: ResolvedToken[];
};
