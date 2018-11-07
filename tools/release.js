const resolvePath = require('path').resolve;
const readFileSync = require('fs').readFileSync;
const execSync = require('child_process').execSync;
const prompt = require('readline-sync').question;

const exec = command => execSync(command, { stdio: 'inherit' });

const getPackageVersion = () => JSON.parse(readFileSync(resolvePath(__dirname, '../package.json'))).version;

if (process.cwd() !== resolvePath(__dirname, '..')) {
  console.error('The release script must be run from the repo root');
  process.exit(1);
}

// Get the next version, which may be specified as a semver
// version number or anything `yarn version` recognizes. This
// is a "pre-release" if nextVersion is premajor, preminor,
// prepatch, or prerelease
const nextVersion = prompt(`Next version (current version is ${getPackageVersion()})? `);
const isPrerelease = nextVersion.substr(0, 3) === 'pre' || nextVersion.indexOf('-') !== -1;

// 1) Make sure the tests pass
exec('yarn test');

// 2) Increment the package version in package.json
// 3) Create a new commit
// 4) Create a v* tag that points to that commit
exec(`yarn version ${nextVersion} -m "Version %s"`);

// 5) Publish to yarn. Use the "next" tag for pre-releases,
// "latest" for all others
exec(`yarn publish --access=public --tag ${isPrerelease ? 'next' : 'latest'}`);

// 6) Push the v* tag to GitHub
exec(`git push -f origin v${getPackageVersion()}`);
