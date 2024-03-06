import { AppService } from '../app.service.js';
import { Events } from '../enums/Events.enum.js';
var LanguageController = /** @class */ (function () {
    function LanguageController(languageService) {
        var _this = this;
        this.languageService = languageService;
        AppService.on(Events.GetLanguage, function () {
            AppService.emit(Events.PostLanguage, _this.languageService.getLanguage());
        });
    }
    return LanguageController;
}());
export { LanguageController };
