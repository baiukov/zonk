"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var PlayerStatus_enum_js_1 = require("../enums/PlayerStatus.enum.js");
var ServerEvents_enum_js_1 = require("../enums/ServerEvents.enum.js");
var language_config_js_1 = require("../language/language.config.js");
var getID_js_1 = require("../utils/getID.js");
var save_js_1 = require("../utils/save.js");
var LoginService = /** @class */ (function () {
    function LoginService() {
        var _this = this;
        this.currentLanguage = "ENG";
        this.setCurrentLanguage = function (language) { _this.currentLanguage = language; };
        this.checkPlayer = function () {
            if (window.location.pathname != "/")
                return;
            app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                eventName: ServerEvents_enum_js_1.ServerEvents.Check,
                data: { id: (0, getID_js_1.getID)() },
                onSuccess: function (status) {
                    switch (status) {
                        case PlayerStatus_enum_js_1.PlayerStatus.INGAME:
                            window.location.href = "../pages/game";
                            break;
                        case PlayerStatus_enum_js_1.PlayerStatus.INLOBBY:
                            window.location.href = "/pages/lobby";
                            break;
                    }
                },
                onError: function (error) {
                    app_service_js_1.AppService.emit(Events_enum_js_1.Events.Notify, error);
                }
            });
        };
        this.watch = function () {
            $("#go").click(function () {
                var name = $("#name").val();
                var room = $("#room").val();
                var ip = $("#ip").val();
                var connection = $("#connection").val();
                if (!name || !room || !ip || !connection)
                    return;
                app_service_js_1.AppService.emit(Events_enum_js_1.Events.SetIP, ip);
                app_service_js_1.AppService.emit(Events_enum_js_1.Events.SetConnectionType, connection);
                var data = {
                    "name": name,
                    "room": room,
                };
                app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                    eventName: ServerEvents_enum_js_1.ServerEvents.Login,
                    data: data,
                    onSuccess: function (response) {
                        console.log(response);
                        _this.login(response);
                    },
                    onError: function (error) {
                        app_service_js_1.AppService.emit(Events_enum_js_1.Events.GetLanguage, null);
                        app_service_js_1.AppService.emit(Events_enum_js_1.Events.Notify, language_config_js_1.languageConfig[_this.currentLanguage][error]);
                    }
                });
                return false;
            });
        };
        this.login = function (sessionID) {
            var data = {
                sessionID: sessionID
            };
            (0, save_js_1.save)(data);
            window.location.href = "./pages/lobby";
        };
        this.clearPlayer = function () {
            window.location.pathname = "";
            localStorage.removeItem("currentPlayer");
        };
        this.watch();
        this.checkPlayer();
    }
    return LoginService;
}());
exports.LoginService = LoginService;
