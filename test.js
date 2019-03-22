const FLRLib = require('./index.js');

let options = {

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
                justify: 'right',
                defaultValue: '',
                padchar: '=',
                prepad: 0,
            },
            {
                name: 'Last',
                width: 20,
                padchar: '-',
                defaultValue: 'Doe',
            },
            {
                name: 'Email',
                width: 75,
                justify: 'left',
                defaultValue: '',
                padchar: '*',
                postpad: 0,
            }
        ]
};

//Out of order header row data still works, because of value mapping
//But order of header row must match intended order of data to pull in accurate to final result

let myData = [

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


const FLRresult = FLRLib.buildFLR(options,myData);


console.log('final result \n');
console.log(FLRresult);
