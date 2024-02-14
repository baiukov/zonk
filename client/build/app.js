import { AppService } from './app.service.js';
import { LanguageModule } from './language/language.module.js';
import { LoginModule } from './login/login.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
var App = /** @class */ (function () {
    function App() {
        new AppService();
        new LanguageModule();
        new LoginModule();
        new NotificationsModule();
    }
    return App;
}());
export { App };
