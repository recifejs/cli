import fs from 'fs';
import path from 'path';
import Log from '../Log';

const versions = {
  koa: '^0.1.0',
  express: '^0.1.0',
  hapi: '^0.1.0',
  fastify: '^0.1.0'
};

const createPackageJson = (
  target: string,
  name: string,
  httpFramework: 'koa' | 'express' | 'hapi' | 'fastify'
) => {
  Log.Instance.infoHeap(`Creating file package.json`);

  let basePackageJson: any = {
    name: name,
    version: '0.0.1',
    license: 'MIT',
    scripts: {
      start: 'recife start',
      server: 'recife server',
      build: 'recife build'
    },
    dependencies: {
      recife: '^0.7.0',
      typescript: '^3.*'
    }
  };

  basePackageJson.dependencies[`recife-${httpFramework}`] =
    versions[httpFramework];

  fs.writeFileSync(
    path.join(target, 'package.json'),
    JSON.stringify(basePackageJson, null, 2)
  );
};

export default createPackageJson;
