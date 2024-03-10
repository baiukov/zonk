import { LanguageController } from './language.controller.js';
import { LanguageService } from './language.service.js';
var LanguageModule = /** @class */ (function () {
    function LanguageModule() {
        var languageService = new LanguageService();
        new LanguageController(languageService);
    }
    return LanguageModule;
}());
export { LanguageModule };
