import { TokenInfoDTO } from 'bitxor-openapi-typescript-fetch-client';
import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { NetworkType } from '../model/network/NetworkType';
import { TokenId } from '../model/token/TokenId';
import { TokenInfo } from '../model/token/TokenInfo';
import { Http } from './Http';
import { Page } from './Page';
import { TokenPaginationStreamer } from './paginationStreamer';
import { TokenSearchCriteria } from './searchCriteria/TokenSearchCriteria';
import { TokenRepository } from './TokenRepository';
/**
 * Token http repository.
 *
 * @since 1.0
 */
export declare class TokenHttp extends Http implements TokenRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param networkType the network type.
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, networkType?: NetworkType | Observable<NetworkType>, fetchApi?: any);
    /**
     * Gets the TokenInfo for a given tokenId
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
    /**
     * Gets an array of tokens.
     * @summary Get tokens created for given address
     * @param criteria Token search criteria
     * @returns {Page<TokenInfo>}
     */
    search(criteria: TokenSearchCriteria): Observable<Page<TokenInfo>>;
    streamer(): TokenPaginationStreamer;
    /**
     * Maps TokenInfoDTO to TokenInfo
     *
     * @param tokenInfo the dto object.
     * @returns the model object
     */
    static toTokenInfo(tokenInfo: TokenInfoDTO): TokenInfo;
}
