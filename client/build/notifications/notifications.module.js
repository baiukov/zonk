import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { NotificationsController } from './notifications.controller.js';
import { NotificationsService } from './notifications.service.js';
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
        var notificationsService = new NotificationsService();
        new NotificationsController(notificationsService);
        log(LogLevels.INFO, "Notification module has been initialized successfully");
    }
    return NotificationsModule;
}());
export { NotificationsModule };
