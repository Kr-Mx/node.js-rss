const { pipeline } = require('stream');
const chalk = require('chalk');
const createReadStream = require('./streams/readStream');
const createTransformStream = require('./streams/transformStream');
const createWriteStream = require('./streams/writeStream');
const CLIOptions = require('./utilities/CLIOptions');

const readStream = createReadStream(CLIOptions.input);
const transformStream = createTransformStream(
  CLIOptions.action,
  CLIOptions.shift
);
const writeStream = createWriteStream(CLIOptions.output);

pipeline(readStream, transformStream, writeStream, err => {
  if (err) {
    console.log(chalk.red(err));
  } else {
    console.log(chalk.green('Success operation'));
  }
});
