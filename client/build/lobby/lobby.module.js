import { LobbyController } from './lobby.controller.js';
import { LobbyService } from './lobby.service.js';
var LobbyModule = /** @class */ (function () {
    function LobbyModule() {
        var lobbyService = new LobbyService();
        new LobbyController(lobbyService);
    }
    return LobbyModule;
}());
export { LobbyModule };
