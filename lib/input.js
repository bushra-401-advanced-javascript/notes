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
      this.noteText = Object.values(parsedArgs)[1];
      if (this.noteText.length > 1) {this.argObj = this.createArgObj(parsedArgs);}  //validate that the note text is not an empty string, then create an instance of the parsed argument
      else {console.log('Please Enter Note Text');}
    }
  }   

  validateArgs(arg) {
    //validate note text  
    if (arg.length === 1) {
      console.log('Please Add Note Text');
    }
    //validate argument option
    else {
      const argOption = arg[0];
      const validOptions = /^--add$|^-a$/gi;
      return validOptions.test(argOption) ? arg : console.log(argOption, ' Is Not Valid, Try --add or -a');
    }
  }

  //creating and returning an instance prototype
  createArgObj(parsedArg)  {
    let argObj = {
      action: Object.keys(parsedArg)[1],
      playload: Object.values(parsedArg)[1],
    };
    return argObj;
  }

}

//exporting the C.F.
module.exports = Input;
