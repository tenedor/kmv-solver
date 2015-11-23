(function() {

O.evalAST = function(ast) {
  var numActors = ast[1];
  var claims = ast[2];
  var maxMonks = parseInt((numActors - 1) / 2)
  var truthTable = generateTruthTable(numActors, maxMonks);
  var answers = [];
  var i, j, valid, actor, stmt, actorHypothesis;

  for (i = 0; i < truthTable.length; i++) {
    if (i * claims.length + 1 % 1000 === 0) {
      console.log(i);
    };

    truthRow = truthTable[i];

    valid = true;
    for (j = 0; j < claims.length; j++) {
      actor = claims[j][1];
      stmt = claims[j][2];
      actorHypothesis = truthRow[indexForActor(actor)];

      if (actorHypothesis === 'M') {
        continue;
      } else if (actorHypothesis === 'V') {
        stmt = ["not", stmt];
      };

      if (!trueClaim(truthRow, stmt)) {
        valid = false;
        break;
      };
    };

    if (valid) {
      answers.push(truthRow);
    };
  };

  console.log(answers.length);
  return _.map(answers, function(arr) {return arr.join("");}).join(" ");
};

var trueClaim = function(truthRow, stmt) {
  var op = stmt[0];
  var binaryOps = ["and", "or", "ifThen", "bicond"];
  var unaryOps = ["not"];
  var p, q, actor, role, actor0, actor1, num;

  // if appropriate, calculate truth values for p and q
  if (binaryOps.indexOf(op) >= 0) {
    p = trueClaim(truthRow, stmt[1]);
    q = trueClaim(truthRow, stmt[2]);
  } else if (unaryOps.indexOf(op) >= 0) {
    p = trueClaim(truthRow, stmt[1]);
  };

  switch (op) {
    case "and":
      return p && q;
    case "or":
      return p || q;
    case "ifThen":
      return !p || q;
    case "bicond":
      return p === q;
    case "not":
      return !p;
    case "role":
      actor = truthRow[indexForActor(stmt[1])];
      role = stmt[2];
      return actor === role;
    case "actor":
      actor0 = truthRow[indexForActor(stmt[1])];
      actor1 = truthRow[indexForActor(stmt[2])];
      return actor0 === actor1;
    case "even":
      role = stmt[1];
      return (numActorsInRole(truthRow, role) % 2 === 0);
    case "odd":
      role = stmt[1];
      return (numActorsInRole(truthRow, role) % 2 === 1);
    case "more":
      actor0 = truthRow[indexForActor(stmt[1])];
      actor1 = truthRow[indexForActor(stmt[2])];
      return ((actor0 === "K" && actor1 !== "K") ||
              (actor0 === "M" && actor1 === "V"));
    case "less":
      actor0 = truthRow[indexForActor(stmt[1])];
      actor1 = truthRow[indexForActor(stmt[2])];
      return ((actor1 === "K" && actor0 !== "K") ||
              (actor1 === "M" && actor0 === "V"));
    case "num":
      num = stmt[1];
      role = stmt[2];
      return numActorsInRole(truthRow, role) === num;
  };
};

var generateTruthTable = function(numActors, maxMonks) {
  var table, nextTableK, nextTableM, nextTableV;

  table = [];
  if (numActors > 0) {
    nextTableK = generateTruthTable(numActors - 1, maxMonks);
    table = table.concat(multiplexArrays(['K'], nextTableK));

    if (maxMonks > 0) {
      nextTableM = generateTruthTable(numActors - 1, maxMonks - 1);
      table = table.concat(multiplexArrays(['M'], nextTableM));
    };

    nextTableV = nextTableK;
    table = table.concat(multiplexArrays(['V'], nextTableV));

  } else {
    table.push([]);
  };

  return table;
};

var multiplexArrays = function(arr, arrs) {
  var result, i;
  result = [];
  for (i = 0; i < arrs.length; i++) {
    result.push(arr.concat(arrs[i]));
  };
  return result;
};

var indexForActor = function(actor) {
  switch (actor) {
    case 'A':
      return 0;
    case 'B':
      return 1;
    case 'C':
      return 2;
    case 'D':
      return 3;
    case 'E':
      return 4;
    case 'F':
      return 5;
    case 'G':
      return 6;
    default:
      throw "something went wrong in indexForActor";
  };
};

var numActorsInRole = function(truthRow, role) {
  var count = 0;
  for (var i = 0; i < truthRow.length; i++) {
    if (truthRow[i] === role) {
      count++;
    };
  };
  return count;
};

})();
