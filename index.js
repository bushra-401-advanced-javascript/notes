
const Input = require('./lib/input.js');
const Note = require('./lib/notes.js');
const mongoose = require('mongoose');

//connnecting to DB
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';
mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('\n***DB Connected!***\n');
    let input = new Input;
    async function notesy (input) {
      await new Note(input);
      // .then(() => {
      //   console.log('\nPress Ctrl + c To Exit..');
      // });
    }
    notesy(input)
      .then(console.log('\nPress <Ctrl + C> To Exit..\n'));
  }) 
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });


// let input = new Input;
// if (input.validArg) {
//   new Note(input);
// }
// mongoose.disconnect();

////////////////////////////////////////
/** 
 *Note: The following code snippet is copied from an answer on Stack Overflow, I also found the same code in an article on Midium.
 *I'm using this code snippet to disconnect from the DB, because using `mongoose.disconnect()` command gave me an error : 
 `UnhandledPromiseRejectionWarning: MongoError: Topology is closed, please connect at processWaitQueue...`
 *I tried to use it in different positions and in various ways but I kept receiving this error and the notes didn't get saved in the DB.
 *I think the issue is due to the async functions used by the schema, maybe the disconnection was happening before these functions finish their job.
 **/
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log(' -- Mongoose disconnected on app termination\n');
    process.exit(0);
  });
});
////////////////////////////////////////

