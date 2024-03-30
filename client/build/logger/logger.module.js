import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { LoggerController } from './logger.controller.js';
import { LoggerService } from './logger.service.js';
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
        var loggerService = new LoggerService();
        new LoggerController(loggerService);
        log(LogLevels.INFO, "Logger module has been initialized successfully");
    }
    return LoggerModule;
}());
export { LoggerModule };
