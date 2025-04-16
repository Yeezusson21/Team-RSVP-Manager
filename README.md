# Team RSVP Manager

A lightweight, focused TypeScript module for managing event RSVP responses. This service is designed to be clean, testable, and scalable - perfect for integration into larger applications.

## Features

- Track player RSVP statuses ("Yes", "No", "Maybe")
- Add or update player responses
- Get filtered lists (e.g., confirmed attendees)
- Get statistics on response counts
- Built with TypeScript for type safety
- Dependency injection for easy testing and extension

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/team-rsvp-manager.git
cd team-rsvp-manager
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Basic Usage

```typescript
import { RsvpService, Player } from './src/rsvp-service';

// Create a new RSVP service instance
const rsvpService = new RsvpService();

// Define players
const player1: Player = { id: '1', name: 'Alex Johnson' };
const player2: Player = { id: '2', name: 'Taylor Smith' };

// Update RSVP statuses
rsvpService.updateRsvp(player1, 'Yes');
rsvpService.updateRsvp(player2, 'Maybe');

// Get confirmed attendees
const confirmed = rsvpService.getConfirmedAttendees();
console.log('Confirmed attendees:', confirmed.map(entry => entry.player.name));

// Get attendance counts
const counts = rsvpService.getCounts();
console.log('RSVP Summary:', counts);
```

### Custom Logger

The service supports dependency injection for logging:

```typescript
import { RsvpService, LoggerService } from './src/rsvp-service';

// Create a custom logger
class AppLogger implements LoggerService {
  log(message: string): void {
    console.log(`[CustomLog] ${message}`);
  }

  error(message: string, error?: Error): void {
    console.error(`[CustomLog] ERROR: ${message}`, error || '');
  }
}

// Inject the logger
const rsvpService = new RsvpService(new AppLogger());
```

## API Reference

### Types

```typescript
type RsvpStatus = 'Yes' | 'No' | 'Maybe';

interface Player {
  id: string;
  name: string;
}

interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
  responseDate: Date;
}
```

### RsvpService Methods

| Method | Description |
|--------|-------------|
| `updateRsvp(player: Player, status: RsvpStatus): RsvpEntry` | Add or update a player's RSVP status |
| `getPlayerRsvp(playerId: string): RsvpEntry \| undefined` | Get a specific player's RSVP entry |
| `getConfirmedAttendees(): RsvpEntry[]` | Get all players who responded "Yes" |
| `getEntriesByStatus(status: RsvpStatus): RsvpEntry[]` | Get all entries with a specific status |
| `getAllEntries(): RsvpEntry[]` | Get all RSVP entries |
| `getCounts(): { total: number; confirmed: number; declined: number; maybe: number }` | Get attendance statistics |

### Scripts

- `npm run build` - Compile TypeScript files
- `npm start` - Run the application using ts-node