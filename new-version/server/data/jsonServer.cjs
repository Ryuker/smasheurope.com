const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const events = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'events.json'), 'utf-8')
);
const countries = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'countries.json'), 'utf-8')
);

const db = {
  events: events.events,
  countries: countries.countries,
};

const router = jsonServer.router(db);

// Load and apply custom routes
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'routes.json'), 'utf-8')
);
server.use(jsonServer.rewriter(routes));

// Middleware to handle writes to the appropriate file
router.render = (req, res) => {
  res.jsonp(res.locals.data);

  const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  };

  if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'PATCH' ||
    req.method === 'DELETE'
  ) {
    const db = router.db; // Lowdb instance

    console.log(req.method, ' from jsonServer.cjs');
    
    writeData(path.join(__dirname, 'events.json'), {
      events: db.get('events').value(),
    });
    writeData(path.join(__dirname, 'countries.json'), {
      countries: db.get('countries').value(),
    });
  }
};

server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});