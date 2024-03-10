"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyService = void 0;
var app_service_js_1 = require("../app.service.js");
var Events_enum_js_1 = require("../enums/Events.enum.js");
var ServerEvents_enum_js_1 = require("../enums/ServerEvents.enum.js");
var getID_js_1 = require("../utils/getID.js");
var secToMs_js_1 = require("../utils/secToMs.js");
var showPlayers_js_1 = require("../utils/showPlayers.js");
var LobbyService = /** @class */ (function () {
    function LobbyService() {
        var _this = this;
        this.watch = function () {
            $("#start").click(function () {
                var id = (0, getID_js_1.getID)();
                var points = $("#goal").val();
                if (!id || !points)
                    return;
                var data = {
                    "id": id,
                    "points": points,
                };
                app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                    eventName: ServerEvents_enum_js_1.ServerEvents.StartGame,
                    data: data,
                    onSuccess: function (response) {
                        window.location.href = "../game";
                    },
                    onError: function (error) {
                        console.log(error);
                    }
                });
                return false;
            });
        };
        this.setUpdateInterval = function () {
            if (window.location.pathname != "/pages/lobby/")
                return;
            _this.updatePlayerList();
            _this.roomInterval = setInterval(function () {
                _this.updatePlayerList();
            }, (0, secToMs_js_1.secToMs)(0.5));
        };
        this.updatePlayerList = function () {
            var dataStr = localStorage.getItem("currentPlayer");
            if (!dataStr)
                return;
            var data = JSON.parse(dataStr);
            if (!data)
                return;
            var id = data.sessionID;
            if (!id)
                return;
            app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                eventName: ServerEvents_enum_js_1.ServerEvents.GetRoom,
                data: { id: id },
                onSuccess: function (roomName) {
                    _this.getPlayers(roomName, id);
                    _this.setRoom();
                },
                onError: function (error) {
                    app_service_js_1.AppService.emit(Events_enum_js_1.Events.Notify, error);
                    app_service_js_1.AppService.emit(Events_enum_js_1.Events.ClearPlayer, 0);
                }
            });
        };
        this.setRoom = function () {
            if (window.location.pathname != "/pages/lobby/") {
                window.location.href = "./pages/lobby";
            }
        };
        this.getPlayers = function (roomName, id) {
            var data = {
                room: roomName
            };
            app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                eventName: ServerEvents_enum_js_1.ServerEvents.GetPlayers,
                data: data,
                onSuccess: function (response) {
                    _this.update(response, roomName, id);
                },
                onError: function (error) {
                    app_service_js_1.AppService.emit(Events_enum_js_1.Events.Notify, error);
                    window.location.href = "";
                    localStorage.removeItem("currentPlayer");
                }
            });
        };
        this.update = function (dataStr, room, id) {
            var data = JSON.parse(dataStr);
            (0, showPlayers_js_1.showPlayers)(data);
            if (!data.isInGame)
                return;
            window.location.href = "../game";
            var dataToSend = {
                id: id,
                room: room
            };
            app_service_js_1.AppService.emit(Events_enum_js_1.Events.EmitServer, {
                eventName: ServerEvents_enum_js_1.ServerEvents.AddPlayer,
                data: dataToSend,
                onSuccess: function (_) { },
                onError: function (error) {
                    app_service_js_1.AppService.emit(Events_enum_js_1.Events.Notify, error);
                }
            });
        };
        this.watch();
        this.setUpdateInterval();
    }
    return LobbyService;
}());
exports.LobbyService = LobbyService;
