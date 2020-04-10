
const qr_image = require("qr-image");
var Jimp = require('jimp');
var fs = require('fs');

/*const temp_qrcode = qr_image.image('沈长海', {size: 10, type: 'png'});
temp_qrcode.pipe(fs.createWriteStream('i_love_qr.png'));*/
/*Jimp.read('i_love_qr.png')
.then(image => {
  console.log(image);
  console.log(image.bitmap);
  /!*return lenna
  .resize(256, 256) // resize
  .quality(60) // set JPEG quality
  .greyscale() // set greyscale
  .write('lena-small-bw.jpg'); // save*!/
})
.catch(err => {
  console.error(err);
});*/

let p = Promise.all([Jimp.read('i_love_qr.png'), Jimp.read('test.jpeg')]);

p.then(function (data) {
  let img1 = data[1];
  let img0 = data[0];
  img0.resize(100, 100);
  let source = img0.bitmap.data;
  let source1 = img1.bitmap.data;
  img1.resize(16, 16);
  let width = img1.bitmap.width;
  let height = img1.bitmap.height;

   new Jimp(100, 100, function (err, saveimage) {
    let buffer = source;
     /*source1.forEach((item,index) => {
       buffer[index] = item;
     })*/
    /*for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        let offset = ( width * x) +y* 4 // RGBA = 4 bytes
        buffer[offset] = source1[offset]   // R
        buffer[offset + 1] = source1[offset+1]    // G
        buffer[offset + 2] = source1[offset+2]    // B
        buffer[offset + 3] = source1[offset+3]  // Alpha
      }
    }*/
    console.log('saveimage',saveimage.composite)
    saveimage.bitmap.data=buffer;
     saveimage.composite(img1, 0, 0, {
       mode: Jimp.BLEND_SOURCE_OVER,
       opacitySource: 0.5,
       opacityDest: 0.1
     });
    setTimeout(() => {
      saveimage.write('image.jpeg')
    },1000)
  });
},function (err) {
  console.log(err);
})

