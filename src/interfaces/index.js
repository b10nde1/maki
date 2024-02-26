import {Builder, Browser} from 'selenium-webdriver';

var _driver;
var _capabilities;

export class MakiDriver {
    constructor (argCapabilities) {
        this._capabilities = argCapabilities;
        this.startSession();
    }

    startSession() {
        this._driver = new Builder().forBrowser(Browser[(this._capabilities?.browser).toUpperCase() || "CHROME"]).build();
    }
}