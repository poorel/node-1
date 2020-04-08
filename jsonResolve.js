var fs = require("fs");
let data='';
let data1={};
let data2={};
var readerStream = fs.createReadStream('./lang_zh.json');
readerStream.setEncoding('UTF8');
readerStream.on('data', function(chunk) {
  data += chunk;
});

readerStream.on('end',function(){
  let obj = {};
  data1 = JSON.parse(data);
  //data2 = JSON.parse(data);
  let arr = Object.values(data1);

  let arr1 = [];
  let arr2 = [];
  arr.forEach((item) => {
    if(arr1.indexOf(item) > -1 && arr2.indexOf(item) === -1){
      arr2.push(item);
    }else {
      arr1.push(item);
    }
  });

  for(let i in data1){
    if(arr2.indexOf(data1[i]) > -1){
      obj[i] = data1[i];
    }
  }
  /*for(let i in data){
    if(i.indexOf('fed.') === -1){
      delete data[i];
    }
  }*/
  console.log(obj)
  fs.writeFileSync('./repetition.json',JSON.stringify(obj));
  /*var writerStream = fs.createWriteStream('./lang_zh.json');
  writerStream.write(data,'UTF8');
  writerStream.end();
  writerStream.on('finish', function() {
    console.log("写入完成。");
  });*/

});

readerStream.on('error', function(err){
  console.log(err.stack);
});