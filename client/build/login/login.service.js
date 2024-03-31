import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { PlayerStatus } from '../enums/PlayerStatus.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { log } from '../utils/log.js';
import { save } from '../utils/save.js';
/*
    Třída LoginService - je třída služby příhlášení, která se zabývá zpracováním logiky příhlášení a přidavání nových hráčů do mistností
*/
var LoginService = /** @class */ (function () {
    // konstruktor třídy, ze po načítání stránky, bude vyvolána metoda poslouchání stisknutí tlačitek a ověření stavu hráče, jestli už není ve hře
    function LoginService() {
        var _this = this;
        // uložení aktuálního jazyka
        this.currentLanguage = "ENG";
        // setter jazyka
        this.setCurrentLanguage = function (language) { _this.currentLanguage = language; };
        // metoda ověření stavu hráče, jestli už není ve hře, nebude vyvolána pokud není na hlávní stránce, jinak pošle požadavek o zjištění stavu na server. Podle odpovědí přesměruje hráče
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
        // metoda nastavení tlačítka příhlášení. Ověří, jestli data jsou uvedená správně a pošle požadavek na server o registrace nového hráče a přidaní ho do mistnosti
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
        // metoda pro uložení sessionID, vygenerováného serverem, do lokálního uložiště
        this.login = function (sessionID) {
            var data = {
                sessionID: sessionID
            };
            save(data);
            window.location.href = "./pages/lobby";
            log(LogLevels.INFO, "Player has been logged in and will be redirected to lobby. SessionID: " + sessionID);
        };
        // metoda pro vymazání hráče, resp. dat uživatele jako hráče z lokálního uložiště
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
