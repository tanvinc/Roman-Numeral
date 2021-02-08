/* eslint-disable no-undef */
'use strict';

const app=require('../convert');
const chai=require('chai');

// eslint-disable-next-line no-unused-vars
const should=chai.should();

// eslint-disable-next-line no-undef
describe('testing the function for generating roman numerals', () =>{

    let ans;

    it('should return a valid roman numeral', async () => { // test for a valid input
        ans=await app(357);
        ans.should.equal('CCCLVII');
    });

    it('should return an incorrect roman numeral', async () => { // test for a valid integer but out of bounds. Ideally this should return an accurate representation, but the service can render roman numerals only till 3999, so this test fetches an invalid answer
        ans=await app(9000);
        ans.should.equal('MMMMMMMMM'); // this returns the additive representation of Roman Numeral, which is different from the standard representation based on which the convert module was designed
    });

    it('should return an empty string for a negative number', async () => { // the code should not process negative integers, since there are no negative roman numerals
        ans=await app(-8000);
        ans.should.equal('');
    });

    it('should return an empty string for zero', async () => { // the code should not process zero, since there are no reprsentation for zero in roman numerals
        ans=await app(0);
        ans.should.equal('');
    });

    it('should return an error for MAX_VALUE', async () => { // this test is to check an infinite/ invalid input; basically a failure/error scenario
        const x = Number.MAX_VALUE;
        let err=new Error('Unable to process a Roman Numeral for the input');
        try{
            ans=await app(x);
        } catch(e){
            e.should.equal(err);
        }  
    });

    it('should return an error for MIN_VALUE', async () => { // this test is to check an infinite/ invalid input; basically a failure/error scenario
        const y = Number.MIN_VALUE;
        let err=new Error('Unable to process a Roman Numeral for the input');
        try{
            ans=await app(y);
        } catch(e){
            e.should.equal(err);
        }  
    }); 
});