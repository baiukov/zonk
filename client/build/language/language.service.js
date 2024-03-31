import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { languageConfig } from './language.config.js';
/*
    Třída LanguageService - je třída služby jazyka, která se zabývá zpracováním logiky nastavení a initializace řádku na stránce podle jazyka
*/
var LanguageService = /** @class */ (function () {
    // konstruktor třídy, ze po načítání stránky, bude vyvolána metoda nastavení textových prvků podle jazyka
    function LanguageService() {
        var _this = this;
        // nastavení standardního jazyka
        this.language = "ENG";
        // Gettery
        this.getLanguage = function () { return _this.language; };
        // Settery
        this.setLanguage = function (language) { _this.language = language; };
        // metoda nastavení jazykových prvků podle jazyka. Pro všechny řádky z konfiguráčního souboru, zkusí si vyhledat prvken na stránce a vnořit do něj text podle typu prvku
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
