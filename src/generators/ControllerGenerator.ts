import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';
import Log from '../Log';

commander
  .name(`recife-cli controller`)
  .arguments('<controller-name>')
  .action(name => createController(name))
  .allowUnknownOption(false)
  .parse(process.argv);

const createController = (name: string) => {
  if (name) {
    Log.Instance.infoHeap(`Creating the controller`);

    name = capitalize(name.replace(/Controller|\.ts|\.js/g, ''));

    name += 'Controller';

    const source = path.join(__dirname, '/../../templates/controller/template');
    const target = path.join(process.cwd(), 'src/controllers', `${name}.ts`);

    try {
      const contentFile = fs.readFileSync(source).toString();
      fs.writeFileSync(target, replaceMask(contentFile, { name }));

      Log.Instance.successHeap(`The controller ${name} created.`);
      Log.Instance.info(`Path: ${target}`);
    } catch (err) {
      Log.Instance.exception(err);
    }
  } else {
    Log.Instance.errorHeap(`Specify the name controller.`);
    Log.Instance.info(
      `For example: recife-cli controller User\nRun --help for more information`
    );
  }
};
