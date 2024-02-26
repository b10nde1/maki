import { MakiDriver } from '../index.js';

const _market = "";
var _capabilities;

export class SearchInterface extends MakiDriver {
    constructor (argCapabilities, argMarket, argProperties) {
        super(argCapabilities);
        this._properties = argProperties;
        this._market = argMarket;
    }
};