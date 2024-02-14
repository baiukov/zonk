import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
var LoginController = /** @class */ (function () {
    function LoginController(loginService) {
        var _this = this;
        this.loginService = loginService;
        AppService.on(Events.PostLanguage, function (language) {
            _this.loginService.setCurrentLanguage(language);
        });
    }
    return LoginController;
}());
export { LoginController };
