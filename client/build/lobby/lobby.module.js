"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyModule = void 0;
var lobby_controller_js_1 = require("./lobby.controller.js");
var lobby_service_js_1 = require("./lobby.service.js");
var LobbyModule = /** @class */ (function () {
    function LobbyModule() {
        var lobbyService = new lobby_service_js_1.LobbyService();
        new lobby_controller_js_1.LobbyController(lobbyService);
    }
    return LobbyModule;
}());
exports.LobbyModule = LobbyModule;
