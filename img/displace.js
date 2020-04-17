var Jimp = require('jimp');
let p = Promise.all([Jimp.read('test.jpeg'), Jimp.read('stest.png')]);
p.then(function (data) {
  let img1 = data[1];
  let img0 = data[0];
  let source = img0.bitmap.data;
  let source1 = img1.bitmap.data;
  img0.displace(img1, 100);
  img0.write('test1.jpeg');
},function () {

});

