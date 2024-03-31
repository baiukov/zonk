import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { LoginController } from './login.controller.js';
import { LoginService } from './login.service.js';
/*
    Třída LoginModule - je třída modulu zpracování příhlášení, která se zabývá vytvařením služby a správce příhlášení
*/
var LoginModule = /** @class */ (function () {
    function LoginModule() {
        var loginService = new LoginService();
        new LoginController(loginService);
        log(LogLevels.INFO, "Login module has been initialized successfully");
    }
    return LoginModule;
}());
export { LoginModule };
