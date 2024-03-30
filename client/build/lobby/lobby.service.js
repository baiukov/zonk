import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { getID } from '../utils/getID.js';
import { log } from '../utils/log.js';
import { secToMs } from '../utils/secToMs.js';
import { showPlayers } from '../utils/showPlayers.js';
var LobbyService = /** @class */ (function () {
    function LobbyService() {
        var _this = this;
        this.watch = function () {
            $("#start").click(function () {
                var id = getID();
                var points = $("#goal").val();
                if (!id || !points)
                    return;
                var data = {
                    "id": id,
                    "points": points,
                };
                AppService.emit(Events.EmitServer, {
                    eventName: ServerEvents.StartGame,
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
            log(LogLevels.INFO, "Lobby buttons' listeners have been initialized");
        };
        this.setUpdateInterval = function () {
            if (window.location.pathname != "/pages/lobby/")
                return;
            _this.updatePlayerList();
            _this.roomInterval = setInterval(function () {
                _this.updatePlayerList();
            }, secToMs(0.5));
            log(LogLevels.INFO, "Lobby's interval has been initialized");
        };
        this.updatePlayerList = function () {
            var dataStr = localStorage.getItem("currentPlayer");
            if (!dataStr) {
                log(LogLevels.ERROR, "Cannot update player list. Cause by: player's data doesn't exist");
                return;
            }
            var data = JSON.parse(dataStr);
            if (!data) {
                log(LogLevels.ERROR, "Cannot update player list. Cause by: player's data cannot be parsed");
                return;
            }
            var id = data.sessionID;
            if (!id) {
                log(LogLevels.ERROR, "Cannot update player list. Cause by: player doesn't have an sessionID");
                return;
            }
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.GetRoom,
                data: { id: id },
                onSuccess: function (roomName) {
                    _this.getPlayers(roomName, id);
                    _this.setRoom();
                },
                onError: function (error) {
                    AppService.emit(Events.Notify, error);
                    AppService.emit(Events.ClearPlayer, 0);
                    log(LogLevels.ERROR, "Cannot update player list. Cause by: player isn't in the room");
                }
            });
        };
        this.setRoom = function () {
            if (window.location.pathname != "/pages/lobby/") {
                window.location.href = "./pages/lobby";
            }
            log(LogLevels.INFO, "User was redirected to lobby screen");
        };
        this.getPlayers = function (roomName, id) {
            var data = {
                room: roomName
            };
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.GetPlayers,
                data: data,
                onSuccess: function (response) {
                    _this.update(response, roomName, id);
                },
                onError: function (error) {
                    AppService.emit(Events.Notify, error);
                    localStorage.removeItem("currentPlayer");
                    log(LogLevels.ERROR, "Cannot update player list. Caused by: " + error);
                    window.location.href = "";
                }
            });
        };
        this.update = function (dataStr, room, id) {
            var data = JSON.parse(dataStr);
            showPlayers(data);
            if (!data.isInGame)
                return;
            window.location.href = "../game";
            var dataToSend = {
                id: id,
                room: room
            };
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.AddPlayer,
                data: dataToSend,
                onSuccess: function (_) { },
                onError: function (error) {
                    AppService.emit(Events.Notify, error);
                    log(LogLevels.ERROR, "Cannot add player to room. Caused by: " + error);
                }
            });
        };
        this.watch();
        this.setUpdateInterval();
    }
    return LobbyService;
}());
export { LobbyService };
