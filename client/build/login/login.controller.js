"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var LoginController = /** @class */ (function () {
    function LoginController(loginService) {
        var _this = this;
        this.loginService = loginService;
        app_service_js_1.AppService.on(Events_enum_js_1.Events.PostLanguage, function (language) {
            _this.loginService.setCurrentLanguage(language);
        });
        app_service_js_1.AppService.on(Events_enum_js_1.Events.ClearPlayer, function () {
            _this.loginService.clearPlayer();
        });
    }
    return LoginController;
}());
exports.LoginController = LoginController;
