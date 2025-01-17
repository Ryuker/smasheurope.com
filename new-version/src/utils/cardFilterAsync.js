// Card Filter Async
// Author: Joeri 'Ryuker' van Ees - 18-12-2024 - https://joerivanees.com
import { normalizeString } from './utils';

const itemFilter = document.getElementById('filter');
const cards = await getAllElementsByQuery('[data-cards] [data-card-title]');
const names = cards.map(e => normalizeString(e.textContent).toLowerCase());

// Hide item filter until we've initialized it
itemFilter.classList.add('hidden');

// Only initialize filter after all cards have been found
await Promise.all([cards]).then(() => init());


// Initialize filter
function init() {
  itemFilter.classList.remove('hidden');
  itemFilter.addEventListener('input', filterCards);
}

// Filter Functionality
function filterCards(e) {
  if (cards.length === 0) return; // there are no cards in the array yet so no need to filter

  // get the text input from the filter
  const text = e.target.value.toLowerCase();

  // Filter check with names
  names.forEach(name => {
    if (name.indexOf(text) != -1 ) {
      // console.log('contains filter letters, show element');
      // console.log(name);
      const card = cards.filter( item => normalizeString(item.textContent.toLowerCase()) === name)[0];
      showCard(card);
    } else {
      // console.log('does not contain filter letter, hide element');
      // console.log(name);
      const card = cards.filter( item => normalizeString(item.textContent.toLowerCase()) === name)[0];
      hideCard(card);
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
function hideCard(card) {
  card.closest('[data-card]').classList.add('hidden');
}

function showCard(card) {
  card.closest('[data-card]').classList.remove('hidden');
}

