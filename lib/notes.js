'use strict';

/**Notes library module:
 * Class constructor that takes the input object from input.js => `Notes(obj)`
 * excute the correct operation based on the input object action => `excute` method
 * add note operation => `add` method
 * export Class
 */


//Notes Schema
const NotesSchema = require('../models/notes-schema');


//Class
class Notes {
  constructor(receivedObj) {
    if (receivedObj.validArg) {this.operation = this.excute(receivedObj.argObj);}
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
      text: addNoteObj.payload,
      category: addNoteObj.category,
    };
    let note = new NotesSchema(noteRecord);
    await note.save()
      .then(console.log(`\n\nNote Saved: ${noteRecord.text}, In: ${noteRecord.category}\n\n`));
  }

  async list(listNotesObj) {
    const category = listNotesObj.category;
    if (category === true) {
      let allNotes = await NotesSchema.find({});
      console.log('\n============\nSaved Notes:\n============\n');
      allNotes.forEach(noteRecord => {
        console.log(`${noteRecord.text}\n\nCategory: ${noteRecord.category}, ID: ${noteRecord._id}\n--------------------------------\n`);
      });
    }
    else {
      let categorizedNotes = await NotesSchema.find({category: category});
      if (categorizedNotes.length !== 0) {
        console.log(`\n============================\nAll Notes In (${category}) Category: \n============================\n`);
        categorizedNotes.forEach(noteRecord => {
          console.log(`${noteRecord.text}\n\nID: ${noteRecord._id}\n----------------------\n`);
        });
      } else {
        console.log(`No Notes Saved In (${category}) Category!`);
      }
    }

  }

  async delete(deleteNoteObj) {
    let noteByID = await NotesSchema.findById({_id: deleteNoteObj.id});
    if (noteByID) {
      await NotesSchema.findByIdAndDelete({_id: deleteNoteObj.id});
      console.log('\n=============\nNote Deleted!\n=============\n'); 
    } else {console.log('No Note With This Id Exists!');}
    // //to check that the note is deleted:
    // let deletedNote = await NotesSchema.findById({_id: deleteNoteObj.id});
    // console.log('deletedNote: ', deletedNote);
  }

}
  
//exporting the Class
module.exports = Notes;
