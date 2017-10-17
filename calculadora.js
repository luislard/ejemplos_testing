
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
                if(index % 2 !== 0){
                    throw new TypeError(`Unexpected item ${item} found`);
                }
                else{
                    result.push(number);
                }
            }
        }
    }
    return result;
}

Calculadora.prototype.eval = function(expression) {
    let operator = null;
    let result = null;
    for(const item of this.parse(expression)){

        // si es un operador, lo guardamos y pasamos el siguiente
        if (this.operators.includes(item)){
            operator = item;
            continue;
        }
        // es un numero, si es el primero lo guardo en el resultado
        if (result === null){
            result = item;
            continue;
        }
        // si no es el primero hago la operacion guardada
        switch (operator) {
            case '+': result += item; break;
            case '-': result -= item; break;
           default: 
            throw new TypeError(`Unexpected operator ${operator} found`);
            break;
        }
        operator = null;
    }
    return result;
};

module.exports = Calculadora; 