const size = 5;
String.prototype.normalizeFct = function(){ return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "") }
function matrizGenerator(key) {
    const alphabet = 'abcdefghiklmnopqrstuvwxyz'.toUpperCase();
    const preMatriz = new Set();
    const matriz = [];
    matriz.length = size;
    [...key.toUpperCase().normalizeFct(), ...alphabet].forEach(e => preMatriz.add(e));

    const arr = Array.from(preMatriz);
    for (let i = 0; i < matriz.length; i++) {
        matriz[i] = arr.slice(i * size, (i+1)*5);
    }
    return matriz;
}

const clean = text => text.replace(/\s/ig, '').toUpperCase().normalizeFct();

function getPair(pair, matriz, decrypt = -1){
    let v1 = -1;
    let v2 = -1;
    let row0 = -1;
    let row1 = -1;
    pair[1] = pair[0] === pair[1] ? 'X' : pair[1];
    
    const change = e => e === 'j' ? 'i' : e;

    const values = [change(pair[0]), change(pair[1])];
    
    matriz.forEach((el, index) => {
        const index0 = el.indexOf(values[0]);        
        const index1 = el.indexOf(values[1]);
        if(index0 > -1){
            v1 = index0;
            row0 = index;
        }

        if(index1 > -1){
            v2 = index1;
            row1 = index;
        }
    });

    if(decrypt < 0){
        if(row0 === row1){
            v1 = v1 > 0 ? v1 - 1 : 4;
            v2 = v2 > 0 ? v2 - 1 : 4;
        }
    
        if(v1 === v2){
            row0 =  row0 > 0 ? row0 - 1 : 4;
            row1 =  row1 > 0 ? row1 - 1 : 4;
        }
    } else {
        if(row0 === row1){
            v1 = v1 !== 4 ? v1 + 1 : 0;
            v2 = v2 !== 4 ? v2 + 1 : 0;
        }
    
        if(v1 === v2){
            row0 =  row0 !== 4 ? row0 + 1 : 0;
            row1 =  row1 !== 4 ? row1 + 1 : 0;
        }
    }
    try{
        return matriz[row0][v2] + matriz[row1][v1];
    }catch(e){
        console.log(matriz);
        console.log(row0, v2, row1, v1);
        return 'XX';
    }    
}

const cypher = (matriz) => (text) => { 
    const realText = clean(text);
    const data = [];
    let index = 0;
    while(index < realText.length/2){
        data.push([...realText].slice(index * 2, (index + 1) * 2))
        index++;
    }

    if(data[data.length - 1].length < 2){
        data[data.length - 1].push('X');
    }
    
    return { 
        encrypt: () => data.map(e => getPair(e, matriz, 1)).reduce((p, c) => p + c),
        decrypt: () => data.map(e => getPair(e, matriz)).reduce((p, c) => p + c)
    };
};

const exec = (key) => cypher(matrizGenerator(key));
const executor = exec('teste')('a pá do fogão que caiu atrás da guerra').encrypt();
const done = exec('teste')(executor).decrypt();
console.log(executor, done)

module.exports = {
    exec, 
    encrypt: (key, text) => exec(key)(text).encrypt(),
    decrypt: (key, text) => exec(key)(text).decrypt(),
}