
function Calculadora() {}


Calculadora.prototype.operators = ['+','-'];

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
    for (let [index,item] of expression.split(' ').entries()) {
        if(this.operators.includes(item)){
            // si es una posicion par lanzo excepcion
            if(index % 2 === 0){
                throw new TypeError(`Unexpected item ${item} found`);
            }
            else {
                result.push(item);

            }
        }
        else {
            const number = Number(item);
            if (isNaN(number)){
                throw new TypeError(`Unexpected item ${item} found`);
            }else{
                result.push(number);
            }
        }
    }
    return result;
}

module.exports = Calculadora; 