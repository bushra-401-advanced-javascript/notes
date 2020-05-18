'use strict';

/**Notes library module:
 * C.F that takes the input object from input.js => `Notes(obj)`
 * excute the correct operation based on the input object action => `excute` prototype
 * add note operation => `add` prototype
 * export C.F.
 */
//Class
class Notes {
  constructor(receivedObj) {
    if (receivedObj) {this.operation = this.excute(receivedObj.argObj);}
    if (this.operation === 'add') {
      console.log(this.add(receivedObj.argObj));
    }
  }

  excute(obj) {
    if (obj.action === 'add' || obj.action === 'a') {
      return 'add';
    }
  }

  add(addNoteObj) {
    let noteObj = {
      id: Math.ceil(Math.random()*10),
      note: addNoteObj.playload,
    };
    let msg = `Adding Note: ${noteObj.note}`;
    return msg;
  }

}
  
//exporting the C.F
module.exports = Notes;
