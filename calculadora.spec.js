const chai = require('chai');
const expect = chai.expect;
const Calculadora = require('./calculadora');
const sinon = require('sinon');
const rewire = require('rewire');

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

    it('sumAfter() should return sum of 10 and 15', function(done){
        // hacer un mock de calculadora.sum para hacer el test independiente de este
        sinon.stub(calculadora, 'sum').returns(25);
        calculadora.sumAfter(10,15,10,(res)=>{
            expect(res).to.equal(25);
            calculadora.sum.restore(); // limpiamos el stub
            done();
        });
    });

    it('sumAfter() should return sum of 10 and 15 ttt', function(done){
        // hacer un mock de calculadora.sum para hacer el test independiente de este
        sinon.stub(calculadora, 'sum').returns(25);
        calculadora.sumAfter(10,15,10,(res)=>{
            expect(calculadora.sum.firstCall.args).to.deep.equal([10,15]);
            calculadora.sum.restore(); // limpiamos el stub
            done();
        });

    });

    it('sum() should have commutative property', function(){
        const result1 = calculadora.sum(1,2);
        const result2 = calculadora.sum(2,1);
        expect(result1).to.equal(result2);
    });

    it('subtract() should return subtract', function(){
        expect(calculadora.subtract(20,5)).to.equal(15);
    });

    it('subtract() should not have commutative property', function(){
        const result1 = calculadora.subtract(20,5);
        const result2 = calculadora.subtract(5,20);
        expect(result1).to.not.equal(result2);
    });

    it('object should be deep equal to other object', function(){
        expect({ok: true}).to.deep.equal({ok: true});
    });

    it('parse() should decompose expression and return array', function(){
        expect(calculadora.parse('4 + 6')).to.deep.equal([4,'+',6]);
    });

    it('parse() should decompose expression and return other array', function(){
        expect(calculadora.parse('5 + 8')).to.deep.equal([5,'+',8]);
    });

    it('parse() should decompose expression 1 + 2 + 3', function(){
        expect(calculadora.parse('1 + 2 + 3')).to.deep.equal([1,'+',2,'+',3]);
    });

    it('parse() should decompose expression 1 - 6', function(){
        expect(calculadora.parse('1 - 6')).to.deep.equal([1,'-',6]);
    });

    it('parse() should throw exception with the operators (1 - + 6)', function(){
        expect(() => calculadora.parse('1 - + 6')).to.throw();
    });
    // otra forma de hacer lo anterior
    it('parse() (otra forma) should throw exception with the operators (1 - + 6)', function(){
        const throwingFunction = calculadora.parse.bind(calculadora,'1 - + 6');
        expect(throwingFunction).to.throw('Unexpected item + found');
    });

    it('parse() should throw exception with the operators (1 + A)', function(){
        expect(() => calculadora.parse('1 + A')).to.throw('Unexpected item A found');
    });

    it('parse() should throw exception with the operators (1 + 2 6)', function(){
        expect(() => calculadora.parse('1 + 2 6')).to.throw('Unexpected item 6 found');
    });

    it('parse() should write result to log', function(){
        sinon.spy(calculadora, 'log');
        calculadora.parse('1 + 2');
        expect(calculadora.log.callCount).to.equal(1);
        calculadora.log.restore();
    });


    describe('eval()', function(){
        it('should compute (6 + 7)', function(){
            sinon.stub(calculadora, 'parse').callsFake(()=>{
                return [6,'+',7]
            });
            expect(calculadora.eval('6 + 7')).to.equal(13);
            calculadora.parse.restore();
        });

        it('should compute (3 + 4 + 3)', function(){
            sinon.stub(calculadora, 'parse').returns([3,'+',4,'+',3]);
            expect(calculadora.eval('3 + 4 + 3')).to.equal(10);
            calculadora.parse.restore();
        });

        it('should compute (3 + 4 - 3)', function(){
            sinon.stub(calculadora, 'parse').returns([3,'+',4,'-',3]);
            expect(calculadora.eval('3 + 4 - 3')).to.equal(4);
            calculadora.parse.restore();
        });

        it('should compute (3 - 4 - 3)', function(){
            sinon.stub(calculadora, 'parse').returns([3,'-',4,'-',3]);
            expect(calculadora.eval('3 - 4 - 3')).to.equal(-4);
            calculadora.parse.restore();
        });

        it('should compute (3 + 4 * 3)', function(){
            sinon.stub(calculadora, 'parse').returns([3,'+',4,'*',3]);
            expect(calculadora.eval('3 + 4 * 3')).to.equal(21);
            calculadora.parse.restore();
        });

        // it.only hace que solo se evalue un test
        // xit hace qu eel test no se compruebe
    });

    it('sumaPromise() should return a promise', function(){
        expect(calculadora.sumaPromise(1,5)).to.be.a('promise');
    });

    it('sumaPromise() should resolve to sum of 4 + 5', function(done){
        calculadora.sumaPromise(4,5).then(res => {
            expect(res).to.equal(9);
            done();
        });
    });

    it('sumaPromise() should can be used with async/await', async function(){
        const resultado = await calculadora.sumaPromise(4,5);
        expect(resultado).to.equal(9);
    });

    it('fileHeader() should read the first line of file', function(done){
        const Calculadora = rewire('./calculadora.js');
        Calculadora.__set__('fs', {
            readFile(file,cb){
                cb(null, 'primera linea\nSegunda linea');
            }
        });
        const calculadora = new Calculadora();


        calculadora.fileHeader('zzz.xy', function(err, result){
            expect(result).to.equal('primera linea');
            done();
        });
    });
}); 

