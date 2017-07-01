console.log("file path with Name"+__filename);
console.log("Location"+__dirname);
console.log("current working Directory"+process.cwd());
process.chdir('/');
console.log("current working Directory"+process.cwd());
console.log('------------------------------');
var path=require("path");
var dir=["one","Two","Three","Four"];
var dire=dir.join(path.sep);
console.log(dire);
console.log('------------------------------');
console.log('file Extension'+path.extname(__filename));
console.log("file Name"+path.basename(__filename));

