const fs = require("fs");

let rawdata = fs.readFileSync("src/data/questions.json");
let data = JSON.parse(rawdata);
console.log(data);
const changes = data.map((datum) => {
  datum.strength = datum.strength * datum.multiplier;
  delete datum.multiplier;
  const output = { ...datum, chinese: "" };
  return output;
});

const toWrite = JSON.stringify(changes, null, 2);
fs.writeFileSync("src/data/questions-v2.json", toWrite);
