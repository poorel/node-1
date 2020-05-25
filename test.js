/*let a = [{a:1},{a:3},{a:2}].sort(function(a,b){return b.a-a.a});
console.log(a); //[ { a: 3 }, { a: 2 }, { a: 1 } ]*/
let fn = () => {
  this.a = 'a';
  this.b = {
    a: 'a+',
    b: function () {
      return this.a;
    }
  }
}
console.log(new fn().b.b());
