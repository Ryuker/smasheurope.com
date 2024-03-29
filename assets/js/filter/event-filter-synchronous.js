// Event Filter
// Author: Joeri 'Ryuker' van Ees - 10-01-2024 - https://joerivanees.com

const itemFilter = document.getElementById('filter');
const events = Array.from(document.querySelectorAll('#events [data-event-title]'));
const names = events.map(event => normalizeString(event.textContent.toLowerCase()));


// Filter check - hides and displays elements based name check with 
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

// Styling functions
function hideEvent(event) {
  event.closest('[data-event]').classList.add('hidden');
}

function showEvent(event) {
  event.closest('[data-event]').classList.remove('hidden');
}

// Attach Listener
itemFilter.addEventListener('input', filterEvents);

//////////////////////
// utils functions
function normalizeString(str) {
  const str_norm = str.normalize('NFD').replace(/\p{Diacritic}/gu, ""); 
  return str_norm;
}
