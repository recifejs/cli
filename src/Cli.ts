#!/usr/bin/env node

"use strict";

import commander from "commander";

console.log("\x1b[36mRecife CLI", "\x1b[0m");
console.log(`🚀 Version: ${require("./package.json").version}\n`);

commander
  .version(require("../package.json").version, "-v --version", "Version number")
  .helpOption("-h --help", "For more information");

commander
  .name(`${require("./package.json").name} new`)
  .command("project", "Generate a project", {
    executableFile: "./generators/ProjectGenerator"
  })
  .command("controller", "Create a controller", {
    executableFile: "./generators/ControllerGenerator"
  })
  .allowUnknownOption(false);
