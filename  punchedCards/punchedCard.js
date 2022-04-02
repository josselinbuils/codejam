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

  rl.on("line", function (line) {
    if (problem.T === 0) {
      problem.T = Number(line);
    } else {
      const [a, b] = line.split(" ");
      const aNum = Number(a);
      const bNum = Number(b);

      problem.testCases.push([aNum, bNum]);

      if (problem.testCases.length === problem.T) {
        solveProblem(problem);
        process.exit();
      }
    }
  });
}

readInput();

function solveProblem(problem) {
  problem.testCases.forEach(([lines, columns], index) => {
    const xLength = columns * 2 + 1;
    const yLength = lines * 2 + 1;
    const array = [];

    for (let y = 0; y < yLength; y++) {
      array.push([]);

      for (let x = 0; x < xLength; x++) {
        if (y % 2 === 0) {
          array[y].push( x % 2 === 0 ? "+" : "-");
        } else {
          array[y].push( x % 2 === 0 ? "|" : ".");
        }
      }
    }
    array[0][0] = ".";
    array[0][1] = ".";
    array[1][0] = ".";
    array[1][1] = ".";

    console.log(`Case #${index + 1}:`);
    console.log(array.map(line => line.join('')).join("\n"));
  });
}
