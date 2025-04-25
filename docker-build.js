const { execSync } = require('child_process');

// Extract `--tag=...` argument from command line
const args = process.argv.slice(2);
const tagArg = args.find(arg => arg.startsWith('--tag='));
const tag = tagArg ? tagArg.split('=')[1] : execSync('git describe --tags --always').toString().trim();

console.log(`Building Docker image with tag: ${tag}`);

execSync(`docker build --build-arg APP_VERSION=${tag} -t my-app:${tag} .`, { stdio: 'inherit' });
