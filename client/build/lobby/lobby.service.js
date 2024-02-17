import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { secToMs } from '../utils/secToMs.js';
var LobbyService = /** @class */ (function () {
    function LobbyService() {
        var _this = this;
        this.setUpdateInterval = function () {
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
                _this.showPlayers(JSON.parse(response));
            }, function (error) {
                AppService.emit(Events.Notify, error);
                window.location.href = "";
                localStorage.removeItem("currentPlayer");
            });
        };
        this.showPlayers = function (response) {
            var playerList = response.players[0];
            var playersView = document.getElementById("playerList");
            var isPlayerInList = function (name) {
                var isIn = false;
                Array.from(playersView.children).forEach(function (element) {
                    var listPlayerName = $(element).text().split("|")[0];
                    if (listPlayerName.trim() == name.trim()) {
                        isIn = true;
                    }
                });
                return isIn;
            };
            playerList.forEach(function (player) {
                if (!isPlayerInList(player.name.split("|")[0])) {
                    var listElement = document.createElement("li");
                    $(listElement).text(player.name + " | 0");
                    playersView === null || playersView === void 0 ? void 0 : playersView.appendChild(listElement);
                }
            });
        };
        this.setUpdateInterval();
    }
    return LobbyService;
}());
export { LobbyService };
