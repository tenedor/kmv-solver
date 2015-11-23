var g = ohm.grammar("O");
var toAST = g.synthesizedAttribute({
  Problem:          function(numActors, claims) { return ["problem", toAST(numActors), toAST(claims)]; },
  Claim:            function(actor, _, stmt)    { return ["claim", toAST(actor), toAST(stmt)]; },
  Stmt:             function(stmt)              { return toAST(stmt); },
  Stmt_and:         function(stmt0, _, stmt1)   { return ["and", toAST(stmt0), toAST(stmt1)]; },
  Stmt_or:          function(stmt0, _, stmt1)   { return ["or", toAST(stmt0), toAST(stmt1)]; },
  Stmt_ifThen:      function(stmt0, _, stmt1)   { return ["ifThen", toAST(stmt0), toAST(stmt1)]; },
  Stmt_bicond:      function(stmt0, _, stmt1)   { return ["bicond", toAST(stmt0), toAST(stmt1)]; },
  StmtBlock:        function(stmt)              { return toAST(stmt); },
  StmtBlock_role:   function(actor, _, role)    { return ["role", toAST(actor), toAST(role)]; },
  StmtBlock_actor:  function(actor, _, actor0)  { return ["actor", toAST(actor), toAST(actor0)]; },
  StmtBlock_even:   function(_, role)           { return ["even", toAST(role)]; },
  StmtBlock_odd:    function(_, role)           { return ["odd", toAST(role)]; },
  StmtBlock_num:    function(num, role)         { return ["num", toAST(num), toAST(role)]; },
  StmtBlock_more:   function(actor, _, actor0)  { return ["more", toAST(actor), toAST(actor0)]; },
  StmtBlock_less:   function(actor, _, actor0)  { return ["less", toAST(actor), toAST(actor0)]; },
  StmtBlock_paren:  function(_, stmt, _)        { return toAST(stmt); },
  StmtBlock_not:    function(_, stmt)           { return ["not", toAST(stmt)]; },
  numActors:        function(n)                 { return this.interval.contents; },
  actor:            function(a)                 { return this.interval.contents; },
  role:             function(r)                 { return this.interval.contents; },
  num:              function(r)                 { return parseInt(this.interval.contents); },
  op:               function(op)                { return op; },
  _list:            ohm.actions.map,
  _terminal:        ohm.actions.getValue,
  _default:         ohm.actions.passThrough
});

var O = new Interpreter(g, "Problem", toAST);

O.evalAST = function(ast) {
  throw new Error("evalAST is not configured correctly");
};
