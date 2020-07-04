import fs from 'fs';
import path from 'path';
import commander from 'commander';
import inquirer from 'inquirer';

import { replaceMaskFile } from '../utils/replaceMask';
import copyFolder from '../utils/copyFolder';
import createPackageJson from '../stages/CreatePackageJson';
import installDependencies from '../stages/InstallDependencies';
import initializeGit from '../stages/InitializeGit';
import Log from '../Log';

const createProject = (
  projectName: string,
  packageManager: 'yarn' | 'npm',
  httpFramework: 'koa' | 'express' | 'hapi'
) => {
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
    replaceMaskFile(path.join(target, 'config/app.ts'), {
      projectName,
      httpFramework
    });

    createPackageJson(target, projectName, httpFramework);
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
      },
      {
        name: 'httpFramework',
        message: 'Http Framework:',
        type: 'list',
        default: 'koa',
        choices: ['koa', 'express', 'hapi']
      }
    ])
    .then((answers: any) => {
      Log.Instance.jump();
      createProject(
        answers.projectName,
        answers.packageManager,
        answers.httpFramework
      );
    });
};

commander
  .name(`recife-cli project`)
  .arguments('[project-name]')
  .option('-p, --package-manager <packageManager>', 'Package Manager', 'npm')
  .option('-h, --http-framework <httpFramework>', 'Http Framework', 'koa')
  .action((name, cmd) => {
    if (name) {
      createProject(name, cmd.packageManager, cmd.httpFramework);
    } else {
      createProjectWithOptions();
    }
  })
  .allowUnknownOption(false)
  .parse(process.argv);
