#!/usr/bin/env node

'use strict';

import commander from 'commander';
import path from 'path';

const packageJson = require(path.join(__dirname, '../package.json'));

console.log('\x1b[36mRecife CLI', '\x1b[0m');
console.log(`🚀 Version: ${packageJson.version}\n`);

commander
  .version(packageJson.version, '-v --version', 'Version number')
  .helpOption('-h --help', 'For more information');

commander
  .name(`recife-cli`)
  .command('project', 'Generate a project', {
    executableFile: './generators/ProjectGenerator.js'
  })
  .command('controller', 'Create a controller', {
    executableFile: './generators/ControllerGenerator'
  })
  .allowUnknownOption(false);

commander.parse(process.argv);
