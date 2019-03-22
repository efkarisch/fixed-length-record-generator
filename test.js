const FLRLib = require('./index.js');
const {options,myData} = require('./testdata.js');
const FLRresult = FLRLib.buildFLR(options,myData);


console.log('final result');
console.log(FLRresult);