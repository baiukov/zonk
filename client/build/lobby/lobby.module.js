import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { LobbyController } from './lobby.controller.js';
import { LobbyService } from './lobby.service.js';
var LobbyModule = /** @class */ (function () {
    function LobbyModule() {
        var lobbyService = new LobbyService();
        new LobbyController(lobbyService);
        log(LogLevels.INFO, "Lobby module has been initialized successfully");
    }
    return LobbyModule;
}());
export { LobbyModule };
