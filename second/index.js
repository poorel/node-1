var fs = require("fs");
var path=require('path');

let typeArr = ['.html','.js','.jade','.vue'];
let obj = {
  'lang.wms.fed.printSettings' : '待替换1',
  'lang.wms.fed.first' : '待替换2'
};

let str = './BaseSet';

function test(str) {
  fs.readdir(str, function (err, files) {
    if (err) {
      return console.log('目录不存在')
    }
    files.forEach((item) => {

      let filePath = str + "/" + item;
      // 判断文件目录是否存在
      if(!fs.statSync(filePath).isDirectory()){
        // 创建可读流
        if(typeArr.indexOf(path.extname(item)) === -1){
          console.log('无需改动的类型', path.extname(item));
          return
        }
        var data = '';
        var readerStream = fs.createReadStream(filePath);
        readerStream.setEncoding('UTF8');
        readerStream.on('data', function(chunk) {
          data += chunk;
        });

        readerStream.on('end',function(){
          data = data.replace(/((console\.log\((\'|\"))*\/*\s*((\'|\"))*[\u2E80-\u9FFF]+\s*[\u2E80-\u9FFF]+!*\?*((\'|\"))*)/g,function (c) {
            console.log(c);
          });
          return;
          data = data.replace(/\$L\((.+?)\)/g,function (c) {
            let arr =  c.split("'");
            for (let i in obj) {
              if(obj[i] === arr[1]){
                arr[1] = i;
                break;
              }
            }
            return arr.join("'");
          });
          var writerStream = fs.createWriteStream(filePath);
          writerStream.write(data,'UTF8');
          writerStream.end();
          writerStream.on('finish', function() {
            console.log("写入完成。");
          });

        });

        readerStream.on('error', function(err){
          console.log(err.stack);
        });
      }else {
        console.log('新路径',filePath);
        test(filePath)
      }
    })
  });
}
test(str)
