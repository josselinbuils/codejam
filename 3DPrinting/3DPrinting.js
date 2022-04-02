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
  const max = Math.pow(10, 6);

  problem.testCases.forEach((c, index) => {
    const res = [];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      const min = Math.min(c[0][i], c[1][i], c[2][i]);
      const val = sum + min < max ? min : Math.max(max - sum, 0);
      res.push(val);
      sum += val;
    }
    console.log(
      `Case #${index + 1}: ${sum === max ? res.join(" ") : "IMPOSSIBLE"}`
    );
  });
}
