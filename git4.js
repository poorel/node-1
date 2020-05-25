//异步子进程
const childProcess = require('child_process');
const exec = childProcess.exec;

/*let p = exec(`cd ${__dirname} && git name-rev --name-only HEAD`);
console.log(p)*/
/*p.stdout.on('data', function(data) {
  console.log(data)
})
p.stderr.on('data', function(data) {
  console.log(data)
})*/


const getVersion = () => {
  return new Promise((resovle, reject) => {
    childProcess.exec(`cd ${__dirname} && git name-rev --name-only HEAD`, { encoding: 'utf-8' }, (error, stdout, stderr) => {
      console.log(error, stdout, stderr);
      error ? reject(error) : resovle(stdout)
    });
  })
}

getVersion().then(res => {
  console.log('2',res)
}).catch(e => {
  console.log('3',e)
})
