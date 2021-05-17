/*
* 如何来写一个解析 CSS 成 AST 的库
* 其实就是写正则来匹配，然后将匹配到的数据进行封装，最后返回的所有的格式就是一个 AST 格式了
* */

let css = `
  .foo {
    color: red;
    left: 10px;
  }
  
  body {
    background: orange;
  }

  @media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
    10.01%,20% {
      background-position-y: -23px
    }
  }  
  
  @keyframes mymove { from {top:0px;} to {top:200px;} } 
  
  @-webkit-keyframes mymove { from {top:0px;} to {top:200px;} } 

  @font-face{font-family:"Roboto";src:url("//i.alicdn.com/artascope-font/20160419204543/font/roboto-thin.eot");}        
`;

css = css.replace(/[\n\s]{2,}/g, '');

function getMatchedSpecialRules(rule, type, cssText) {
    let cssGrammarRule = rule;
    let matchRule = {};
    let rules = [];
    while ((matchRule = cssGrammarRule.exec(cssText))) {
        if (matchRule[1].match('@')) {
            let styleText = matchRule[2].trim();
            rule = {
                selectorText: matchRule[1],
                type: type,
                subStyles: getMatchedRules(styleText)
            };
            rules.push(rule);
        }
        else {
            rules.push({
                selector: matchRule[1],
                style: parseProperty(matchRule[2]),
                cssText: matchRule[0]
            });
        }
    }
    return rules;
}

function getMatchedRules(cssText) {
    let cssGrammarRule = /([\s\S]+?)\{([\s\S]*?)\s*?\}/gi;
    let matchRule = {};
    let rules = [];
    while ((matchRule = cssGrammarRule.exec(cssText))) {
        rules.push({
            selectorText: matchRule[1],
            style: parseProperty(matchRule[2]),
            cssText: matchRule[0]
        });
    }
    return rules;
}

function parseProperty(expr) {
    let exprList = expr.split(';');
    let result = {};
    exprList.forEach(function (item) {
        if (item.match(':')) {
            let kv = item.split(':');
            result[kv[0]] = kv[1]
        }
    })
    return result;
}

let mediaRule = /(@media[\s\S]*?){([\s\S]*?}\s*?)}/gi;
let keyframesRule = /(@[a-z\-]*?keyframes[\s\S]*?){([\s\S]*?}\s*?)}/gi;

let rules = [];
rules = rules.concat(getMatchedSpecialRules(mediaRule, 'media', css));
css = css.replace(mediaRule, "");
rules = rules.concat(getMatchedSpecialRules(keyframesRule, 'keyframes', css));
css = css.replace(keyframesRule, '');
rules = rules.concat(getMatchedRules(css));

console.log(JSON.stringify(rules, null, 4));