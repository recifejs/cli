import fs from 'fs';
import path from 'path';
import commander from 'commander';
import copyFolder from '../utils/copyFolder';

import createPackageJson from '../stages/CreatePackageJson';
import installDependencies from '../stages/InstallDependencies';
import initializeGit from '../stages/InitializeGit';

let projectName;

commander
  .name(`recife-cli project`)
  .arguments('<project-name>')
  .action(name => (projectName = name))
  .allowUnknownOption(false)
  .parse(process.argv);

if (projectName) {
  const source = path.join(__dirname, '/../../templates/project');
  const target = path.join(process.cwd(), projectName);

  try {
    fs.mkdirSync(projectName);

    copyFolder(source, target);
    fs.renameSync(
      path.join(target, 'gitignore'),
      path.join(target, '.gitignore')
    );

    createPackageJson(target, projectName);
    installDependencies(target);
    initializeGit(projectName);

    console.info(`\x1b[36mCreating the project ${projectName}.`, '\x1b[0m');
    console.info(`Path: ${target}`, '\x1b[0m\n');
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }
} else {
  console.error('\x1b[31mSpecify the name project.', '\x1b[0m');
  console.log(`  For example: recife-cli project my-project-name`);
  console.log(`  Run --help for more information\n`);
}
