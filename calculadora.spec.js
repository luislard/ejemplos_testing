const chai = require('chai');
const expect = chai.expect;
const calculadora = require('./calculadora');

describe('calculadora', function(){ // no hacer arrow functions
    it('sum() should return 0 if no arguments are passed in', function(){
        expect(calculadora.suma()).to.equal(0);
    });
}); 

