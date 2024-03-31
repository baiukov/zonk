import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída LanguageController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var LanguageController = /** @class */ (function () {
    function LanguageController(languageService) {
        var _this = this;
        this.languageService = languageService;
        // registrace eventu nastavení nového jazyka stránky
        AppService.on(Events.GetLanguage, function () {
            AppService.emit(Events.PostLanguage, _this.languageService.getLanguage());
        });
    }
    return LanguageController;
}());
export { LanguageController };
