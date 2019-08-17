'use strict'
// 操作命令行
const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');
const tip = require('../tip');
const tpls = require('../../templates.json');
const spinner1 = ora('正在生成文件目录...');
const spinner2 = ora('正在在执行install...');
const inquirer = require('inquirer')
const execRm = async (err, projectName, tplName) => {
  spinner2.stop();
  console.log('√项目install成功')
  if (err) {
      tip.info('请尝试手动删除.git文件夹!');
  }
  tip.suc('初始化完成！');
  process.exit();
};

const download = async (err, projectName, tplName) => {
  spinner1.stop();
  console.log('√文件目录生成成功')
  if (err) {
    tip.fail('文件名称重复!');
    process.exit();
  }
  spinner2.start();
  // 删除 git 文件
  await exec('cd ' + projectName + ' && npm install && rm -rf .git' , (err, out) => {
    execRm(err, projectName, tplName);
  });
}

const resolve = (result) => {
  const { tplName, url, branch, projectName, } = result;
  // git命令，远程拉取项目并自定义项目名
  const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;

  spinner1.start();

  exec(cmdStr, (err) => {
    download(err, projectName, tplName);
  });
};

module.exports = () => {
 co(function *() {
    // 处理用户输入
    let tplName;
    const projectName = yield prompt('请输入项目名字: ');
    yield inquirer.prompt([ { 
      type: 'list',
      name:'type',
      message: '请选择项目框架?', 
      default: 'react',
      choices: ['react','vue','react+redux','react+next']
    }]).then((answers) => { tplName = answers.type})
    if (!tpls.tpl[tplName]) {
      tip.fail('输入错误!');
      process.exit();
    }

    return new Promise((resolve, reject) => {
      resolve({
        tplName,
        projectName,
        ...tpls.tpl[tplName],
      });
    });
  }).then(resolve);
}