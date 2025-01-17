// Event Filter Async
// Author: Joeri 'Ryuker' van Ees - 10-01-2024 - https://joerivanees.com

const itemFilter = document.getElementById('filter');
const events = await getAllElementsByQuery('#events [data-event-title]');
const names = events.map(e => normalizeString(e.textContent).toLowerCase());

// Hide item filter until we've initialized it
itemFilter.classList.add('hidden');

// Only initialize filter after all events have been found
await Promise.all([events]).then(() => init());


// Initialize filter
function init() {
  itemFilter.classList.remove('hidden');
  itemFilter.addEventListener('input', filterEvents);
}

// Filter Functionality
function filterEvents(e) {
  if (events.length === 0) return; // there are no events in the array yet so no need to filter

  // get the text input from the filter
  const text = e.target.value.toLowerCase();

  // Filter check with names
  names.forEach(name => {
    if (name.indexOf(text) != -1 ) {
      // console.log('contains filter letters, show element');
      // console.log(name);
      const event = events.filter( item => normalizeString(item.textContent.toLowerCase()) === name)[0];
      showEvent(event);
    } else {
      // console.log('does not contain filter letter, hide element');
      // console.log(name);
      const event = events.filter( item => normalizeString(item.textContent.toLowerCase()) === name)[0];
      hideEvent(event);
    }
  });
}

// Query Functions returning a promise
function getAllElementsByQuery(query) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(query);
    resolve(elements);
  })
    .then(els => {
      return Array.from(els);
    });
}

// Styling functions
function hideEvent(event) {
  event.closest('[data-event]').classList.add('hidden');
}

function showEvent(event) {
  event.closest('[data-event]').classList.remove('hidden');
}

//////////////////////
// utils functions
// Convert special characters in string to alphabetical characters
function normalizeString(str) {
  const str_norm = str.normalize('NFD').replace(/\p{Diacritic}/gu, ""); 
  return str_norm;
}