
const Input = require('./lib/input.js');
const Note = require('./lib/notes.js');

let input = new Input;
if (input.validArg) {let note = new Note(input);}
