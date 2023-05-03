// Since the only API routes are covered by routes/notes.js, this is a basic routes/index.js
const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
