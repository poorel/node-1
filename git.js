//异步子进程
const childProcess = require('child_process');
console.log(__dirname)
const getVersion = () => {
  return new Promise((resovle, reject) => {
    childProcess.exec(`git name-rev --name-only HEAD`, { encoding: 'utf-8' }, (stdout, error, status, output) => {
      console.log(stdout, error, status, output);
      error ? reject(error) : resovle(stdout)
    });
  })
}

getVersion().then(res => {
  console.log(res)
}).catch(e => {
  console.log('3',e)
})
