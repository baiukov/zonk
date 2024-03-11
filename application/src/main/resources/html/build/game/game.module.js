import { GameController } from './game.controller.js';
import { GameService } from './game.service.js';
var GameModule = /** @class */ (function () {
    function GameModule() {
        var gameService = new GameService();
        new GameController(gameService);
    }
    return GameModule;
}());
export { GameModule };
