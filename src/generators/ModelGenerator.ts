import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';
import Log from '../Log';

const createModel = (name: string) => {
  if (name) {
    Log.Instance.infoHeap(`Creating the model`);

    name = capitalize(name.replace(/Model|\.ts|\.js/g, ''));
    name += 'Model';

    const source = path.join(__dirname, '/../../templates/model/template');
    const target = path.join(process.cwd(), 'src/models', `${name}.ts`);

    try {
      const contentFile = fs.readFileSync(source).toString();
      fs.writeFileSync(target, replaceMask(contentFile, { name }));

      Log.Instance.successHeap(`The model ${name} created.`);
      Log.Instance.info(`Path: ${target}\n\n`);
    } catch (err) {
      Log.Instance.exception(err);
    }
  } else {
    Log.Instance.errorHeap(`Specify the name model.`);
    Log.Instance.info(
      `For example: recife-cli model User\nRun --help for more information`
    );
  }
};

commander
  .name(`recife-cli model`)
  .arguments('<model-name>')
  .action(name => createModel(name))
  .allowUnknownOption(false)
  .parse(process.argv);
