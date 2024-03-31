import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { LanguageController } from './language.controller.js';
import { LanguageService } from './language.service.js';
/*
    Třída LanguageModule - je třída modulu nastavení jazyka, která se zabývá vytvařením služby a správce jazyka
*/
var LanguageModule = /** @class */ (function () {
    function LanguageModule() {
        var languageService = new LanguageService();
        new LanguageController(languageService);
        log(LogLevels.INFO, "Language module has been initialized successfully");
    }
    return LanguageModule;
}());
export { LanguageModule };
