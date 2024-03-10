"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
var game_controller_js_1 = require("./game.controller.js");
var game_service_js_1 = require("./game.service.js");
var GameModule = /** @class */ (function () {
    function GameModule() {
        var gameService = new game_service_js_1.GameService();
        new game_controller_js_1.GameController(gameService);
    }
    return GameModule;
}());
exports.GameModule = GameModule;
