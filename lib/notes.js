'use strict';

/**notes.js:
 * C.F that takes the input object from input.js => `Notes(obj)`
 * excute the correct operation based on the input object action => `excute` prototype
 * add note operation => `add` prototype
 * export C.F.
 */

//C.F
function Notes(receivedObj) {
  this.operation = this.excute(receivedObj);
  if (this.operation === 'add') {
    this.confirmationMsg = console.log(this.add(receivedObj));
  }
}

//excution prototype
Notes.prototype.excute = function (obj) {
  if (obj.action === 'add' || obj.action === 'a') {
    return 'add';
  }
};

//add prototype
Notes.prototype.add = function (addNoteObj) {
  let noteObj = {
    id: Math.ceil(Math.random()*10),
    note: addNoteObj.playload,
  };
  let msg = `Adding Note: ${noteObj.note}`;
  return msg;
};

//exporting the C.F
module.exports = Notes;
