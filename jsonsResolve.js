var fs = require("fs");
// 引入 events 模块
let events = require("events");
// 实例化事件对象
let EventEmitter = new events.EventEmitter();
let initInt = 0;
let arr = [
  {
    name:'./lang_zh.json',
    data:''
  },
  {
    name:'./needDelete.json',
    data:''
  },
]
function f(item) {
  var readerStream = fs.createReadStream(item.name);//'./lang_zh.json'
  readerStream.setEncoding('UTF8');
  readerStream.on('data', function(chunk) {
    item.data += chunk;
  });
  readerStream.on('end',function(){
    // 将 data 广播出去
    initInt++;
    EventEmitter.emit('data');
  });

  readerStream.on('error', function(err){
    console.log(err.stack);
  });
}
arr.forEach((item) => {
  f(item)
})

// 监听 data
EventEmitter.on('data', () => {
  if(initInt === 2){
    let obj = JSON.parse(arr[0].data)
    Object.keys(JSON.parse(arr[1].data)).forEach((key) => {
      delete obj[key]
    });
    var writerStream = fs.createWriteStream('./lang_zh.json');
    writerStream.write(JSON.stringify(obj),'UTF8');
    writerStream.end();
    writerStream.on('finish', function() {
      console.log("写入完成。");
    });
  }
});