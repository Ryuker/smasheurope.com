const events = require('./events.json');
const countries = require('./countries.json');

module.exports = () => ({
  events: events,
  countries: countries
});