const fs = require("fs");
const { Z_FILTERED } = require("zlib");

let rawdata = fs.readFileSync("src/data/questions.json");
let data = JSON.parse(rawdata);
console.log(data);
const changes = data
  .map((datum) => {
    datum.strength = datum.strength * datum.multiplier;
    delete datum.multiplier;
    if (datum.category === "economics" && datum.subcategory === "markets") {
      datum.strength = datum.strength * -1;
    } else if (
      datum.category === "culture" &&
      datum.subcategory === "freedom"
    ) {
      return null;
    } else if (
      datum.category === "culture" &&
      datum.subcategory === "tradition"
    ) {
      datum.strength = datum.strength * -1;
    } else if (
      datum.category === "government" &&
      datum.subcageory === "authority"
    ) {
      datum.strength = datum.strength * -1;
    }
    if (
      datum.category === "foreign-policy" ||
      datum.category === "equality" ||
      datum.category === "personal-freedom"
    ) {
      return null;
    }
    delete datum.subcategory;
    datum.strength = datum.strength * -1;
    const output = { ...datum, chinese: "" };
    return output;
  })
  .filter((x) => !!x);

const toWrite = JSON.stringify(changes, null, 2);
fs.writeFileSync("src/data/questions-v3.json", toWrite);
