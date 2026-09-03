const events = require('./events.json');
const circuits = require('./circuits.json');
const countries = require('./countries.json');

module.exports = () => ({
  events: events,
  circuits: circuits,
  countries: countries
});