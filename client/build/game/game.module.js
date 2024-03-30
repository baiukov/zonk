import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { GameController } from './game.controller.js';
import { GameService } from './game.service.js';
var GameModule = /** @class */ (function () {
    function GameModule() {
        var gameService = new GameService();
        new GameController(gameService);
        log(LogLevels.INFO, "Game module has been initialized successfully");
    }
    return GameModule;
}());
export { GameModule };
