#!/usr/bin/env node

'use strict';

import commander from 'commander';
import path from 'path';
import Log from './Log';

const packageJson = require(path.join(__dirname, '../package.json'));

Log.Instance.title(`RecifeJs CLI`);

commander
  .version(packageJson.version, '-v --version', 'Version number')
  .helpOption('-h --help', 'For more information');
commander
  .name(`recife-cli`)
  .command('project', 'Generate a project', {
    executableFile: path.join(__dirname, 'generators/ProjectGenerator.js')
  })
  .command('controller', 'Create a controller', {
    executableFile: path.join(
      __dirname,
      '../dist/generators/ControllerGenerator.js'
    )
  })
  .command('scalar', 'Create a scalar', {
    executableFile: path.join(
      __dirname,
      '../dist/generators/ScalarGenerator.js'
    )
  })
  .command('validator', 'Create a validator', {
    executableFile: path.join(
      __dirname,
      '../dist/generators/ValidatorGenerator.js'
    )
  })
  .command('model', 'Create a model', {
    executableFile: path.join(__dirname, '../dist/generators/ModelGenerator.js')
  })
  .allowUnknownOption(false);

commander.parse(process.argv);
