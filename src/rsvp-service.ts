// Types
export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface Player {
  id: string;
  name: string;
}

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
  responseDate: Date;
}

export interface LoggerService {
  log(message: string): void;
  error(message: string, error?: Error): void;
}

// Default implementation of LoggerService
export class ConsoleLoggerService implements LoggerService {
  log(message: string): void {
    console.log(`[RsvpService] ${message}`);
  }

  error(message: string, error?: Error): void {
    console.error(`[RsvpService] ${message}`, error || '');
  }
}

export class RsvpService {
  private rsvpEntries: Map<string, RsvpEntry> = new Map();
  private logger: LoggerService;

  constructor(logger: LoggerService = new ConsoleLoggerService()) {
    this.logger = logger;
  }

  /**
   * Adds or updates a player's RSVP status
   * @param player The player responding
   * @param status Their RSVP status
   * @returns The updated RSVP entry
   */
  updateRsvp(player: Player, status: RsvpStatus): RsvpEntry {
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

    const entry: RsvpEntry = {
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
  getPlayerRsvp(playerId: string): RsvpEntry | undefined {
    return this.rsvpEntries.get(playerId);
  }

  /**
   * Gets all confirmed attendees (status = "Yes")
   * @returns Array of confirmed RSVP entries
   */
  getConfirmedAttendees(): RsvpEntry[] {
    return this.getEntriesByStatus('Yes');
  }

  /**
   * Gets all entries with a specific status
   * @param status The RSVP status to filter by
   * @returns Array of matching RSVP entries
   */
  getEntriesByStatus(status: RsvpStatus): RsvpEntry[] {
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
  getAllEntries(): RsvpEntry[] {
    return Array.from(this.rsvpEntries.values());
  }

  /**
   * Counts responses by status
   * @returns Object with total, confirmed, declined, and maybe counts
   */
  getCounts(): { total: number; confirmed: number; declined: number; maybe: number } {
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
  private isValidStatus(status: string): status is RsvpStatus {
    return ['Yes', 'No', 'Maybe'].includes(status);
  }
}