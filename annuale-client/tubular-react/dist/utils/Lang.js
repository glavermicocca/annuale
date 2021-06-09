"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangDefault = exports.LangBase = void 0;
var English_1 = require("./languages/English");
var formatTranslation = function (val, args) {
    return val.replace(new RegExp("{([0-" + (args.length - 1) + "])}", 'gi'), function (_, index) { return args[index]; });
};
var LangBase = /** @class */ (function () {
    function LangBase(langKey, initialLanguage) {
        this.data = {};
        this.addLanguage(langKey, initialLanguage);
        this.changeLanguage(langKey);
    }
    LangBase.prototype.translate = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var text = this.data[this.currentLanguage][key];
        if (!text)
            return key;
        return args.length > 0 ? formatTranslation(text, args) : text;
    };
    LangBase.prototype.changeLanguage = function (langKey) {
        this.currentLanguage = langKey;
    };
    LangBase.prototype.addLanguage = function (langKey, data) {
        this.data[langKey] = data;
    };
    return LangBase;
}());
exports.LangBase = LangBase;
var LangDefault = /** @class */ (function (_super) {
    __extends(LangDefault, _super);
    function LangDefault() {
        return _super.call(this, 'en', English_1.default) || this;
    }
    return LangDefault;
}(LangBase));
exports.LangDefault = LangDefault;
var Lang = new LangDefault();
exports.default = Lang;
