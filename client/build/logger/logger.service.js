import { LogLevels } from '../enums/logLevels.enum.js';
/*
    Třída LoggerService - je třída služby loggeru, která se zabývá zpracováním logiky logování informací tak, že do konzole vypíše získanou zprávu úpavenou podle patternu, klient ji převezme a zaloguje vlastnimi prostředky
*/
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function (type, message) {
        if (type < 0 || type > 4) {
            console.log("Error happened, when tried to log message: " + message + ", with type of logging: #" + type);
            return;
        }
        var date = new Date();
        console.log("%d{".concat(date.getHours, ":").concat(date.getMinutes, ":").concat(date.getSeconds, ".").concat(date.getMilliseconds, "} [frontend] ").concat(LogLevels[type], ": ").concat(message));
    };
    return LoggerService;
}());
export { LoggerService };
