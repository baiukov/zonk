"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var app_service_js_1 = require("./app.service.js");
var connection_module_js_1 = require("./connection/connection.module.js");
var game_module_js_1 = require("./game/game.module.js");
var language_module_js_1 = require("./language/language.module.js");
var lobby_module_js_1 = require("./lobby/lobby.module.js");
var login_module_js_1 = require("./login/login.module.js");
var notifications_module_js_1 = require("./notifications/notifications.module.js");
var App = /** @class */ (function () {
    function App() {
        new app_service_js_1.AppService();
        new connection_module_js_1.ConnectionModule();
        new language_module_js_1.LanguageModule();
        new login_module_js_1.LoginModule();
        new notifications_module_js_1.NotificationsModule();
        new lobby_module_js_1.LobbyModule();
        new game_module_js_1.GameModule();
    }
    return App;
}());
exports.App = App;
