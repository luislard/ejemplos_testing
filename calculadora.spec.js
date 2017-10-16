const chai = require('chai');
const expect = chai.expect;
const Calculadora = require('./calculadora');

describe('calculadora', function(){ // no hacer arrow functions

    let calculadora;

    beforeEach(function() {
        calculadora = new Calculadora();
    });

    it('sum() should return 0 if no arguments are passed in', function(){
        expect(calculadora.sum()).to.equal(0);
    });

    it('sum() should return the sum of 10 and 15', function(){
        expect(calculadora.sum(10,15)).to.equal(25);

    });

    it('sumAfter() should execute callback function with the result', function(done){
        calculadora.sumAfter(10,15,10,(res)=>{
            expect(res).to.be.not.undefined;
            done();
        });

    });

    it('sumAfter() should return sum of 20 and 30', function(done){
        calculadora.sumAfter(20,30,10,(res)=>{
            expect(res).to.equal(50);
            done();
        });

    });
}); 

