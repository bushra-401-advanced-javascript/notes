'use strict';

/** Input library module:
 * read cli arguments => `process.argv`
 * validate the cli arguments => `validateArgs` prototype
 * parse the valid arguments => `minimist`
 * create and return an instance of the parsed arguments => `createArgObj` method
 * export the Class => `module.exports`
 */

//require minimist library
const minimist = require('minimist');

//Class
class Input {

  constructor() {
    const args = process.argv.slice(2);  //read cli argument
    this.validArg = this.validateArgs(args);  //validate cli argument
    if (this.validArg) {
      const parsedArgs = minimist(this.validArg);  //parse cli argument
      this.argObj = this.createArgObj(parsedArgs); //create an instance of the parsed argument
    }
  }   

  validateArgs(arg) {
    const argString = arg.join(' ');
    const validAddOption = /^(--add|-a) ([\s\S]*) --category \w+$/gi;
    const validListOption = /^--list$|^--list\s\w+$/gi;
    const validUpdateOption = /^--update (\d\w+) ([\s\S]*)\S$/gi;
    const validDeleteOption = /^--delete (\d\w+\b)/gi;
    if (validAddOption.test(argString) || validListOption.test(argString) || validUpdateOption.test(argString) || validDeleteOption.test(argString)) {
      return arg;
    }
    else {
      console.log('\nInvalid Input!\n\n* To Add a New Note >>>> <--add>/<-a> "note_text" <--category> category_name\n  i.e. --add “This is fun” --category school\n\n* To List Saved Notes >>>> <--list> or <--list> category_name\n  i.e. --list or --list school\n\n* To Update A Note >>>> <--update> note_id\n  i.e. --update 5ec430115e594148208cc849\n\n* To Delete a Note >>>> <--delete> note_id\n  i.e. --delete 5ec430115e594148208cc849\n');
    }
  }

  //creating and returning an instance method
  createArgObj(parsedArg)  {
    let action = Object.keys(parsedArg)[1];

    if (action === 'add' | action === 'a') {
      let noteText = Object.values(parsedArg)[1] + ' ' + Object.values(parsedArg)[0].join(' ');
      let addNoteObj = {
        action: action,
        payload: noteText,
        category: Object.values(parsedArg)[2],
      };
      return addNoteObj;
    }

    if (action === 'list') {
      let listNotesObj = {
        action: action,
        category: Object.values(parsedArg)[1], //if the category is not passed with the list command, it's value will be true.
      };
      return listNotesObj;
    }

    if (action === 'update') {
      let updateNoteObj = {
        action: action,
        id: Object.values(parsedArg)[1],
        text: Object.values(parsedArg)[0][0],
      };
      return updateNoteObj;
    }

    if (action === 'delete') {
      let deleteNoteObj = {
        action: action,
        id: Object.values(parsedArg)[1],
      };
      return deleteNoteObj;
    }

  }
}
//exporting the Class
module.exports = Input;
