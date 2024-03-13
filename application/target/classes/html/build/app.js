import { AppService } from './app.service.js';
import { ConnectionModule } from './connection/connection.module.js';
import { GameModule } from './game/game.module.js';
import { LanguageModule } from './language/language.module.js';
import { LobbyModule } from './lobby/lobby.module.js';
import { LoginModule } from './login/login.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
var App = /** @class */ (function () {
    function App() {
        new AppService();
        new LanguageModule();
        new ConnectionModule();
        new LoginModule();
        new NotificationsModule();
        new LobbyModule();
        new GameModule();
    }
    return App;
}());
export { App };
