# umn-edx-express-note-taker

## SUMMARY
This is a basic notetaking app that allows the user to create and view a variety of notes.  The main landing page has a link to the actual notes creation/viewing page.

On this page, you can create a note by entering information into the title and text fields on the right side.  Once you type anything in, an icon appears above where, when clicked, will save the info as a new note.

On the left side, a list of all existing notes.  When one is clicked, its contents are displayed in the fields on the right.  At the moment they are uneditable.

To clear the right side fields of an existing note content or to simply clear those fields of anything entered, click the '+' icon above will reset the field.

## NOTES
This was intended as a study of how front-end JS and NodeJS/ExpressJS interact, so only a crude database was used.  Since the only one "table" as such is needed for this app, the data is stored as an array of objects/hashmaps in a JSON file.  This app isn't intended to be used by a large number of users making multiple simultaneous changes.

The limits of the app are also unknown at this point as the maximum length of each note as well as the number of notes that the database can hold has not be determined.

## LIVE VIEW
This note taker can be viewed here: https://pure-thicket-80004.herokuapp.com/

Homepage
![Homepage](./public/assets/images/screenshot_index.png)

Note Editor
![Notes](./public/assets/images/screenshot_note.png)
