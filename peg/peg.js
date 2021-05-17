/*
const {parse} = require('./arithmetics');

let result = parse('2 * (3 + 4)');
console.log(result);*/
const {parse} = require('./matchFunc.js');

let code = `function test() {
    let a = 1;
    if (a == 1) {
        a = 2;
    }
    a = 5;
}`

let result = parse(code);
console.log(result)
