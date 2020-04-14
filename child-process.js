const { readdirSync } = require("fs");
const npm = require("npm");

async function runNpm(dir) {
  process.chdir(dir);

  await new Promise((resolve) => {
    npm.load(
      {
        loaded: false,
      },
      resolve
    );
  });

  if(!readdirSync(dir).includes("package.json")) {
    return;
  }

  if (readdirSync(dir).includes("node_modules")) {
    npm.run("start");
  } else {
    npm.commands.install([], () => npm.run("start"));
  }
}

process.on("message", ({ file, exit }) => {
  if (exit) {
    process.exit(0);
    return;
  }

  runNpm(file);
});
