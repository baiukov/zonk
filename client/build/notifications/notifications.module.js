import { NotificationsController } from './notifications.controller.js';
import { NotificationsService } from './notifications.service.js';
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
        var notificationsService = new NotificationsService();
        new NotificationsController(notificationsService);
    }
    return NotificationsModule;
}());
export { NotificationsModule };
