import { Observable } from 'rxjs';
import { NamespaceRepository } from '../infrastructure/NamespaceRepository';
import { RestrictionTokenRepository } from '../infrastructure/RestrictionTokenRepository';
import { UnresolvedAddress } from '../model/account/UnresolvedAddress';
import { NetworkType } from '../model/network/NetworkType';
import { TokenRestrictionType } from '../model/restriction/TokenRestrictionType';
import { UnresolvedTokenId } from '../model/token/UnresolvedTokenId';
import { Deadline } from '../model/transaction/Deadline';
import { Transaction } from '../model/transaction/Transaction';
import { UInt64 } from '../model/UInt64';
/**
 * TokenRestrictionTransactionService service
 */
export declare class TokenRestrictionTransactionService {
    private readonly restrictionTokenRepository;
    private readonly namespaceRepository;
    private readonly defaultTokenAddressRestrictionValue;
    private readonly defaultTokenGlobalRestrictionValue;
    /**
     * Constructor
     * @param restrictionTokenRepository
     * @param namespaceRepository
     */
    constructor(restrictionTokenRepository: RestrictionTokenRepository, namespaceRepository: NamespaceRepository);
    /**
     * Create a TokenGlobalRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param restrictionValue - New restriction value
     * @param restrictionType - New restriction type
     * @param referenceTokenId - Reference token Id
     * @param maxFee - Max fee
     */
    createTokenGlobalRestrictionTransaction(deadline: Deadline, networkType: NetworkType, tokenId: UnresolvedTokenId, restrictionKey: UInt64, restrictionValue: string, restrictionType: TokenRestrictionType, referenceTokenId?: UnresolvedTokenId, maxFee?: UInt64): Observable<Transaction>;
    /**
     * Create a TokenAddressRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param targetAddress - Unresolved target address
     * @param restrictionValue - New restriction value
     * @param maxFee - Max fee
     */
    createTokenAddressRestrictionTransaction(deadline: Deadline, networkType: NetworkType, tokenId: UnresolvedTokenId, restrictionKey: UInt64, targetAddress: UnresolvedAddress, restrictionValue: string, maxFee?: UInt64): Observable<Transaction>;
    /**
     * Get address global restriction previous value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @param targetAddress - The target address
     * @return {Observable<string | undefined>}
     */
    private getAddressRestrictionEntry;
    /**
     * Get token global restriction prvious value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @return {Observable<TokenGlobalRestrictionItem | undefined>}
     */
    private getGlobalRestrictionEntry;
    /**
     * Check if input restriction key and value are invalid or not
     * @param value - Restriction value
     */
    private validateInput;
}
