function readInput() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let problem = {
    T: 0,
    testCases: [],
  };

  let lineIndex = 0;

  rl.on("line", function (line) {
    if (problem.T === 0) {
      problem.T = Number(line);
    } else {
      if (lineIndex % 3 === 0) {
        problem.testCases.push([]);
      }
      problem.testCases[problem.testCases.length - 1].push(
        line.split(" ").map(Number)
      );

      lineIndex++;

      if (lineIndex >= problem.T * 3) {
        solveProblem(problem);
        process.exit();
      }
    }
  });
}

readInput();

function solveProblem(problem) {
  problem.testCases.forEach(([moduleCount, funFactors, chains], index) => {
    const initiators = [];
    let res = 0;

    for (let i = 1; i <= moduleCount; i++) {
      if (!chains.includes(i)) {
        initiators.push(i);
      }
    }

    const initiatorsWithCommonModules = [];
    let baseRes = 0;

    for (const initiator of initiators) {
      let module = initiator;
      let funFactor = 0;

      while (module > 0) {
        if (chains.filter((m) => m === module).length > 1) {
          initiatorsWithCommonModules.push(initiator);
          funFactor = 0;
          break;
        }
        funFactor = Math.max(funFactor, funFactors[module - 1]);
        module = chains[module - 1];
      }
      baseRes += funFactor;
    }

    const initiatorCombinations = getCombinations(
      initiatorsWithCommonModules
    ).filter((a) => a.length === initiatorsWithCommonModules.length);

    for (const initiatorCombination of initiatorCombinations) {
      const triggeredModules = [];
      let combinationRes = 0;

      for (const initiator of initiatorCombination) {
        let module = initiator;
        let funFactor = 0;

        while (module > 0 && !triggeredModules.includes(module)) {
          triggeredModules.push(module);
          funFactor = Math.max(funFactor, funFactors[module - 1]);
          module = chains[module - 1];
        }
        combinationRes += funFactor;
      }
      res = Math.max(res, combinationRes + baseRes);
    }
    console.log(`Case #${index + 1}: ${res}`);
  });
}

function getCombinations(input, comb = [], result = [comb]) {
  return input.reduce(
    (acc, a, i) =>
      acc.concat(
        getCombinations(
          input.slice(0, i).concat(input.slice(i + 1)),
          comb.concat(a)
        )
      ),
    result
  );
}
