import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { getID } from '../utils/getID.js';
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
                AppService.emitServer(ServerEvents.StartGame, data, function (response) {
                    console.log(response);
                    window.location.href = "../game";
                }, function (error) {
                    console.log(error);
                });
                return false;
            });
        };
        this.setUpdateInterval = function () {
            if (window.location.pathname != "/pages/lobby/")
                return;
            _this.roomInterval = setInterval(function () {
                _this.updatePlayerList();
            }, secToMs(0.5));
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
            AppService.emitServer(ServerEvents.GetRoom, { id: id }, function (roomName) {
                _this.getPlayers(roomName);
                _this.setRoom();
            }, function (error) {
                AppService.emit(Events.Notify, error);
                AppService.emit(Events.ClearPlayer, 0);
            });
        };
        this.setRoom = function () {
            if (window.location.pathname != "/pages/lobby/") {
                window.location.href = "./pages/lobby";
            }
        };
        this.getPlayers = function (roomName) {
            var data = {
                room: roomName
            };
            AppService.emitServer(ServerEvents.GetPlayers, data, function (response) {
                showPlayers(JSON.parse(response));
            }, function (error) {
                AppService.emit(Events.Notify, error);
                window.location.href = "";
                localStorage.removeItem("currentPlayer");
            });
        };
        this.watch();
        this.setUpdateInterval();
    }
    return LobbyService;
}());
export { LobbyService };