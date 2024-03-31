import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída NotificationsController - je třída správce notifikací, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var NotificationsController = /** @class */ (function () {
    function NotificationsController(notificationsService) {
        var _this = this;
        this.notificationsService = notificationsService;
        // registrace eventu notifikace
        AppService.on(Events.Notify, function (message) {
            _this.notificationsService.show(message);
        });
    }
    return NotificationsController;
}());
export { NotificationsController };
