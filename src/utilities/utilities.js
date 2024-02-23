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
    let result = "";
    const tempXpath = argXpath.split("%");

    if (!argSpecificID || argSpecificID > parseInt(tempXpath[1])) {
        result = tempXpath[0].slice(1, -1);
        log(`no ID specified or outside of authorized range`, true);
    } else {
        result = tempXpath[0].concat(" ", `[${argSpecificID.toString()}]`);
    }

    return result;
}