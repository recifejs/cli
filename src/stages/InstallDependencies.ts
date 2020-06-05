import { spawnSync } from "child_process";

const yarnInstalled = () => {
  try {
    spawnSync("yarnpkg", ["--version"], { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
};

const installDependencies = (target: string) => {
  const originalDirectory = process.cwd();

  try {
    process.chdir(target);

    if (yarnInstalled) {
      spawnSync("yarnpkg", ["install"], { stdio: "inherit" });
    } else {
      spawnSync("npm", ["install"], { stdio: "inherit" });
    }
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }

  process.chdir(originalDirectory);
};

export default installDependencies;
