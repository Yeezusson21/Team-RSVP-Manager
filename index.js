"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsvp_service_1 = require("./rsvp-service");
const rsvpService = new rsvp_service_1.RsvpService();
// Example usage
const player1 = { id: '1', name: 'Alice' };
rsvpService.updateRsvp(player1, 'Yes');
console.log('Confirmed attendees:', rsvpService.getConfirmedAttendees());
console.log('RSVP counts:', rsvpService.getCounts());
