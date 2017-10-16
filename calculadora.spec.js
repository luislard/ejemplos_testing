const chai = require('chai');
const expect = chai.expect;
const Calculadora = require('./calculadora');

describe('calculadora', function(){ // no hacer arrow functions
    it('sum() should return 0 if no arguments are passed in', function(){
        const calculadora = new Calculadora();
        expect(calculadora.sum()).to.equal(0);
    });

    it('sum() should return the sum of 10 and 15', function(){
        const calculadora = new Calculadora();
        expect(calculadora.sum(10,15)).to.equal(25);

    });
}); 

