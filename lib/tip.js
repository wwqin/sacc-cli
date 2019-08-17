const chalk = require('chalk');

module.exports = {
  suc: (msg) => console.log(chalk.green.bold(`\n√ Success:   ${msg}\n`)),
  fail: (msg) => console.log(chalk.red.bold(`\n× Error:   ${msg}\n`)),
  info: (msg) => console.log(chalk.blue(`\n! Warning:   ${msg}\n`)),
};


var a = {};
b = {key:'b'};
c = {key:'c'};
a[b] = 123;//a[object] = 123
a[c] = 456;//a[object] = 456
console.log(a[b]);//a[object]