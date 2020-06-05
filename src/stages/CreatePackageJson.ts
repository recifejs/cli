import fs from 'fs';
import path from 'path';

const createPackageJson = (target: string, name: string) => {
  const basePackageJson = {
    name: name,
    version: '0.0.1',
    license: 'MIT',
    scripts: {
      start: 'tsc && recife start',
      build: 'tsc -p .'
    },
    dependencies: {
      recife: '^0.2.0'
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version'
      ]
    }
  };

  fs.writeFileSync(
    path.join(target, 'package.json'),
    JSON.stringify(basePackageJson, null, 2)
  );
};

export default createPackageJson;
