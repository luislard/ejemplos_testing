
function Calculadora() {}

Calculadora.prototype.sum = function(a = 0, b = 0){
    return a + b;
}

Calculadora.prototype.sumAfter = function(a = 0, b = 0, ms, callback){
    setTimeout(() => {
        callback( a + b );
    }, ms);
}

module.exports = Calculadora; 