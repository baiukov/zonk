import { AppService } from '../app.service.js';
import { ConnectionTypes } from '../enums/connectionTypes.enum.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { TaskStatuses } from '../enums/TaskStatuses.enum.js';
import { log } from '../utils/log.js';
/*
    Třída ConnectionService - je třída služby připojení ke vzdaleném serverům, která se zabývá zpracováním logiky přesměrování a komunikace
*/
var ConnectionService = /** @class */ (function () {
    // konstruktor třídy, ze kterého vyvolány metody nastavení a přídání metody pro komunikaci s javaFX aplikací
    function ConnectionService() {
        var _this = this;
        // Gettery
        this.getConnectionType = function () { return _this.connectionType; };
        // Settery
        this.setConnectionType = function (type) {
            _this.connectionType = type;
            localStorage.setItem("connectionType", type);
            log(LogLevels.INFO, "Connection has changed to: " + type);
        };
        // metoda pro ověření typu připojení, pokud žádný nebyl uložen, využí standardní REST připojení
        this.checkConnectionType = function () {
            var savedType = localStorage.getItem("connectionType");
            if (!savedType) {
                _this.connectionType = ConnectionTypes.Rest;
                return;
            }
            _this.connectionType = savedType;
        };
        // metoda zjístí, jestli není uložená nějaká IP adresa, pokud je nabidne to uživateli
        this.checkIP = function () {
            var storedIP = localStorage.getItem("ip");
            if (!storedIP)
                return;
            ConnectionService.ip = storedIP.replaceAll('"', '');
        };
        // metoda pro komunikaci serveru(-ů)
        this.emitServer = function (config) {
            switch (_this.connectionType) {
                case ConnectionTypes.Rest:
                    _this.emitRestServer(config);
                    break;
                case ConnectionTypes.Sockets:
                    _this.getTask(config);
                    break;
            }
        };
        // metoda pro vytvoření příkazu, pokud ještě neexistuje
        this.getTask = function (config) {
            AppService.emit(Events.GetTask, config);
        };
        // metoda vyvolána po tom, co kontroller dostane úkol. Pokud předtím neexistoval, pošle ho serveru, jinak zpracuje na frontendu
        this.onPostTask = function (task) {
            if (task.getStatus() === TaskStatuses.Unexecuted) {
                _this.emitSocketServer(task);
            }
            else {
                _this.resolveTask(task);
            }
        };
        // metoda pro posílání zprávy socketovému serveru tak, že přepošle zprávu s úkolem klientovi a ten ji přesměruje na server
        this.emitSocketServer = function (task) {
            // @ts-ignore
            window.cefQuery({ request: task.toJSONString(), onSuccess: function (_) { } });
            log(LogLevels.INFO, "Message to client has been sent. Message: " + task.toJSONString);
        };
        // metoda vyvolána až přijde nějaká zpráva z klientu, který ji dostal od serveru
        this.receiveDataFromJava = function (dataStr) {
            var data = JSON.parse(dataStr);
            log(LogLevels.INFO, "Get message from client. Message: " + dataStr);
            AppService.emit(Events.FetchTask, data);
        };
        // metoda pokusí se překreslit stránku podle nových dat 
        this.resolveTask = function (task) {
            var status = task.getStatus();
            if (!task || status === TaskStatuses.Unexecuted) {
                log(LogLevels.ERROR, "Cannot resolve task properly, because it doesn't exist or unexecuted");
                return;
            }
            var response = task.getResponse();
            if (!response) {
                log(LogLevels.ERROR, "Cannot resolve task properly, because there is no response");
                return;
            }
            if (status === TaskStatuses.Successfull) {
                task.getOnSuccess()(response);
            }
            else {
                task.getOnError()(response);
            }
            log(LogLevels.INFO, "Task " + task.getID + " has been successfully resolved.");
        };
        // metoda pro posílání zprávy restovému serveru
        this.emitRestServer = function (config) {
            var str = JSON.stringify(config.data);
            if (!ConnectionService.ip) {
                return;
            }
            $.ajax({
                url: "http://".concat(ConnectionService.ip, ":8080/").concat(config.eventName),
                type: "POST",
                data: str,
                contentType: 'application/json',
                success: function (response) {
                    config.onSuccess(response);
                },
                error: function (xhr, status, error) {
                    config.onError(xhr.responseText);
                },
            });
        };
        this.checkConnectionType();
        this.checkIP();
        // @ts-ignore
        window.receiveMessageFromJava = this.receiveDataFromJava;
    }
    ConnectionService.setIP = function (ip) {
        ConnectionService.ip = ip;
        localStorage.setItem("ip", ip);
        log(LogLevels.INFO, "IP has changed to: " + ip);
    };
    return ConnectionService;
}());
export { ConnectionService };
