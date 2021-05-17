Expression
    = "function" _ funName:name _ "(" param:name ")" _ "{"
    _ otherBefore:name _
    "if" _ "(" cond:name _ ")" _ "{"
        _ expr:name _
    "}"
    _ otherAfter:name _
    "}"
    { return `function ${funName} { ${otherBefore} (${cond})?(${expr}):'' ; ${otherAfter} } `}

name = nn:[a-zA-Z /_0-9=;]* {return nn.join("")}

_ "whitespace"
    = [ \t\n\r]*