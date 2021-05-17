如何使用 peg.js 来进行解析

先拿官方的例子来进行说明
在官方网站中有个 [online version](https://pegjs.org/online)

将案例中根据 peg 设置的语法规则，然后保存为arithmetics.pegjs 文件，然后使用以下命令来转换成 arithmetics.js文件
```javascript
 pegjs arithmetics.pegjs
```

然后在引用 `arithmetics.js`文件中的 `parse`方法，就可以传入字符串来进行解析了

```javascript
const {parse} = require('./arithmetics');

let result = parse('2 * (3 + 4)');
console.log(result);
```

jison 也可以通过如上的步骤来实现对于字符串解析，但有次做了这种项目，好像只是解析成了 ast
其实解析成 ast 就可以了，通过 ast 来使用javaScript来运算明显会方便很多，如果运算也写成pegjs这种语法的形式
那就比用 JavaScript 麻烦好多

目前写了两个 pegjs 的例子，一个官方的，另一个按照语法来写的，在 matchFunc.pegjs 中，下面写一下注释
```
Expression
    // "function" 是纯匹配 function 这个字符的
    // _ 是匹配 whitespace 的，下面有定义
    // funName:name 是使用 name 的定义（下面有定义），然后当前变量名为 funName
    // "(" 也是纯匹配 ( 的
    // param:name 也是使用 name 的定义，然后当前变量为 param
    = "function" _ funName:name _ "(" param:name ")" _ "{"
    _ otherBefore:name _
    "if" _ "(" cond:name _ ")" _ "{"
        _ expr:name _
    "}"
    _ otherAfter:name _
    "}"
    // 这里是匹配到以上的规则后，然后这里自定义 return 的返回
    // 这里可以使用 es6 的 `` 语法
    // 这里可以使用以上的的变量名
    { return `function ${funName} { ${otherBefore} (${cond})?(${expr}):'' ; ${otherAfter} } `}

// 这里定义一个匹配的规则，然后其他匹配的时候可以使用当前这个规则名
name = nn:[a-zA-Z /_0-9=;]* {return nn.join("")}

// 这里定义 whitespace 的匹配规则
_ "whitespace"
    = [ \t\n\r]*
```

使用 `pegjs matchFunc.pegjs` 生成 matchFunc.js 文件，然后引入该文件中的 parse 方法，就可以使用了
```javascript
let code = `function test() {
    let a = 1;
    if (a == 1) {
        a = 2;
    }
    a = 5;
}`

let result = parse(code);
console.log(result); 
// 这里的输出，就是上面规则中的 Expression 中自定义的 return 输出
// 输出：function test { let a = 1; (a == 1)?(a = 2;):'' ; a = 5; }
```