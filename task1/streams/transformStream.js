const { Transform } = require('stream');
const caesarCipher = require('../utilities/caesarCipher');
const chalk = require('chalk');

function transformStream(action, shift) {
  return new Transform({

    transform(chunk, encoding, callback) {
      if (action === 'encode') {
        this.push(caesarCipher.encode(chunk.toString('utf-8'), shift));
        callback();
        console.log(chalk.green('Encoded'));
      } else if (action === 'decode') {
        this.push(caesarCipher.decode(chunk.toString('utf-8'), shift));
        callback();
        console.log(chalk.green('Decoded'));
      } else {
        console.error(chalk.red('Something went wrong'));
        process.exit(1);
      }
    }
  });
}

module.exports = transformStream;
