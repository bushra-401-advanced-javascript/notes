'use strict';

const NotesSchema = require('./notes-schema');
/**
     * Implementing CRUD operations for mongoose methods (from the notes schema)
     * * get() --> mongoose.find() method
     * * create() --> mongoose.save() method
     * * update() --> mongoose.findByIdAndUpdate() method
     * * delete() --> mongoose.findByIdAndDelete() method
     */

class NotesCollection {
  constructor() {}

  async get(category) {
    if (category) return await NotesSchema.find({category});
    else return await NotesSchema.find({});
  }

  async create(noteRecord) {
    let note = new NotesSchema(noteRecord);
    return await note.save();
  }

  async update(_id, newNoteText) {
    return await NotesSchema.findByIdAndUpdate({_id: _id, text: newNoteText});
  }

  async delete(_id) {
    return await NotesSchema.findByIdAndDelete({_id});
  }

}

module.exports = NotesCollection;
