'use strict';

/**Notes library module:
 * C.F that takes the input object from input.js => `Notes(obj)`
 * excute the correct operation based on the input object action => `excute` prototype
 * add note operation => `add` prototype
 * export C.F.
 */
//Notes Schema
const NotesSchema = require('../models/notes-schema');
//Class
class Notes {
  constructor(receivedObj) {
    console.log('receivedObj>>>>>>', receivedObj);
    if (receivedObj) {this.operation = this.excute(receivedObj.argObj);}
    // if (this.operation === 'add') {
    //   console.log(this.add(receivedObj.argObj));
    // }
  }

  excute(obj) {
    if (obj.action === 'add' || obj.action === 'a') {
      return this.add(obj);
    }
    if (obj.action === 'list') {
      return this.list(obj);
    }
    if (obj.action === 'delete') {
      return this.delete(obj);
    }
  }

  async add(addNoteObj) {
    let noteRecord = {
      text: addNoteObj.playload,
      category: addNoteObj.category,
    };
    let note = new NotesSchema(noteRecord);
    await note.save()
      .then(console.log('Note Saved: ${noteRecord.text} In ${noteRecord.category}'));
  }

  async list(listNotesObj) {
    const category = listNotesObj.category;
    if (category === true) {
      let allNotes = await NotesSchema.find({})
        .then(console.log(allNotes));
    }

  }

  async delete() {

  }

}
  
//exporting the C.F
module.exports = Notes;
