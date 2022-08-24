import { NamespaceName } from '../namespace/NamespaceName';
import { Token } from './Token';
/**
 * Resolved token model with namespace name
 */
export declare type ResolvedToken = Token & {
    namespaceName?: NamespaceName;
};
