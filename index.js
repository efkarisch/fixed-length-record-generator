const prod = false; // IMPORTANT! - change to true(boolean) before pushing to repo

/*----------------------------------------------Move this to Readme.md------------------------------------------------*/

/**
 * Build steps
 * Format Data - take fieldOptions, and an array containing array(s) of values to output data in a desired format
 *  - default options data is filler, does not override specified non-default schema options
 *  //if header row is provided in data, make sure each schema object has
 * Return resultant data as a string, with values built like this: <prepading><(paddingLeft)value(paddingRight)><postpading>
 * Catch, if not enough fields or columns in data (data must have same # of fields as schema defines)
 **/

/**
 * Checks: //@todo Make sure these items are accounted for in build function
 * Make sure schema fields match cols for data - [x]
 * If header row is provided in data, make sure each field in schema has appropriate value index as valueMap value - [],  == indexOf(colheader) result
 * If header row is not provided, assume schemaMap is in incrementing order from 0, and valueMap has same indexes - []
 * Build data values based on valueMap, check defaults and data transformations from schemaMap
 */

/**
 * Future items @todo
 * 1. Make sure that the object structure that was passed in is correct, make sure necessities are provided (*)
 * 2. build some good error handling
 * 3. build a checkSchema function, to output any issues
 * 4. build a readFRL function
 **/


/** DOCUMENTATION
 * Example of use in privateObj.runTest() function below (first function in Functions section)
 * Available option properties, ()=default values
 * @object {defaults: {schema} + {valueOverride: boolean(false), schemaOverride: boolean(false)} }
 * @array { schema: *[{ name: string, width: int(1), defaultValue: string, padchar: string, justify: string(left), prepad: int, postpad: int}, 'valueAtIndex: int(auto-populated)] }
 **/

/*--------------------------------------------------------------------------------------------------------------------*/


//@todo this path will be replaced with npm module when I'm done creating it.
const StringBuilder = require('../NodeStringBuilder/src/index.js'); //change to npm module called stringbuilder  - @todo [Ed]
let publicObj = {};
let privateObj = {};
privateObj.fields = []; //@todo need to build this dynamically in the initOptions() - [x]
privateObj.fieldCT = 0;
privateObj.schemaMap = {};
privateObj.headerMap = {};

privateObj.DEFAULT_OPTIONS = { //These are the minimum defaults for the program in case default properties are not passed in
    padchar:' ', //must have some kind of field delineation to count
    justify:'left', //must have some kind of position in row
    valueOverride: false, //if false, passed in values from data will be used in final result; if true, values from defaultValue property of schema (if not empty) will be used in final result instead of data values (replaced with schema)
    schemaOverride: false, // only change schema property values with defaults if set to true
};// DEFAULT_OPTIONS



/*****************************************************
 *  Prototype Methods Used In Business Logic
 *****************************************************/

//Find and return unique values against comparator (b)
Array.prototype.unique = function(b){
    let z = this;
    let y = b;

    let aLen = this.length,
        len  = b.length;

    if(aLen < len){

        len = aLen;

        return gather(this,b);

    }else{

        return gather(b,this);
    }

    function gather(needleArr,haystackArr, reduce){

        let uniqueArr = [];

        while(len){

            //may not want to reduce original arrays
            let curVal = reduce ? needleArr.pop() :  needleArr[len - 1];

            if(haystackArr.indexOf(curVal) > -1 && uniqueArr.indexOf(curVal) < 0)
                uniqueArr.push(curVal);
            len -= 1;

        }//loop

        return uniqueArr;

    }//gather()

};//Array.prototype.unique()

//Pad and return a string in specified justification position
String.prototype.justify = function(char, times, pos){

    switch(pos[0].toLowerCase()) {
        case 'l':
            return this.padEnd(times,char);
            break;
        case 'r':
            return this.padStart(times,char);
            break;
        default:
            throw 'Unable to interpret value: ' + pos + 'for String.justify prototype. Please specify a position of "left" or "right"';
            break;
    }
};


