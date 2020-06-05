import { spawnSync } from "child_process";

const initializeGit = (projectName: string) => {
  const originalDirectory = process.cwd();

  try {
    process.chdir(projectName);

    spawnSync("git", ["init"], { stdio: "inherit" });
    spawnSync("git", ["add", "*"], { stdio: "inherit" });
    spawnSync("git", ["commit", "-m", "First Commit"], { stdio: "inherit" });
  } catch (err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
  }

  process.chdir(originalDirectory);
};

export default initializeGit;
