console.log(String.prototype.repeat)
console.log(!String.prototype.repeat)

if (!String.prototype.repeat) {
  console.log('we need to polyfill String.prototype.repeat')
}
