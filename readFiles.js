var fs = require("fs");
let p = Promise.all([fs.readFileSync("./lang_zh.json"), fs.readFileSync("./needDelete.json")]);
console.log(1)
p.then(function (data) {
  console.log(JSON.parse(data[1]));
},function (err) {
  console.log(err);
})
console.log(2)