import { until } from 'selenium-webdriver';
import { log } from '../../utilities/utilities.js';
import { MakiDriver } from '../index.js';

const _market = "";
var _properties;

export class BrowserInterface extends MakiDriver {
    constructor (argCapabilities, argMarket, argProperties) {
        super(argCapabilities);
        this._properties = argProperties;
        this._market = argMarket;
    }

    async startBrowser() {    
        log(`open url for ${this._market}`);
        await this._driver.get(this._properties?.market?.url || "https://en.wiktionary.org/wiki/dumb");
    }

    async closeBrowser() {
        log(`close browser`);
        await this._driver.quit();
    }

    async verifyTitle(argTitle, argCustomTimeOut) {
        log(`verify browser title is ${argTitle}`);
        await this._driver.wait(until.titleIs(argTitle), argCustomTimeOut || this._capabilities.timeOut);
    }
};