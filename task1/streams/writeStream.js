const fs = require('fs');
const chalk = require('chalk');

function writeStream(path) {
  if (fs.existsSync(path)) {
    return fs.createWriteStream(path);
  } else if (!path) {
    return process.stdout;
  }

  process.stderr.write(chalk.red(`Can't find ${path}.`
  ));
  process.exit(1);
}

module.exports = writeStream;
