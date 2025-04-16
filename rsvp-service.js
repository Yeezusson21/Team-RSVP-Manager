"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsvpService = exports.ConsoleLoggerService = void 0;
// Default implementation of LoggerService
class ConsoleLoggerService {
    log(message) {
        console.log(`[RsvpService] ${message}`);
    }
    error(message, error) {
        console.error(`[RsvpService] ${message}`, error || '');
    }
}
exports.ConsoleLoggerService = ConsoleLoggerService;
class RsvpService {
    constructor(logger = new ConsoleLoggerService()) {
        this.rsvpEntries = new Map();
        this.logger = logger;
    }
    /**
     * Adds or updates a player's RSVP status
     * @param player The player responding
     * @param status Their RSVP status
     * @returns The updated RSVP entry
     */
    updateRsvp(player, status) {
        if (!player || !player.id) {
            const error = new Error('Invalid player provided');
            this.logger.error('Failed to update RSVP', error);
            throw error;
        }
        if (!this.isValidStatus(status)) {
            const error = new Error(`Invalid status: ${status}`);
            this.logger.error('Failed to update RSVP', error);
            throw error;
        }
        const entry = {
            player,
            status,
            responseDate: new Date()
        };
        this.rsvpEntries.set(player.id, entry);
        this.logger.log(`RSVP updated for player ${player.name} (${player.id}): ${status}`);
        return entry;
    }
    /**
     * Gets a player's current RSVP status
     * @param playerId The player's ID
     * @returns The RSVP entry or undefined if not found
     */
    getPlayerRsvp(playerId) {
        return this.rsvpEntries.get(playerId);
    }
    /**
     * Gets all confirmed attendees (status = "Yes")
     * @returns Array of confirmed RSVP entries
     */
    getConfirmedAttendees() {
        return this.getEntriesByStatus('Yes');
    }
    /**
     * Gets all entries with a specific status
     * @param status The RSVP status to filter by
     * @returns Array of matching RSVP entries
     */
    getEntriesByStatus(status) {
        if (!this.isValidStatus(status)) {
            const error = new Error(`Invalid status: ${status}`);
            this.logger.error('Failed to get entries by status', error);
            throw error;
        }
        return Array.from(this.rsvpEntries.values())
            .filter(entry => entry.status === status);
    }
    /**
     * Gets all RSVP entries
     * @returns Array of all RSVP entries
     */
    getAllEntries() {
        return Array.from(this.rsvpEntries.values());
    }
    /**
     * Counts responses by status
     * @returns Object with total, confirmed, declined, and maybe counts
     */
    getCounts() {
        const entries = this.getAllEntries();
        return {
            total: entries.length,
            confirmed: entries.filter(entry => entry.status === 'Yes').length,
            declined: entries.filter(entry => entry.status === 'No').length,
            maybe: entries.filter(entry => entry.status === 'Maybe').length
        };
    }
    /**
     * Validates if a status is one of the allowed values
     * @param status The status to validate
     * @returns True if valid, false otherwise
     */
    isValidStatus(status) {
        return ['Yes', 'No', 'Maybe'].includes(status);
    }
}
exports.RsvpService = RsvpService;
