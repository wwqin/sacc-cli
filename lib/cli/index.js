const program = require('commander');
const packageInfo = require('../../package.json');


program
    .command('version')
    .description('查看版本号')
    .alias('v') // 简写
    .version(packageInfo.version)

program
    .command('init')
    .description('生成一个项目')
    .alias('i') // 简写
    .action(() => {
      require('../cmd/init')();
    });

program.parse(process.argv);

if(!program.args.length){
  program.help()
}