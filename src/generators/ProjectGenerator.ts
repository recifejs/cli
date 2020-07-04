import fs from 'fs';
import path from 'path';
import commander from 'commander';
import inquirer from 'inquirer';

import copyFolder from '../utils/copyFolder';
import createPackageJson from '../stages/CreatePackageJson';
import installDependencies from '../stages/InstallDependencies';
import initializeGit from '../stages/InitializeGit';
import Log from '../Log';

const createProject = (projectName: string, packageManager: 'yarn' | 'npm') => {
  Log.Instance.infoHeap(`Creating the project`);

  const source = path.join(__dirname, '/../../templates/project');
  const target = path.join(process.cwd(), projectName);

  try {
    Log.Instance.infoHeap(`Copying files`);
    fs.mkdirSync(projectName);

    copyFolder(source, target);
    fs.renameSync(
      path.join(target, 'gitignore'),
      path.join(target, '.gitignore')
    );

    createPackageJson(target, projectName);
    installDependencies(target, packageManager);
    initializeGit(projectName);

    Log.Instance.successHeap(`The ${projectName} project was created.`);
    Log.Instance.info(`Path: ${target}\n\n`);
  } catch (err) {
    Log.Instance.exception(err);
  }
};

const createProjectWithOptions = () => {
  inquirer
    .prompt([
      {
        name: 'projectName',
        message: 'Project Name:',
        type: 'string',
        default: 'my-project'
      },
      {
        name: 'packageManager',
        message: 'Package Manager:',
        type: 'list',
        default: 'npm',
        choices: ['npm', 'yarn']
      }
    ])
    .then((answers: any) => {
      Log.Instance.jump();
      createProject(answers.projectName, answers.packageManager);
    });
};

commander
  .name(`recife-cli project`)
  .arguments('[project-name]')
  .option('-p, --package-manager <packageManager>', 'Package Manager')
  .action((name, cmd) => {
    console.log(cmd);
    if (name) {
      createProject(name, cmd.packageManager || 'npm');
    } else {
      createProjectWithOptions();
    }
  })
  .allowUnknownOption(false)
  .parse(process.argv);
