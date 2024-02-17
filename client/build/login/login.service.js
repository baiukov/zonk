import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { save } from '../utils/save.js';
var LoginService = /** @class */ (function () {
    function LoginService() {
        var _this = this;
        this.currentLanguage = "ENG";
        this.setCurrentLanguage = function (language) { _this.currentLanguage = language; };
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
    }
    return LoginService;
}());
export { LoginService };
