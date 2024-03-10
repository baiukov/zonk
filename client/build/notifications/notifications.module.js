"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
var notifications_controller_js_1 = require("./notifications.controller.js");
var notifications_service_js_1 = require("./notifications.service.js");
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
        var notificationsService = new notifications_service_js_1.NotificationsService();
        new notifications_controller_js_1.NotificationsController(notificationsService);
    }
    return NotificationsModule;
}());
exports.NotificationsModule = NotificationsModule;
