import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';
import Log from '../Log';

const createScalar = (name: string) => {
  if (name) {
    Log.Instance.infoHeap(`Creating the scalar`);

    name = capitalize(name.replace(/Scalar|\.ts|\.js/g, ''));
    name += 'Scalar';

    const source = path.join(__dirname, '/../../templates/scalar/template');
    const target = path.join(process.cwd(), 'src/scalars', `${name}.ts`);

    try {
      const contentFile = fs.readFileSync(source).toString();
      fs.writeFileSync(
        target,
        replaceMask(contentFile, {
          scalarName: name,
          name: name.replace('Scalar', '')
        })
      );

      Log.Instance.successHeap(`The scalar ${name} created.`);
      Log.Instance.info(`Path: ${target}\n\n`);
    } catch (err) {
      Log.Instance.exception(err);
    }
  } else {
    Log.Instance.errorHeap(`Specify the name scalar.`);
    Log.Instance.info(
      `For example: recife-cli scalar Email\nRun --help for more information`
    );
  }
};

commander
  .name(`recife-cli scalar`)
  .arguments('<scalar-name>')
  .action(name => createScalar(name))
  .allowUnknownOption(false)
  .parse(process.argv);
