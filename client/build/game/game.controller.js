"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var GameController = /** @class */ (function () {
    function GameController(gameService) {
        var _this = this;
        this.gameService = gameService;
        app_service_js_1.AppService.on(Events_enum_js_1.Events.PostLanguage, function (newLanguage) {
            _this.gameService.setCurrentLanguage(newLanguage);
        });
    }
    return GameController;
}());
exports.GameController = GameController;
