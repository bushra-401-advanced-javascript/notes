'use strict';

/** Input library module:
 * read cli arguments => `process.argv`
 * validate the cli arguments => `validateArgs` prototype
 * parse the valid arguments => `minimist`
 * create and return an instance of the parsed arguments => `createArgObj` prototype
 * export the C.F. => `module.exports`
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
    const validDeleteOption = /^--delete (\d\w+\b)/gi;
    if (validAddOption.test(argString) || validListOption.test(argString) || validDeleteOption.test(argString)) {
      return arg;
    }
    else {
      console.log('\nInvalid Input!\n\n* To Add a New Note >>>> <--add>/<-a> "<note text>" <--category> <category name>\n  i.e. --add “This is fun” –-category school\n\n* To List Saved Notes >>>> <--list> or <--list> <category name>\n  i.e. --list or --list school\n\n* To Delete a Note >>>> <--delete> <note id>\n  i.e. --delete 5ec430115e594148208cc849\n');
    }
  }

  //creating and returning an instance prototype
  createArgObj(parsedArg)  {
    let action = Object.keys(parsedArg)[1];
    if (action === 'add' | action === 'a') {
      let addNoteObj = {
        action: action,
        playload: Object.values(parsedArg)[1],
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

    if (action === 'delete') {
      let deleteNoteObj = {
        action: action,
        id: Object.values(parsedArg)[1],
      };
      return deleteNoteObj;
    }

  }
}
//exporting the C.F.
module.exports = Input;
