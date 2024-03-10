"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
var login_controller_js_1 = require("./login.controller.js");
var login_service_js_1 = require("./login.service.js");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
        var loginService = new login_service_js_1.LoginService();
        new login_controller_js_1.LoginController(loginService);
    }
    return LoginModule;
}());
exports.LoginModule = LoginModule;
