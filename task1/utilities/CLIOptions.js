const CLIOptions = require('yargs')
  .option('shift', {
    alias: 's',
    describe: 'Letters shift value',
    type: 'number'
  })
  .option('input', {
    alias: 'i',
    describe: 'Path to input file',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    describe: 'Path to output file',
    type: 'string'
  })
  .option('action', {
    alias: 'a',
    describe: 'Encode or decode action',
    choices: ['encode', 'decode']
  }).argv
;
module.exports = CLIOptions;
