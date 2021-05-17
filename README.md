# DSL / AST 研究

日常在使用 AST 会比较多一点，那么相关的库有哪些呢，如何使用呢，
使用在哪些场景下呢

参考[astexplorer](http://astexplorer.net/) 中有针对现有主流语言的所有的 ast 解析
针对前端的 HTML/CSS/JavaScript/Vue 都有解析的库

针对 DSL，则有 [peg.js](https://pegjs.org/) / [jison](https://github.com/zaach/jison) 来进行解析
虽然使用过 jison，但是感觉还是 peg 的语法更好理解，也更好解析

一般 DSL 都有 lexical and syntactical analysis 这两步

针对语言的解析，同通常都是一个 Compiler，我们可以看看 [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler) 是怎么写的
