"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
var connection_controller_js_1 = require("./connection.controller.js");
var connection_service_js_1 = require("./connection.service.js");
var ConnectionModule = /** @class */ (function () {
    function ConnectionModule() {
        var connectionService = new connection_service_js_1.ConnectionService();
        new connection_controller_js_1.ConnectionController(connectionService);
    }
    return ConnectionModule;
}());
exports.ConnectionModule = ConnectionModule;
