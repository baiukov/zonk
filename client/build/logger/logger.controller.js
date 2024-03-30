import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
var LoggerController = /** @class */ (function () {
    function LoggerController(loggerService) {
        var _this = this;
        this.loggerService = loggerService;
        AppService.on(Events.Log, function (data) {
            _this.loggerService.log(data.type, data.message);
        });
    }
    return LoggerController;
}());
export { LoggerController };
