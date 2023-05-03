const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Heroku requires the last part of "process.env.PORT" to be in all caps
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This is the main landing page.  Since it is the domain root and the wildcard
// combined into one, it is placed as the last route in the code to prevent
// interference with other routes.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
