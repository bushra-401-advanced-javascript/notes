'use strict';

// const Input = require('../lib/input.js');
const Note = require('../lib/notes.js');
// let input = new Input();
let input =
 {
   validArg: [ '--add', 'note text' ],
   noteText: 'ffffffff',
   argObj: { action: 'add', playload: 'note text' },
 } 
|| 
{
  validArg: [ '-a', 'note text' ],
  noteText: 'ffffffff',
  argObj: { action: 'a', playload: 'note text' },
} ;
let note = new Note(input);

describe('Notes Module', () => {

  it('excute() to determine what operation to use', () => {
    const obj = input.argObj;
    expect(note.excute(obj)).toStrictEqual('add');
  });
    
  it('add() to create a note object and send a confirmation msg', () => {
    const obj = input.argObj;
    let noteObj = {
      id: Math.ceil(Math.random()*10),
      note: obj.playload,
    };
    let msg = `Adding Note: ${noteObj.note}`;
    expect(note.add(obj)).toStrictEqual(msg);
  });

});