/********************
 * Functions:
 ********************/

privateObj.runTest = function() {

    //THIS EXAMPLE SHOWS HOW YOU SETUP THE OPTIONS

    options = {

        defaults:
            {
                padchar: ' ',
                justify: 'left',
                valueOverride: true,

            },
        schema:
            [
                {
                    name: 'First',
                    width: 20,
                    defaultValue: '',
                    prepad: 0,
                },
                {
                    name: 'Last',
                    width: 20,
                    defaultValue: 'Doe',
                },
                {
                    name: 'Email',
                    width: 15,
                    justify: 'right',
                    defaultValue: '',
                    padchar: '*',
                    postpad: 0,
                }
            ]
    };

    dataArrOfArrays = [

        [
          "Last",
          "First",
          "Email"
        ],
        [
            "Munson",
            "John",
            "JaysMunchin@gitmail.com"
        ],
        [
            "Karisch",
            "Ed",
            "SpecialEd@gitmail.com"
        ],
        [
            "Stevens",
            "Josh",
            "JoshCapone@gitmail.com"
        ]

    ];

    let flrData  = publicObj.buildFLR(options, dataArrOfArrays);

    console.log(flrData);

};//runTest()



privateObj.initOptions = function(opts){

    //if options paramter does not exist, throw error
    if(!opts) privateObj.handleError('options object must be passed in as first parameter');
    //if schema does not exist in options, throw error
    if(!opts.hasOwnProperty('schema')) privateObj.handleError('options.schema property <arrayOfArrays> undefined, please pass in required parameter {schema:[{...},{...},{...}]} object');

    //loop through program defaults for all values if exists
    if(opts.hasOwnProperty('defaults'))

        for (var property in privateObj.DEFAULT_OPTIONS) {
            if(property == 'valueAtIndex') continue; //don't allow user to set this property
            //if passed in defaults and value exists in passed in object, skip & keep, else add program defaults
            if (!opts.defaults.hasOwnProperty(property)) {
                opts.defaults[property] = privateObj.DEFAULT_OPTIONS[property];
            }

        }//property loop

    //number of fields = number of fields in schema
    privateObj.fieldCT = opts.schema.length;

        //schema loop
    for(let i = 0; i < privateObj.fieldCT; i++) {

        //defaults loop
        for( property in opts.defaults){ //property = property from defaults

            if(property == 'valueOverride' || property == 'schemaOverride' || property == 'valueAtIndex') continue; //These values should not be set at individual field schema level

            //if schemaOverride is true, always set schema property to default property value
            if(opts.defaults.schemaOverride){

                opts.schema[i][property] = opts.defaults[property]

                //if schemaOverride is false, and schema does not have property, set property to default
            }else if(!opts.schema[i].hasOwnProperty(property)){

                opts.schema[i][property] = opts.defaults[property]

            }else{
                let val = opts.schema[i][property];
                opts.schema[i][property] = val ? val : opts.defaults[property];
            }

        }//End defaults loop

        let fieldName = opts.schema[i]['name'];
        privateObj.fields.push(fieldName);
        privateObj.schemaMap[fieldName] = i; //used if header row is provided, else unused
        opts.schema[i].valueAtIndex = i;

    }//End first schema loop

    if(!prod)console.log('Value mappings related to defined fields in schema:\n', privateObj.schemaMap);

        //Now begin section to populate schema with correct value index
        let headers     = dataArrOfArrays[0];
        let rowLength   = headers.length; //could be data row and not header


        if(rowLength !== privateObj.fieldCT) privateObj.handleError('Data mismatch! Invalid schema contains ' + fieldCT + ' fields. Please add missing fields to schema.');

        if(!prod)console.log('[headers] [schemafields]',headers,privateObj.fields);

        let fields = privateObj.fields;

        headers = headers.unique(fields);

        //if(!prod)console.log('fields & privateObj.fields:',fields,privateObj.fields);

        rowLength = headers.length; //re-evaluate

        //if(!prod)console.log('headers',headers,'first row check results h=vCT?', privateObj.fieldCT,rowLength);

        if(rowLength && rowLength !== privateObj.fieldCT) privateObj.handleError('Data mismatch! Invalid schema check to make sure schema name properties for fields matches with data headers (first row of data). Please make sure necessary values are exactly the same');


        if(rowLength){ //map values in schema, headers were passed in and verified (otherwise default valueAtIndex property was already set to match schema index

            headers = dataArrOfArrays.shift(); //remove headers from data (no longer needed)

            /**
             UNSURE IF THIS IS NEEDED \\@todo DELETE THIS?
            for(let j = 0; j < privateObj.fieldCT; j++){

                console.log('header:', headers[j]);

                console.log('valueAtIndex:', opts.schema[j].valueAtIndex);

                console.log('field from fields private arr', privateObj.fields[j]);



                //opts.schema[j].valueAtIndex =  headers.indexOf(privateObj.fields[j]);
            }
             **/

        }

    //if(!prod) console.log('initialized options',opts);

    return opts;

};//initOptions()


