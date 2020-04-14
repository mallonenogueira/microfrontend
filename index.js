const { readdirSync, statSync } = require("fs");
const { join, resolve } = require("path");
const child_process = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // prompt: "",
});

function isDirectory(currentDir) {
  return statSync(currentDir).isDirectory();
}

function getDirs(currentDir) {
  return readdirSync(__dirname).filter(isDirectory);
}

function getExcludedFilter(excludeds) {
  return (file) =>
    !excludeds || !excludeds.includes || !excludeds.includes(file);
}

function getCurrentDirs(dirname) {
  return getDirs(dirname).filter(getExcludedFilter([".git", "node_modules"]));
}

function openAllChildProcess(dirname) {
  const children = [];

  for (const dir of getCurrentDirs(dirname)) {
    const joined = join(dirname, dir);

    const forked = child_process.fork(resolve(__dirname, "child-process.js"), {
      stdio: "inherit",
    });

    forked.send({ file: joined });

    children.push(forked);
  }

  return children;
}

const children = openAllChildProcess(__dirname);

process.on('exit', () => {
  children.forEach((child, index) => {
    proc.send({ exit: true });
    proc.kill('SIGINT');
  });
});
