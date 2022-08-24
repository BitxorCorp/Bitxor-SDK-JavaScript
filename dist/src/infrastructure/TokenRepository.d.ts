import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { TokenId, TokenInfo } from '../model/token';
import { SearcherRepository } from './paginationStreamer';
import { TokenSearchCriteria } from './searchCriteria';
/**
 * Token interface repository.
 *
 * @since 1.0
 */
export interface TokenRepository extends SearcherRepository<TokenInfo, TokenSearchCriteria> {
    /**
     * Gets a TokenInfo for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<TokenInfo>
     */
    getToken(tokenId: TokenId): Observable<TokenInfo>;
    /**
     * Gets TokenInfo for different tokenIds.
     * @param tokenIds - Array of token ids
     * @returns Observable<TokenInfo[]>
     */
    getTokens(tokenIds: TokenId[]): Observable<TokenInfo[]>;
    /**
     * Gets a TokenInfo merkle for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<MerkleStateInfo>
     */
    getTokenMerkle(tokenId: TokenId): Observable<MerkleStateInfo>;
}
