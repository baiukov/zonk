import { languageConfig } from './language.config.js';
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        var _this = this;
        this.setLanguage = function (langName) {
            var language = languageConfig[langName];
            Object.keys(language).forEach(function (id) {
                var element = $("#" + id);
                console.log(element);
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
        };
        var defaultLanguage = "ENG";
        document.addEventListener("DOMContentLoaded", function () {
            _this.setLanguage(defaultLanguage);
        });
    }
    return LanguageService;
}());
export { LanguageService };
