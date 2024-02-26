/**
 * print the log with date ISO for tracking
 * @param {*} argMessage - message to display
 * @param {*} argWarning - boolean, if true use warn | default false and use log
 */
export const log = (argMessage, argWarning = false) => {
    console[argWarning ? "warn" : "log"](`[${new Date().toISOString()}]: ${argMessage}`);
}

/**
 * return the xpath at [1-N] or return main container
 * @param argXpath - string which contains the full string within max ID range ex: ```(//ul[@role='listbox']//li)%10```
 * @param argSpecificID - based on max range, if max id 10 -> return null when user want to access id 11 and the main container if id 0
 * @NOTE: xpath don't use 0 as first element id, 0 is default value for argSpecificID and return main container
 * @returns 
 */
export const getXpathFromListID = (argXpath, argSpecificID = 0) => {
    const tempXpath = argXpath.split("%");
    let result = "";

    if (!argSpecificID || argSpecificID > parseInt(tempXpath[1])) {
        result = tempXpath[0].slice(1, -1);
        log(`no ID specified or outside of authorized range`, true);
    } else {
        result = tempXpath[0].concat(" ", `[${argSpecificID.toString()}]`);
    }

    return result;
}

/**
 * generate the code to import and init interfaces
 * @param {*} argArrayInterfaces - array string based on build.config.json > interface
 * @returns 
 */
export const importInterface = (argArrayInterfaces, argCapabilities, argMarket) => {
    let result = "", tempImport= "", tempInit = "";

    argArrayInterfaces.forEach(interfaceElement => {
        const interfaceName = interfaceElement.charAt(0).toUpperCase() + interfaceElement.slice(1);
        tempImport += `import { ${interfaceName}Interface } from '../../src/interfaces/${interfaceName}Interface/index.js';\n`;
        tempInit += 
            `const ${interfaceElement}Interface = new ${interfaceName}Interface(`
                + `${JSON.stringify(argCapabilities)}`
                + `, "${argMarket}"`
                + `, {"common": _commonProperties, "market": _marketProperties});\n`;
    });

    result += tempImport + "\n" + tempInit;

    return result;
}

/**
 * convert 'arg' into {arg} to connect steps with interface using dynamic format. 
 * @param {*} argStep - contains step as string from feature file
 * @returns - step with all parameters from this step
 */
export const fromatStepArguments = (argStep) => {
    let isBracketOpen = false, comptArg = 0, stepAction = [], tempAction = "";
    let isParams = false, isAction= false;
    let result = { "step": "", "params": "", "action": ""};

    for(let compt = 0; compt < argStep.length; compt++) {
        if (argStep.charAt(compt) === "~" || argStep.charAt(compt) === "'") {

            argStep.charAt(compt) === "~" ? isAction = true : isParams = true;

            if (isBracketOpen) {
                if (isParams) {
                    if(comptArg) result.params += ", ";
                    result.step += "}";
                    result.params += "arg_" + comptArg;
                    comptArg++;
                    result.step = result.step.replace(tempAction, "string");
                }
                if (isAction) result.step += "~";
                stepAction.push(tempAction);

                tempAction = "";
                isBracketOpen = false, isParams = false, isAction= false;
            } else {
                isBracketOpen = true;
                result.step += isParams ? "{" : "~";

                let stopLoop = false, tempWordComp = compt + 1;
                while (!stopLoop) {
                    argStep.charAt(tempWordComp) === "~" || argStep.charAt(tempWordComp) === "'"
                        ?  stopLoop = true
                        : tempAction += argStep.charAt(tempWordComp);
                    tempWordComp++;
                }
            }
        } else {
            result.step += argStep.charAt(compt);
        }
    }

    result.action += stepAction.length ? 
        `${stepAction[0]}.${stepAction[1]}(${(result.params) ? result.params : ""});`
        : "";

    return result;
}

