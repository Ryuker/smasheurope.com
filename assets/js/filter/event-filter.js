// Filter code
const itemFilter = document.getElementById('filter');
const eventContainer = document.getElementById('events');

////////////////////////////
// Promise tests
let events = [];
let names = [];

let test;
let testNames;

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(document.getElementById('events'));
  }, 300);
});
const promiseB = myPromise.then((response) => response.querySelectorAll('.card-title'));
// const promiseC = promiseB.then((response) => response.forEach(item => 
//   console.log(item.textContent.toLowerCase())
// ));



function getEvents() {
  return new Promise((resolve) => {
    const eventNames = eventContainer.querySelectorAll('.card-title');
    setTimeout(() => { 
      resolve(eventNames);
    }, 10);
  });
}

function getNames() {
  console.log('Getting Names');
  return new Promise (resolve => {
    getEvents()
    .then( (response) => {
      console.log('events retrieved' + response)
      const filterArray = Array(...response).filter(item => item.parentElement.classList.contains('row') === false);
      const array = filterArray.map(event => event.innerText.toLowerCase());
      console.log(array);
      resolve(array);
    })
  })
}

function getEventTitles() {
  console.log('Getting Event Title elements');
  return new Promise (resolve => {
    getEvents()
    .then( (response) => {
      console.log('events retrieved' + response)
      const filterArray = Array(...response).filter(item => item.parentElement.classList.contains('row') === false);
      const array = filterArray.map(event => event.innerText.toLowerCase());
      console.log(array);
      resolve(array);
    })
  })
}

function updateEventClass(event, removeClass) {
  // find the event in the event
  console.log('setting event class - ', event.textContent);
  if (removeClass){
    event.parentNode.parentNode.parentNode.parentNode.classList.remove('hidden');
  } else {
    event.parentNode.parentNode.parentNode.parentNode.classList.add('hidden');
  }
}


async function filterEvents(e) {
  // get the text input from the filter
  const text = e.target.value.toLowerCase();

  if (names.length !== 0 || events.length !== 0){
    names.forEach(name => {
      // filters based on itemName 
      //- '-1' means the total of chars is not in there
      if (name.indexOf(text) != -1 ) {
        console.log('contains filter letters, show element');
        console.log(name);

        const event = events.filter( item => item.innerText.toLowerCase() === name)[0];
        console.log(event);
        updateEventClass(event, true);
      } else {
        console.log('does not contain filter letter, hide element');
        const event = events.filter( item => item.innerText.toLowerCase() === name)[0];
        console.log(event);
        updateEventClass(event);
      }
    });
  } else {
    console.log('names is not an array', names);
  }
}

async function setup() {
  console.log('setup');
  // get events
  events = Array(...eventContainer.querySelectorAll('.card-title'));
  events = events.filter(event => event.parentElement.classList.contains('row') === false);
  console.log(events, 'events');

  names = await getNames();

  // get names from events
  console.log(names, 'names');

  console.log('setup completed');
}


// Attach Listeners
itemFilter.addEventListener('input', filterEvents);

setup();