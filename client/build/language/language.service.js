"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
var language_config_js_1 = require("./language.config.js");
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        var _this = this;
        this.language = "ENG";
        this.getLanguage = function () { return _this.language; };
        this.setLanguage = function (language) { _this.language = language; };
        this.update = function (langName) {
            var language = language_config_js_1.languageConfig[langName];
            Object.keys(language).forEach(function (id) {
                var element = $("#" + id);
                if (!element)
                    return;
                var text = language[id];
                switch (element.prop("nodeName")) {
                    case "INPUT":
                        $(element).attr("placeholder", text);
                        break;
                    default:
                        $(element).text(text);
                }
            });
        };
        document.addEventListener("DOMContentLoaded", function () {
            _this.update(_this.language);
        });
    }
    return LanguageService;
}());
exports.LanguageService = LanguageService;
