"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var NotificationsController = /** @class */ (function () {
    function NotificationsController(notificationsService) {
        var _this = this;
        this.notificationsService = notificationsService;
        app_service_js_1.AppService.on(Events_enum_js_1.Events.Notify, function (message) {
            _this.notificationsService.show(message);
        });
    }
    return NotificationsController;
}());
exports.NotificationsController = NotificationsController;
