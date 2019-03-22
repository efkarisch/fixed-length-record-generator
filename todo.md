## Build steps
 * Format Data - take fieldOptions, and an array containing array(s) of values to output data in a desired format
 *  - default options data is filler, does not override specified non-default schema options
 *  //if header row is provided in data, make sure each schema object has
 * Return resultant data as a string, with values built like this: <prepading><(paddingLeft)value(paddingRight)><postpading>
 * Catch, if not enough fields or columns in data (data must have same # of fields as schema defines)
 **/

## Checks: 
//@todo Make sure these items are accounted for in build function
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
 * 5. Update library to contain/register hooks: https://docs.feathersjs.com/api/hooks.html
 * 6. #5 will allow for things like a validation schema property containing a regex or some other test method
 * 6B. Detect if passed in function, if not assume regex, if regex fails (add test) then throw an error giving a message with the two available types of validation methodologies.
 **/


# DOCUMENTATION
 * Example of use in privateObj.runTest() function below (first function in Functions section)
 * Available option properties, ()=default values
 * @object {defaults: {schema} + {valueOverride: boolean(false), schemaOverride: boolean(false)} }
 * @array { schema: *[{ name: string, width: int(1), defaultValue: string, padchar: string, justify: string(left), prepad: int, postpad: int}, 'valueAtIndex: int(auto-populated)] }
 **/

/*--------------------------------------------------------------------------------------------------------------------*/