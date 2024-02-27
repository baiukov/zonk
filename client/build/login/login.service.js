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
            AppService.emitServer(ServerEvents.Check, { id: getID() }, function (status) {
                console.log(status);
                switch (status) {
                    case PlayerStatus.INGAME:
                        window.location.href = "../pages/game";
                        break;
                    case PlayerStatus.INLOBBY:
                        window.location.href = "/pages/lobby";
                        break;
                }
            }, function (error) {
                console.log("1");
                AppService.emit(Events.Notify, error);
            });
        };
        this.watch = function () {
            $("#go").click(function () {
                var name = $("#name").val();
                var room = $("#room").val();
                var ip = $("#ip").val();
                if (!name || !room || !ip)
                    return;
                AppService.setIP(ip);
                var data = {
                    "name": name,
                    "room": room,
                };
                AppService.emitServer(ServerEvents.Login, data, function (response) {
                    _this.login(response);
                }, function (error) {
                    AppService.emit(Events.GetLanguage, null);
                    AppService.emit(Events.Notify, languageConfig[_this.currentLanguage][error]);
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
