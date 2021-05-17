一般在使用 AST 的时候，都会调用某个库解析语言为 AST 格式
然后使用 traverse 的库来实现遍历的过程中修改某个节点的值
最后再使用 generator 的库来重新将 AST 转换回代码

比如使用 `babel` 相关的库
```javascript
var babylon = require('babylon');
const traverse = require('babel-traverse').default
var generator = require('babel-generator').CodeGenerator;
var btypes = require('babel-types')

var code = `
const view = {
    a: 3,
    init: () => {
        view.a = 5;
    },
    render: () => {

    }
}
`;
/**
* comments:注释内容
* loc:location
* program:程序的ast
* tokens: 程序拆分出来的字符串
*/
var ast = babylon.parse(code);
// console.log(JSON.stringify(ast, null, 4))

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: 'render' })) {
            let name = path.node.name+"_fed123";
            path.replaceWith(btypes.identifier(name))
        }
    }
})

var regenerated_code = new generator(ast, {}, code).generate();
console.log(JSON.stringify(regenerated_code, null, 4))
```

比如使用 esprima 
```javascript
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require("escodegen");

var code = `
const view = {
    a: 3,
    init: () => {
        view.a = 5;
    },
    render: () => {

    }
}
`;
var ast = esprima.parse(code);
// console.log(JSON.stringify(ast, null, 4))

estraverse.traverse(ast, {
    enter: function (node) {
        node.name += "_fed123";
    }
});
var regenerated_code = escodegen.generate(ast)
console.log(JSON.stringify(regenerated_code, null, 4))

```