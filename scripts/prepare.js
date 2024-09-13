const { execSync } = require('child_process')

const defaultExecOpts = Object.freeze({ encoding: 'utf-8', env: { ...process.env }, stdio: 'inherit' })

const executeCmdPipe = (command) => {
  return execSync(command, {
    ...defaultExecOpts,
    stdio: 'pipe',
  })
}

const executeCmdInherit = (command) => {
  return execSync(command, {
    ...defaultExecOpts,
    stdio: 'inherit',
  })
}

// Load JSON file as object
console.log('Fixing package.json');
const fs = require('fs');
const path = require('path');
const jsonPath = path.resolve(__dirname, '../dist/pedro-yan/package.json');
const packageJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Fix json and write it
packageJson.scripts = { start: 'node index.js' };
fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2));

console.log('Installing dependencies to align package.json with the package-lock.json');

// Install dependencies
executeCmdPipe('cd ./dist/pedro-yan && npm install');
console.log('Running deployment wizard');
executeCmdInherit('cd ./dist/pedro-yan && gcloud run deploy')





