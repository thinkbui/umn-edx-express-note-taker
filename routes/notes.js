const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) =>
    error ? res.status(500).json("Something went wrong.") : res.status(200).json(JSON.parse(data))
  );
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      note_id: uuidv4()
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

// notes.delete('/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((note) => note.note_id !== noteId);
//       writeToFile('./db/db.json', result);
//       res.json(`Item ${noteId} has been deleted 🗑️`);
//     });
// });

module.exports = notes;
