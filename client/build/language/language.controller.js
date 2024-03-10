"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var LanguageController = /** @class */ (function () {
    function LanguageController(languageService) {
        var _this = this;
        this.languageService = languageService;
        app_service_js_1.AppService.on(Events_enum_js_1.Events.GetLanguage, function () {
            app_service_js_1.AppService.emit(Events_enum_js_1.Events.PostLanguage, _this.languageService.getLanguage());
        });
    }
    return LanguageController;
}());
exports.LanguageController = LanguageController;
