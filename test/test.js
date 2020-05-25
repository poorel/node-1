/*获取当前git分支名称*/
const { exec,execSync,execFileSync } = require('child_process');
/*
exec(`git name-rev --name-only HEAD`, { encoding: 'utf-8' }, (error, stdout, stderr) => {
  console.log(error, stdout, stderr)
})*/
console.log(process.argv);

let str = execSync(`git name-rev --name-only HEAD`, { encoding: 'utf-8' });
if(!process.argv[2]){
  process.argv[2] = str;
}
console.log(str);
console.log(process.argv[2])
