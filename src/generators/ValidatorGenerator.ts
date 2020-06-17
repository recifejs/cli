import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';
import Log from '../Log';

const createValidator = (name: string) => {
  if (name) {
    Log.Instance.infoHeap(`Creating the validator`);

    name = capitalize(name.replace(/Validator|\.ts|\.js/g, ''));
    name += 'Validator';

    const source = path.join(__dirname, '/../../templates/validator/template');
    const target = path.join(process.cwd(), 'src/validators', `${name}.ts`);

    try {
      const contentFile = fs.readFileSync(source).toString();
      fs.writeFileSync(target, replaceMask(contentFile, { name }));

      Log.Instance.successHeap(`The validator ${name} created.`);
      Log.Instance.info(`Path: ${target}\n\n`);
    } catch (err) {
      Log.Instance.exception(err);
    }
  } else {
    Log.Instance.errorHeap(`Specify the name validator.`);
    Log.Instance.info(
      `For example: recife-cli validator User\nRun --help for more information`
    );
  }
};

commander
  .name(`recife-cli validator`)
  .arguments('<validator-name>')
  .action(name => createValidator(name))
  .allowUnknownOption(false)
  .parse(process.argv);
