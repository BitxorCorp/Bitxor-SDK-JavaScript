import { ChronoUnit } from '@js-joda/core';
import { RepositoryFactory } from '../infrastructure';
import { Deadline } from '../model/transaction';
/**
 * A factory service that allows the client to generate Deadline objects based on different strategies.
 *
 * The main issue is that sometimes the local computer time is not in sync, the created deadlines may be too old or too in the future and rejected by the server.
 */
export declare class DeadlineService {
    private readonly repositoryFactory;
    private readonly epochAdjustment;
    /**
     * The difference in milliseconds between the server and the local time. It used to create "server" deadline without asking for the server time every time a new deadline is created.
     */
    private localTimeOffset;
    /**
     * Private constructor, use the create static method
     *
     * @param repositoryFactory the repository factory to call the rest servers.
     * @param epochAdjustment the server epochAdjustment
     * @param serverTime the latest known server time to calculate the remote and local time difference.
     */
    private constructor();
    /**
     * It creates a deadline by querying the current time to the server each time. This is the most accurate but less efficient way.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingServerTime(deadline?: number, chronoUnit?: ChronoUnit): Promise<Deadline>;
    /**
     * It creates a deadline using the known difference between the local and server time.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingOffset(deadline?: number, chronoUnit?: ChronoUnit): Deadline;
    /**
     * It creates a deadline using the local time. If the local system time is not in sync, the Deadline may be rejected by the server.
     *
     * @param deadline the deadline value
     * @param chronoUnit the unit of the value.
     */
    createDeadlineUsingLocalTime(deadline?: number, chronoUnit?: ChronoUnit): Deadline;
    /**
     * Factory method of this object.
     *
     * @param repositoryFactory the repository factory to call the rest servers.
     */
    static create(repositoryFactory: RepositoryFactory): Promise<DeadlineService>;
}
