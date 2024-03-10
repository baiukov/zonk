import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
var GameController = /** @class */ (function () {
    function GameController(gameService) {
        var _this = this;
        this.gameService = gameService;
        AppService.on(Events.PostLanguage, function (newLanguage) {
            _this.gameService.setCurrentLanguage(newLanguage);
        });
    }
    return GameController;
}());
export { GameController };
