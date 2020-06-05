import fs from "fs";
import path from "path";
import commander from "commander";
import copyFolder from "../utils/copyFolder";

import createPackageJson from "../stages/CreatePackageJson";
import installDependencies from "../stages/InstallDependencies";
import initializeGit from "../stages/InitializeGit";

class ProjectGenerator {
  generate() {
    let projectName;

    commander
      .name(`recife-cli project`)
      .arguments("<project-name>")
      .action(name => (projectName = name))
      .allowUnknownOption(false)
      .parse(process.argv);

    if (projectName) {
      const source = path.join(__dirname, "/../../template/project");
      const target = path.join(process.cwd(), projectName);

      try {
        fs.mkdirSync(projectName);
        createPackageJson(target, projectName);
        copyFolder(source, target);
        installDependencies(target);
        initializeGit(projectName);
      } catch (err) {
        console.log(`\x1b[31m${err}\x1b[0m`);
      }
    } else {
      console.error("\x1b[31mSpecify the name project.", "\x1b[0m");
      console.log(`  For example: recife-cli project my-project-name`);
      console.log(`  Run recife-cli --help for more information\n`);
    }
  }
}

export default new ProjectGenerator().generate();
