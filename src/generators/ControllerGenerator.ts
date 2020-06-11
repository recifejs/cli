import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';

let controllerName: string = '';

commander
  .name(`recife-cli controller`)
  .arguments('<controller-name>')
  .action(name => (controllerName = name))
  .allowUnknownOption(false)
  .parse(process.argv);

if (controllerName) {
  controllerName = capitalize(
    controllerName.replace(/Controller|\.ts|\.js/g, '')
  );

  controllerName += 'Controller';

  const source = path.join(__dirname, '/../../templates/controller/template');
  const target = path.join(
    process.cwd(),
    'src/controllers',
    `${controllerName}.ts`
  );

  try {
    const contentFile = fs.readFileSync(source).toString();
    fs.writeFileSync(
      target,
      replaceMask(contentFile, { name: controllerName })
    );
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }
} else {
  console.error('\x1b[31mSpecify the name controller.', '\x1b[0m');
  console.log(`  For example: recife-cli controller UserController`);
  console.log(`  Run recife-cli --help for more information\n`);
}
