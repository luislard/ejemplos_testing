const chai = require('chai');
const expect = chai.expect;
const Calculadora = require('./calculadora');

describe('calculadora', function(){ // no hacer arrow functions
    it('sum() should return 0 if no arguments are passed in', function(){
        const calculadora = new Calculadora();
        expect(calculadora.sum()).to.equal(0);
    });
}); 

