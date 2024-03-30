import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { languageConfig } from './language.config.js';
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        var _this = this;
        this.language = "ENG";
        this.getLanguage = function () { return _this.language; };
        this.setLanguage = function (language) { _this.language = language; };
        this.update = function (langName) {
            var language = languageConfig[langName];
            Object.keys(language).forEach(function (id) {
                var element = $("#" + id);
                if (!element)
                    return;
                var text = language[id];
                switch (element.prop("nodeName")) {
                    case "INPUT":
                        $(element).attr("placeholder", text);
                        break;
                    default:
                        $(element).text(text);
                }
            });
            log(LogLevels.INFO, "Language " + _this.language + " has been initialized");
        };
        document.addEventListener("DOMContentLoaded", function () {
            _this.update(_this.language);
        });
    }
    return LanguageService;
}());
export { LanguageService };
