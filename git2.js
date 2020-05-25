const { exec } = require('child_process');
exec(`git name-rev --name-only HEAD`, { encoding: 'utf-8' }, (error, stdout, stderr) => {
  console.log(error, stdout, stderr)
})