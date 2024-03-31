import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída LoginController - je třída správce příhlášení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var LoginController = /** @class */ (function () {
    function LoginController(loginService) {
        var _this = this;
        this.loginService = loginService;
        // registrace eventu nastavení jazyka
        AppService.on(Events.PostLanguage, function (language) {
            _this.loginService.setCurrentLanguage(language);
        });
        // registrace eventu vymazání hráče
        AppService.on(Events.ClearPlayer, function () {
            _this.loginService.clearPlayer();
        });
    }
    return LoginController;
}());
export { LoginController };
