import { AppService } from '../app.service.js';
import { Events } from '../enums/Events.enum.js';
var LoginController = /** @class */ (function () {
    function LoginController(loginService) {
        var _this = this;
        this.loginService = loginService;
        AppService.on(Events.PostLanguage, function (language) {
            _this.loginService.setCurrentLanguage(language);
        });
        AppService.on(Events.ClearPlayer, function () {
            _this.loginService.clearPlayer();
        });
    }
    return LoginController;
}());
export { LoginController };
