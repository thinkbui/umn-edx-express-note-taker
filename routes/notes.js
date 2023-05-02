const notes = require('express').Router();
const fs = require('fs');
const util = require('util');

notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) =>
    error ? res.status(500).json("Something went wrong.") : res.status(200).json(JSON.parse(data))
  );
});

module.exports = notes;
