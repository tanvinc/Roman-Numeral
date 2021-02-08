'use strict';
/**
 * 
 * Following the Standard representation on Roman numerals in the reference wiki document from the README.md file,
 * 1000 --> M
 * 100 --> C 
 * but 900 would be 1000 - 100 = CM
 * 
 * Simailarly, 500 --> D but 400 = 500 - 100 = CD
 * The arrays nums and sym record every such derivation of roman numerals obtained by subtraction and the original unique roman numerals for values like 100, 500, 1000 respectively.
 * The arrays are ordered in descending order on purpose to facilitate division by the greatest divisor of all first.
 * This will help in deducing the roman representation accurately, faster.
 */
const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
const sym = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
const log = require('./logger');

/**
 * 
 * Returns a Roman numeral for the given input integer
 * @param {number} number
 * @returns {String} 
 */
async function convert (number){

    try{
        let ans=''; // initializing output string
        for(let i in nums){ // worst case complexity is O(n) where n is the number of values in the array nums, which is 13 in the context
        
            let value=nums[i]; // we could just use nums[i] & sym[i] in the code below, this is for better readability
            let symbol=sym[i];
            
            if(ans=='' && number==value){ // breaks the loop if the given number is an exact value in the array to prevent unnecessary iterations
                return symbol;
            } else if(number>=value){ // checks to find the first value less than the given number this will prevent unnecessary processing
              let symbolcount = parseInt(number/value); // the quotient here will provide the number of times a symbol should be repeated; eg. for 3000 (3000/1000 = 3 so it the ans is MMM)
              ans=ans+symbol.repeat(symbolcount); // repeat will append the same symbol based on the value of the parameter
              number=number%value;  // since quotient has already provided preceding of symbols, we now need to divide the remainder by its greatest divisor
            }
        }
        return ans;
    } catch(e){ // block to catch unexpected errors while processing
        log.error('Unable to process a Roman Numeral for the input ' + e); 
        throw new Error('Unable to process a Roman Numeral for the input');
    }
    
}

module.exports= convert;