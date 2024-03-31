import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { LoggerController } from './logger.controller.js';
import { LoggerService } from './logger.service.js';
/*
    Třída LoggerModule - je třída modulu zpracování loggeru, která se zabývá vytvařením služby a správce loggeru
*/
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
        var loggerService = new LoggerService();
        new LoggerController(loggerService);
        log(LogLevels.INFO, "Logger module has been initialized successfully");
    }
    return LoggerModule;
}());
export { LoggerModule };
