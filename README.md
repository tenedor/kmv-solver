Knights, Knaves, and Monks puzzle solver - play around with it at http://tenedor.github.io/kmv-solver/

A Knights, Knaves, and Monks puzzle, often also called Knights, Knaves, and Normals, is a truth-functional logic game. On the island of Knights, Knaves, and Monks, you encounter a group of islanders. Knights always tell the truth, Knaves always lie, and Monks might say anything at all. Conveniently, there are always fewer Monks than half the group. Based on their statements, determine their identities. In the general case, there might be 0, 1, or more than 1 solutions.

The solver is implemented to work with puzzles of up to 7 islanders, but there's nothing special about 7. You can adapt the code trivially if you want to handle more.

The solver implementation exists in three files:
- the Ohm grammar (`ohm/grammar.ohm`)
- the abstract syntax tree generator (`js/ast-generator.js`)
- the evaluator (`js/eval.js`)

These files are tidily written. Note that the various other files are auxiliary and often irrelevant, as my first step when making this was to copy an old project, so I don't recommend looking at them.

This solver can solve all puzzles that can be paraphrased with the following definitions and rules:

- An islander `I` is one of `A`, `B`, `C`, `D`, `E`, `F`, `G`
- A role `R` is one of `K`, `M`, `V` (knight, monk, knave)
- A number `N` is an integer between 0 and the number of islanders
- A statement `S` is composed from islanders, roles, and other statements using the following rules:
  - `I=R` // islander `I` has role `R`
  - `I=I` // two islanders have the same role
  - `eR` &nbsp; // an even number of islanders have role `R`
  - `oR` &nbsp; // an odd number of islanders have role `R`
  - `NR` &nbsp; // `N` islanders have role `R`
  - `ImI` // islander 1 speaks the truth more than islander 2
  - `IlI` // islander 1 speaks the truth less than islander 2
  - `(S)` // group one or more statements
  - `-S` &nbsp; // not S
  - `S.S` // and
  - `S|S` // or
  - `S>S` // if-then
  - `S#S` // biconditional (if and only if)
