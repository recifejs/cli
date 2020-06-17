import fs from 'fs';
import path from 'path';
import Log from '../Log';

const createPackageJson = (target: string, name: string) => {
  Log.Instance.infoHeap(`Creating file package.json`);

  const basePackageJson = {
    name: name,
    version: '0.0.1',
    license: 'MIT',
    scripts: {
      start: 'recife start',
      server: 'recife server',
      build: 'recife build'
    },
    dependencies: {
      recife: '^0.5.0',
      typescript: '^3.*'
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
