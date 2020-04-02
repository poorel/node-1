var fs = require("fs");
let components = []
const files = fs.readdirSync('./test')
files.forEach(function (item, index) {
  let stat = fs.lstatSync("./test/" + item)
  if (stat.isDirectory() === true) {
    components.push(item)
  }
  console.log(item);
})

