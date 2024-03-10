"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModule = void 0;
var language_controller_js_1 = require("./language.controller.js");
var language_service_js_1 = require("./language.service.js");
var LanguageModule = /** @class */ (function () {
    function LanguageModule() {
        var languageService = new language_service_js_1.LanguageService();
        new language_controller_js_1.LanguageController(languageService);
    }
    return LanguageModule;
}());
exports.LanguageModule = LanguageModule;
