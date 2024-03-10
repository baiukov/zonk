import { LoginController } from './login.controller.js';
import { LoginService } from './login.service.js';
var LoginModule = /** @class */ (function () {
    function LoginModule() {
        var loginService = new LoginService();
        new LoginController(loginService);
    }
    return LoginModule;
}());
export { LoginModule };
