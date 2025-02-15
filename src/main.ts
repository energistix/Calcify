const input = document.getElementById("input") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLDivElement;

input.addEventListener("input", () => {
  let res = "";
  input.value.split("\n").forEach((line) => {
    console.log(line);
    res += " ".repeat(line.length + 1) + line + "\n";
  });
  output.innerHTML = res;
});
