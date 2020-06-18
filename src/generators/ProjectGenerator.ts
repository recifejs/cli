import fs from 'fs';
import path from 'path';
import commander from 'commander';
import copyFolder from '../utils/copyFolder';

import createPackageJson from '../stages/CreatePackageJson';
import installDependencies from '../stages/InstallDependencies';
import initializeGit from '../stages/InitializeGit';
import Log from '../Log';

const createProject = (name: string) => {
  if (name) {
    Log.Instance.infoHeap(`Creating the project`);

    const source = path.join(__dirname, '/../../templates/project');
    const target = path.join(process.cwd(), name);

    try {
      Log.Instance.infoHeap(`Copying files`);
      fs.mkdirSync(name);

      copyFolder(source, target);
      fs.renameSync(
        path.join(target, 'gitignore'),
        path.join(target, '.gitignore')
      );

      createPackageJson(target, name);
      installDependencies(target);
      initializeGit(name);

      Log.Instance.successHeap(`The ${name} project was created.`);
      Log.Instance.info(`Path: ${target}\n\n`);
    } catch (err) {
      Log.Instance.exception(err);
    }
  } else {
    Log.Instance.errorHeap(`Specify the name project.`);
    Log.Instance.info(
      `For example: recife-cli project my-project-name\nRun --help for more information`
    );
  }
};

commander
  .name(`recife-cli project`)
  .arguments('<project-name>')
  .action(name => createProject(name))
  .allowUnknownOption(false)
  .parse(process.argv);
