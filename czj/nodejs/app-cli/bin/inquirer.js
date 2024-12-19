const inquirer = require('inquirer');

function inquirerPrompt(argv) {
  const { name } = argv;

  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '模板名称',
        default: name,
        validate: function(val) {
          if(!/^[a-zA-Z]+$/.test(val)) {
            return "模板名称只能含有英文";
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'type',
        message: '模板类型',
        choices: ['表单', '表格', '动态表单'],
        // filter: function(value) {
        //   console.log(11, value)
        //   return {
        //     '表单': 'form',
        //     '表格': 'table',
        //     '动态表单': 'dynamicForm'
        //   }[value];
        // }
      },
      {
        type: 'list',
        name: 'frame',
        message: '选择框架',
        choices: ['react', 'vue']
      }
    ]).then(answers => {
      const { frame } = answers;
      if(frame === 'react') {
        inquirer.prompt([
          {
            type: 'list',
            name: 'uiLibrary',
            message: '选择UI组件库',
            choices: ['Ant Design'],
          },
        ]).then(answers1 => {
          resolve({
            ...answers,
            ...answers1
          })
        }).catch(error => {
          reject(error);
        })
      }

      if(frame === 'vue') {
        inquirer.prompt([
          {
            type: 'list',
            name: 'ui-library',
            message: '选择UI组件库',
            choices: ['Element'],
          },
        ]).then(answers2 => {
          resolve({
            ...answers,
            ...answers2
          })
        }).catch(error => {
          reject(error);
        })
      }
    }).catch(error => {
      reject(error);
    })
  });
}

exports.inquirerPrompt = inquirerPrompt;