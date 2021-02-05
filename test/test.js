/* eslint-disable no-undef */
'use strict';

const app=require('../src/convert');
const chai=require('chai');

// eslint-disable-next-line no-unused-vars
const should=chai.should();

// eslint-disable-next-line no-undef
describe('testing function', () =>{
    let ans;
    it('should return a valid roman numeral', async () => {
        ans=await app(357);
        ans.should.equal('CCCLVII');
    });

    it('should return an invalid roman numeral', async () => {
        ans=await app(9000);
        ans.should.equal('MMMMMMMMM');
    });

    it('should return an empty string', async () => {
        ans=await app(-8000);
        ans.should.equal('');
    });

    it('should return an error', async () => {
        const x = Number.MAX_VALUE;
        let err=new Error('Unable to process a Roman Numeral for the input');
        try{
            ans=await app(x);
        } catch(e){
            e.should.equal(err);
        }  
    });

    it('should return an error', async () => {
        const y = Number.MIN_VALUE;
        let err=new Error('Unable to process a Roman Numeral for the input');
        try{
            ans=await app(y);
        } catch(e){
            e.should.equal(err);
        }  
    });

    
});