import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída GameController - je třída správce hry, která se zabývá operováním stránkou her. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var GameController = /** @class */ (function () {
    function GameController(gameService) {
        var _this = this;
        this.gameService = gameService;
        // registrace eventu nastavení jazyka
        AppService.on(Events.PostLanguage, function (newLanguage) {
            _this.gameService.setCurrentLanguage(newLanguage);
        });
    }
    return GameController;
}());
export { GameController };
