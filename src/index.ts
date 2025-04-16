import { RsvpService, Player } from './rsvp-service';

const rsvpService = new RsvpService();

// Example usage
const player1: Player = { id: '1', name: 'Alice' };
rsvpService.updateRsvp(player1, 'Yes');

console.log('Confirmed attendees:', rsvpService.getConfirmedAttendees());
console.log('RSVP counts:', rsvpService.getCounts());