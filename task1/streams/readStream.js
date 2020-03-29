const fs = require('fs');
const chalk = require('chalk');

const readStream = path => {
  if (fs.existsSync(path)) {
    return fs.createReadStream(path);
  }
  if (!path) {
    process.stdout.write(chalk.blue('Input text: '));
    return process.stdin;
  }

  process.stderr.write(chalk.red(`Can't find ${path}.\n`)
  );
  process.exit(1);
};

module.exports = readStream;
