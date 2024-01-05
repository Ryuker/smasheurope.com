// Filter code
const itemFilter = document.getElementById('filter');
const events = document.getElementById('events');

// Promise
let names = [];
getNames().then(response => names = [...response]);

function getEventNames() {
  return new Promise((resolve) => {
    const eventNames = events.querySelectorAll('.card-title');
    setTimeout(() => { 
      resolve(eventNames);
    }, 10);
  });
}

function getNames() {
  console.log('Getting Names');
  return new Promise (resolve => {
    getEventNames()
    .then( (response) => {
      console.log('events retrieved' + response)
      const array = Array(...response).map(event => event.innerText.toLowerCase());
      console.log(array);
      resolve(array);
    })
  })
}

function setEventClass(event) {
  // find the event in the event
  // set the class
  // 
}


async function filterEvents(e) {
  // get the text input from the filter
  const text = e.target.value.toLowerCase();


  if (Array.isArray(names) ){
    names.forEach(name => {
      // filters based on itemName 
      //- '-1' means the total of chars is not in there
      if (name.indexOf(text) != -1 ) {
        console.log('contains filter letters');
        // find parent and add 'hidden' class
      } else {
        console.log('does not contain filter letter');
        // find parent and remove 'hidden' class
      }
    });
  } else {
    console.log('names is not an array', names);
  }
}



// Attach Listeners


itemFilter.addEventListener('input', filterEvents);