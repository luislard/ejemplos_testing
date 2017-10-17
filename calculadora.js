
function Calculadora() {}

Calculadora.prototype.sum = function(a = 0, b = 0){
    return a + b;
}

Calculadora.prototype.subtract = function(a = 0, b = 0){
    return a - b;
}

Calculadora.prototype.sumAfter = function(a = 0, b = 0, ms, callback){
    setTimeout(() => {
        const result = this.sum(a, b);
        callback( result );
    }, ms);
}

Calculadora.prototype.parse = function(expression){
    const result = [];
    for (let item of expression.split(' ')) {
        if(item === '+' || item === '-'){
            result.push(item);
        }
        else {
            result.push(Number(item));
        }
    }
    return result;
}

module.exports = Calculadora; 