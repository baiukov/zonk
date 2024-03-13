import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
var NotificationsController = /** @class */ (function () {
    function NotificationsController(notificationsService) {
        var _this = this;
        this.notificationsService = notificationsService;
        AppService.on(Events.Notify, function (message) {
            _this.notificationsService.show(message);
        });
    }
    return NotificationsController;
}());
export { NotificationsController };
