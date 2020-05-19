
const Input = require('./lib/input.js');
const Note = require('./lib/notes.js');

let input = new Input;
if (input.validArg && input.noteText.length > 1) {let note = new Note(input);}
