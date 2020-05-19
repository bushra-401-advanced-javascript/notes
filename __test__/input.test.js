'use strict';

const Input = require('../lib/input.js');

jest.spyOn(global.console, 'log');

describe('Input Module', () => {
    
  it('validateArgs() for validating cli arguments when theresn\'t a note text in the input and valid input oprtions are used', () => {
    let input = new Input();
    const arg = ['--add'] || ['-a'];
    input.validateArgs(arg);
    expect(console.log).toHaveBeenNthCalledWith(2,'Please Add Note Text');
  });

  it('validateArgs() for validating cli arguments when theresn\'t a note text in the input and invalid input oprtions are used', () => {
    let input = new Input();
    const arg = ['-add'] || ['--a'];
    input.validateArgs(arg);
    const argOption = arg[0];
    expect(console.log).toHaveBeenNthCalledWith(4,`${argOption} Is Not Valid, Try --add or -a`);
  });

  it('validateArgs() for validating cli arguments when there\'s a note text in the input and invalid input oprtions are used', () => {
    let input = new Input();
    const arg = ['-add', 'new note'] || ['--a', 'new note'];
    input.validateArgs(arg);
    const argOption = arg[0];
    expect(console.log).toHaveBeenNthCalledWith(4,`${argOption} Is Not Valid, Try --add or -a`);
  });

  it('validateArgs() for validating cli arguments when there\'s a note text in the input and valid input oprtions are used', () => {
    let input = new Input();
    const arg = ['--add', 'new note'] || ['-a', 'new note'];
    const argOption = arg[0];
    expect(input.validateArgs(arg)).toBe(arg);
  });

  it('createArgObj() for returning an object with input information', () => {
    let input = new Input();
    const parsedArg = { _: [], add: 'note text' };
    let argObj = {
      action: Object.keys(parsedArg)[1],
      playload: Object.values(parsedArg)[1],
    };
    expect(input.createArgObj(parsedArg)).toStrictEqual(argObj);
  });
});