import { evaluate as mathEvaluate } from "mathjs";

const input = document.getElementById("input") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLDivElement;

input.addEventListener("input", () => {
  let res = "";
  const scope = {};
  input.value.split("\n").forEach((line) => {
    if (line === "") return (res += "\n");
    let output = "";
    try {
      let evaluation = mathEvaluate(line, scope).toString();
      if (evaluation.trim().includes("\n")) output = "error";
      else output = evaluation;
    } catch (e) {
      output = "error";
    }
    res += " ".repeat(line.length + 1) + output + "\n";
  });
  output.innerHTML = res;
});
