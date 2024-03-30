import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { PlayerStatus } from '../enums/PlayerStatus.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { log } from '../utils/log.js';
import { save } from '../utils/save.js';
var LoginService = /** @class */ (function () {
    function LoginService() {
        var _this = this;
        this.currentLanguage = "ENG";
        this.setCurrentLanguage = function (language) { _this.currentLanguage = language; };
        this.checkPlayer = function () {
            if (window.location.pathname != "/")
                return;
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.Check,
                data: { id: getID() },
                onSuccess: function (status) {
                    switch (status) {
                        case PlayerStatus.INGAME:
                            window.location.href = "../pages/game";
                            break;
                        case PlayerStatus.INLOBBY:
                            window.location.href = "/pages/lobby";
                            break;
                    }
                    log(LogLevels.INFO, "Player's status is " + status + ", redirecting..");
                },
                onError: function (error) {
                    log(LogLevels.ERROR, "Cannot check player's status. Caused by: " + error);
                    AppService.emit(Events.Notify, error);
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
                AppService.emit(Events.SetIP, ip);
                AppService.emit(Events.SetConnectionType, connection);
                var data = {
                    "name": name,
                    "room": room,
                };
                AppService.emit(Events.EmitServer, {
                    eventName: ServerEvents.Login,
                    data: data,
                    onSuccess: function (response) {
                        _this.login(response);
                    },
                    onError: function (error) {
                        AppService.emit(Events.GetLanguage, null);
                        AppService.emit(Events.Notify, languageConfig[_this.currentLanguage][error]);
                        log(LogLevels.ERROR, "Cannot procceed in the logging. Caused by: " + error);
                    }
                });
                return false;
            });
            log(LogLevels.INFO, "Lobby buttons' listeners have been initialized");
        };
        this.login = function (sessionID) {
            var data = {
                sessionID: sessionID
            };
            save(data);
            window.location.href = "./pages/lobby";
            log(LogLevels.INFO, "Player has been logged in and will be redirected to lobby. SessionID: " + sessionID);
        };
        this.clearPlayer = function () {
            window.location.pathname = "";
            localStorage.removeItem("currentPlayer");
            log(LogLevels.WARN, "This player has been removed from the game");
        };
        this.watch();
        this.checkPlayer();
    }
    return LoginService;
}());
export { LoginService };
