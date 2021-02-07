'use strict';

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
        let ans='';
        for(let i in nums){ // worst case complexity is O(n) where n is the number of values in the array nums, which is 13 in the context
        
            let value=nums[i];
            let symbol=sym[i];
            
            if(ans=='' && number==value){ // breaks the loop if the given number is an exact value in the array to prevent unnecessary iterations
                return symbol;
            } else if(number>=value){ // checks to find the first value less than the given number this will prevent unnecessary processing 
              let symbolcount = parseInt(number/value);
              ans=ans+symbol.repeat(symbolcount); // repeat will append the same symbol based on the value of the parameter
              number=number%value;  
            }
        }
        return ans;
    } catch(e){
        log.error('Unable to process a Roman Numeral for the input ' + e);
        throw new Error('Unable to process a Roman Numeral for the input');
    }
    
}

module.exports= convert;