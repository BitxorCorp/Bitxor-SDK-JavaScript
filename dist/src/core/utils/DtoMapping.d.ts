import { Duration } from '@js-joda/core';
import { AccountRestrictionsInfoDTO, MerkleStateInfoDTO } from 'bitxor-openapi-typescript-fetch-client';
import { Address } from '../../model/account/Address';
import { MerkleStateInfo } from '../../model/blockchain/MerkleStateInfo';
import { AccountRestrictions } from '../../model/restriction/AccountRestrictions';
export declare class DtoMapping {
    /**
     * Create AccountRestrictionsInfo class from Json.
     * @param accountRestrictions.
     * @returns {module: model/Account/AccountRestrictions} The AccountRestrictionsInfo class.
     */
    static extractAccountRestrictionFromDto(accountRestrictions: AccountRestrictionsInfoDTO): AccountRestrictions;
    /**
     * This method knows how to convert an address payload sent by Rest to Address.
     *
     * Currently rest sends hex encoded addresses, it is desired to use base32 encoded addresses.
     *
     * This method handles both format, encoded (deprecated) and base32 encoded addresses.
     *
     * Clients using this SDK will be able to process both payloads.
     *
     * @param value the address in encoded (6823BB7C3C089D996585466380EDBDC19D4959184893E38C) format or decoded/plain format (SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3)
     * @return the Address object.
     */
    static toAddress(value: string): Address;
    /**
     * Creates a copy of the first object adding the attributes of the second object.
     * @param object the object to be cloned
     * @param attributes the extra attributes to be added to the object.
     * @returns a copy of the first object with the new attributes added.
     */
    static assign<T>(object: T, attributes: any): T;
    /**
     * Map one enum type to another by value
     * @param value enum value to be mapped
     */
    static mapEnum<E1, E2>(value: E1 | undefined): E2;
    /**
     * It parse a server time/duration configuration like: - 1000ms 1000 milliseconds - 15s 15 seconds
     * - 5m 5 minutes - 2h 2 hours - 10d 10 days
     *
     * <p>into a @{@link Duration} object
     *
     * @param serverValue time.
     * @return {Duration} an instant from that value.
     */
    static parseServerDuration(serverValue: string): Duration;
    /**
     *
     * It converts a server Hex like 0x017D'1694'0477'B3F5 to 017D16940477B3F5
     *
     * @param serverHex
     */
    static toSimpleHex(serverHex: string): string;
    /**
     * Creates the MerkleStateInfo from the dto
     * @param dto the dto
     */
    static toMerkleStateInfo(dto: MerkleStateInfoDTO): MerkleStateInfo;
}
