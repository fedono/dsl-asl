const esprima = require('esprima');
// const

const code = `
const view = {
    a: 3,
    init: () => {
        view.a = 5;
    },
    render: () => {
    }    
}`;
const ast = esprima.parse(code);

console.log(JSON.stringify(ast, null, 4));
