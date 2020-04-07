var fs = require("fs");
let data='';
var readerStream = fs.createReadStream('./lang_zh.json');
readerStream.setEncoding('UTF8');
readerStream.on('data', function(chunk) {
  data += chunk;
});

readerStream.on('end',function(){
  data = JSON.parse(data);
  for(let i in data){
    if(i.indexOf('fed.') === -1){
      delete data[i];
    }
  }
  data = JSON.stringify(data);
  var writerStream = fs.createWriteStream('./lang_zh.json');
  writerStream.write(data,'UTF8');
  writerStream.end();
  writerStream.on('finish', function() {
    console.log("写入完成。");
  });

});

readerStream.on('error', function(err){
  console.log(err.stack);
});