//@todo In AWS Lambda, or other cases, you may not want to throw errors, if so, determine what to do here:
privateObj.handleError = function(msg){
    throw msg;
};//handleError()

/**
 * buildFLR - returns <string> containing FLR data
 * @param options, object that contains two properties:
 *  - defaults: object, schema: Array of Objects
 * @param dataArrOfArrays: Array of Arrays
 **/
publicObj.buildFLR = function(options, dataArrOfArrays){

    //if defaults not specified, add program's DEFAULT_OPTIONS
    options = privateObj.initOptions(options/**, dataArrOfArrays **/);

    //@todo check if value override is set in data loop and perform accordingly - []

    let len = dataArrOfArrays.length;

    if(!prod)console.log('Processing ' + len + ' rows of data' );

    let sb = new StringBuilder();

    for(let i = 0; i < len; i++) { //loop through row of data

        privateObj.currentRow = (i+1);

        let row = dataArrOfArrays.pop();

            for(var j = 0; j <  privateObj.fieldCT; j++){ //loop through schema to determine transformations

                //for schema reference:
            //* @array { schema: *[{ name: string, width: int(1), defaultValue: string, padchar: string, justify: string(left), prepad: int, postpad: int}, 'valueAtIndex: int(auto-populated)] }
                //
                let justPos  = options.schema[j].justify, //only need to match first char L or R.
                    width    = options.schema[j].width,
                    defVal   = options.schema[j].defaultValue,
                    prePad   = options.schema[j].prepad,
                    postPad  = options.schema[j].postpad,
                    dataVal  = row[options.schema[j].valueAtIndex],
                    padChar  = options.schema[j].padchar,
                    override = options.defaults.valueOverride;

                //if(!prod)console.log('justPos,width,defVal,prePad,postPad,dataVal,padChar,override:',justPos,width,defVal,prePad,postPad,dataVal,"'"+padChar+"'",override );

                if(override) dataVal = defVal ? defVal : dataVal; //pre-build operation
                dataVal = dataVal.substr(0,width);

                if(prePad) sb.append(padChar.padStart(prePad, padChar));//first build operation: ALWAYS

                sb.append(String(dataVal).justify(padChar,width,justPos)); //build field data

                if(postPad) sb.append(padChar.padEnd(postPad,padChar));//last build operation: ALWAYS

            }// End looping through schema

            //create new line for new record/row

            if(!prod)console.log('done with row: ' + privateObj.currentRow);
            if(privateObj.currentRow !== privateObj.fieldCT ) sb.append( String('\n') );

    }//end looping through rows of data

    return sb.toString('',true);
};//buildFLR()


if(!prod)module.exports = privateObj;
else
module.exports = publicObj;