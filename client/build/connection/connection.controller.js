"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionController = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var connection_service_js_1 = require("./connection.service.js");
var ConnectionController = /** @class */ (function () {
    function ConnectionController(connectionService) {
        var _this = this;
        this.connectionService = connectionService;
        app_service_js_1.AppService.on(Events_enum_js_1.Events.SetConnectionType, function (type) {
            _this.connectionService.setConnectionType(type);
        });
        app_service_js_1.AppService.on(Events_enum_js_1.Events.EmitServer, function (config) {
            _this.connectionService.emitServer(config);
        });
        app_service_js_1.AppService.on(Events_enum_js_1.Events.SetIP, function (ip) {
            connection_service_js_1.ConnectionService.setIP(ip);
        });
    }
    return ConnectionController;
}());
exports.ConnectionController = ConnectionController;
