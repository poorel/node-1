const { execFile } = require('child_process');
const child = execFile('git', ['git name-rev --name-only HEAD'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});