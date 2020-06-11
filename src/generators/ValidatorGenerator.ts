import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';

let validatorName: string = '';

commander
  .name(`recife-cli validator`)
  .arguments('<validator-name>')
  .action(name => (validatorName = name))
  .allowUnknownOption(false)
  .parse(process.argv);

if (validatorName) {
  validatorName = capitalize(validatorName.replace(/Validator|\.ts|\.js/g, ''));

  validatorName += 'Validator';

  const source = path.join(__dirname, '/../../templates/validator/template');
  const target = path.join(
    process.cwd(),
    'src/validators',
    `${validatorName}.ts`
  );

  try {
    const contentFile = fs.readFileSync(source).toString();
    fs.writeFileSync(target, replaceMask(contentFile, { name: validatorName }));
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }
} else {
  console.error('\x1b[31mSpecify the name validator.', '\x1b[0m');
  console.log(`  For example: recife-cli validator User`);
  console.log(`  Run --help for more information\n`);
}
