import fs from 'fs';
import path from 'path';
import commander from 'commander';
import capitalize from '../utils/capitalize';
import replaceMask from '../utils/replaceMask';

let scalarName: string = '';

commander
  .name(`recife-cli scalar`)
  .arguments('<scalar-name>')
  .action(name => (scalarName = name))
  .allowUnknownOption(false)
  .parse(process.argv);

if (scalarName) {
  scalarName = capitalize(scalarName.replace(/Scalar|\.ts|\.js/g, ''));

  scalarName += 'Scalar';

  const source = path.join(__dirname, '/../../templates/scalar/template');
  const target = path.join(process.cwd(), 'src/scalars', `${scalarName}.ts`);

  try {
    const contentFile = fs.readFileSync(source).toString();
    fs.writeFileSync(
      target,
      replaceMask(contentFile, {
        scalarName,
        name: scalarName.replace('Scalar', '')
      })
    );
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }
} else {
  console.error('\x1b[31mSpecify the name scalar.', '\x1b[0m');
  console.log(`  For example: recife-cli scalar Email`);
  console.log(`  Run -help for more information\n`);
}
