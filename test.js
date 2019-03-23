const FixedGen = require('./index.js');
const FS = require('fs');
const Papa = require('papaparse');

const IN_FOLDER = "./input/";
const OUT_FOLDER = "./output/";

//schema provided for testing (options = empty for 'testrealdata.js')
let {options,myData} = require('./testrealdata.js');

//put this inside lambda handler:

let g_curFile = ''; //keep track of the current file being processed
let flatData = 'empty-testing';


const parse = function(csv) {
    console.log("parsing CSV...");
    return Papa.parse(csv,{
        quotes: true,
        delimiter: ",",
        skipEmptyLines: true
    }).data;
};


function processCSVfile(file) {
    console.log("processing CSV file", file);
    csv = FS.readFileSync(IN_FOLDER + file).toString();
    dataArr = parse(csv);

    //tested:ok
    //console.log('Data Result:');
    //console.log(dataArr);

    flatData = FixedGen.buildFLR(options,dataArr);

    FS.writeFile(
        OUT_FOLDER + g_curFile.replace(".csv", ".are"),
        flatData,
        (err, data) => {
            if (err) handleError(err);
            //  if (!prod) console.log("ARE file successfully written:" + data);
        }
    );
    console.log('check output folder for .are file');
}


// int Main() program:
FS.readdir(IN_FOLDER, (err, files) => {
    files.forEach(file => {
        let ext = file.split(".").pop();
        console.log("looping over file: ", file, "with extension:", ext);
        g_curFile = file;
        if (ext == "csv") processCSVfile(file);
    });
});


