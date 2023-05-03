const notes = require('express').Router();
// Added for file I/O
const fs = require('fs');
// Added for generating a unique ID for each note
const { v4: uuidv4 } = require('uuid');

// This is the GET /api/notes endpoint
// Loads all notes from db.json and send all the data in the response
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) =>
    error ? res.status(500).json("Something went wrong.") : res.status(200).json(JSON.parse(data))
  );
});

// This is the POST /api/notes endpoint
// This grabs the note content from the request, attaches a unique ID, then adds it to db.json
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

// This is the DELETE /api/notes/:note_id endpoint
// It takes the ID of the note, loads all notes into memory, filters only notes with non-matching IDs, then saves the filtered data back to db.json
notes.delete('/:note_id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  const noteId = req.params.note_id;
  if (noteId) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        const updatedNotes = parsedNotes.filter(note => note.note_id != noteId)
        fs.writeFile(
          './db/db.json',
          JSON.stringify(updatedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: noteId,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in deleting note');
  }
});

module.exports = notes;
