const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');
const chalk = require('chalk');

// Exit if the tool runs a part of `yarn install`
if (inInstall()) process.exit(0);

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log(chalk.blue('🚀  Building CommonJS modules ...'));

exec('babel modules -d . --ignore __tests__', {
  BABEL_ENV: 'cjs',
});

console.log(chalk.blue('\n🚀  Building ES modules ...'));

exec('babel modules -d es --ignore __tests__', {
  BABEL_ENV: 'es',
});

console.log(chalk.blue('\n🚀  Building jobcloud-sdk.js ...'));

exec('webpack modules/index.js --output umd/jobcloud-sdk.js', {
  NODE_ENV: 'production',
});

console.log(chalk.blue('\n🚀  Building jobcloud-sdk.min.js ...'));

exec('webpack -p modules/index.js umd/jobcloud-sdk.min.js', {
  NODE_ENV: 'production',
});

const size = gzipSize.sync(fs.readFileSync('umd/jobcloud-sdk.min.js'));

console.log('\n✅  Done. gzipped, the UMD build is %s', prettyBytes(size));
