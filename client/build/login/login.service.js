import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { PlayerStatus } from '../enums/playerStatus.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
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
                },
                onError: function (error) {
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
                    }
                });
                return false;
            });
        };
        this.login = function (sessionID) {
            var data = {
                sessionID: sessionID
            };
            save(data);
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
export { LoginService };
