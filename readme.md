# About FixedGen
This library is designed to take an array of arrays containing data, 1 element for each column, and transform that input
into the fixed-length record format also known as a fixed-width record.

- This library is designed to be used in conjunction with some kind of file input parser like papaparse.
- There is another library to do this by the name Fixy, which does not account for many of the configurable items you can
utilize with this library. 

# Usage
```
const FG = require('fixedgen');

//sample schema:

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
                defaultValue: 'Doe', // All last names changed to 'Doe' - Hard coded value
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

let dataArr = [

    [
        "Last",
        "First",
        "Email",
    ],
    [
        "M",
        "John",
        "JaysMunchin@gitmail.com"
    ],
    [
        "K",
        "Ed",
        "SpecialEd@gitmail.com"
    ],
    [
        "S",
        "Josh",
        "JoshCapone@gitmail.com"
    ]

];

let flrData = FG.buildFLR(options,dataArr);

console.log(flrData);

```

##Documentation


--- More to come ---