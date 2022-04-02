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
      if (lineIndex % 2 === 0) {
        problem.testCases.push([]);
      }
      problem.testCases[problem.testCases.length - 1].push(
        line.split(" ").map(Number)
      );

      lineIndex++;

      if (lineIndex >= problem.T * 2) {
        solveProblem(problem);
        process.exit();
      }
    }
  });
}

readInput();

function solveProblem(problem) {
  problem.testCases.forEach((c, index) => {
    const dice = c[1].sort((a, b) => a - b);
    let res = 0;

    for (const sides of dice) {
      if (sides > res) {
        res++;
      }
    }
    console.log(`Case #${index + 1}: ${res}`);
  });
}
