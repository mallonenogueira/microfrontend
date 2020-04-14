const { readdirSync } = require("fs");
const npm = require("npm");

const promisify = (callback) => {
  return (...params) => new Promise((resolve) => callback(...params, resolve));
};

const npmPromise = {
  async load(...params) {
    await promisify(npm.load)(...params);

    this.install = promisify(npm.commands.install);
    this.start = promisify(npm.commands.start);
  },
};

async function runNpm(dir) {
  process.chdir(dir);

  try {
    await npmPromise.load({ loaded: false });

    const files = readdirSync(dir);

    if (!files || !files.includes("package.json")) {
      return;
    }

    if (!files.includes("node_modules")) {
      await npmPromise.install();
    }

    await npmPromise.start();
  } catch (err) {
    console.error(err.message);
  }
}

process.on("message", ({ file, exit }) => {
  if (exit) {
    process.exit(0);
    return;
  }

  runNpm(file);
});
