import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';

let modelName: string = '';

commander
  .name(`recife-cli model`)
  .arguments('<model-name>')
  .action(name => (modelName = name))
  .allowUnknownOption(false)
  .parse(process.argv);

if (modelName) {
  modelName = capitalize(modelName.replace(/Model|\.ts|\.js/g, ''));

  modelName += 'Model';

  const source = path.join(__dirname, '/../../templates/model/template');
  const target = path.join(process.cwd(), 'src/models', `${modelName}.ts`);

  try {
    const contentFile = fs.readFileSync(source).toString();
    fs.writeFileSync(target, replaceMask(contentFile, { name: modelName }));

    console.info(`\x1b[36mCreating the model ${modelName}.`, '\x1b[0m');
    console.info(`Path: ${target}`, '\x1b[0m\n');
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }
} else {
  console.error('\x1b[31mSpecify the name model.', '\x1b[0m');
  console.log(`  For example: recife-cli model User`);
  console.log(`  Run --help for more information\n`);
}
