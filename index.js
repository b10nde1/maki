import {log} from "./src/utilities/utilities.js";
import * as fs from "fs";
import _build from "./configs/build.config.json" assert{type: "json"};
import _mapping from "./configs/mapping.config.json" assert{type: "json"};

const market = process.env.site_target;
const targetFolder = "output";

_build.scope[market].forEach(scopeElement => {
    const tempScriptPath = `${_mapping.feature.path[scopeElement]}${scopeElement}.feature`;
    const tempFeature = fs.readFileSync(`./features${tempScriptPath}`, "utf-8");
    const splitFeatureData = tempFeature.split("\n");
    let tempOutput = "";
    const outputPath = `./${targetFolder}/supports`;

    for (let compt = 3; compt < splitFeatureData.length; compt++) {
        const tempSteps = splitFeatureData[compt].trim().split(" ");
        tempOutput += `\n${tempSteps[0]}('`
            + `${tempSteps.slice(1).join(" ")}, () => {`
            + `});`;
    }

    // copy feature file into output
    fs.copyFileSync(`features${tempScriptPath}`, `${targetFolder}/${scopeElement}.feature`);
    // generate the steps file
    !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
    fs.writeFileSync(`${outputPath}/${scopeElement}.steps.js`, tempOutput);

    log(`build completed for ${scopeElement} - ${market}`);
});