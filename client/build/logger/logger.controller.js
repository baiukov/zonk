import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída LoggerController - je třída správce loggeru, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var LoggerController = /** @class */ (function () {
    function LoggerController(loggerService) {
        var _this = this;
        this.loggerService = loggerService;
        // registrace eventu logování
        AppService.on(Events.Log, function (data) {
            _this.loggerService.log(data.type, data.message);
        });
    }
    return LoggerController;
}());
export { LoggerController };
