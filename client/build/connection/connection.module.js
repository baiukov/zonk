import { ConnectionController } from './connection.controller.js';
import { ConnectionService } from './connection.service.js';
var ConnectionModule = /** @class */ (function () {
    function ConnectionModule() {
        var connectionService = new ConnectionService();
        new ConnectionController(connectionService);
    }
    return ConnectionModule;
}());
export { ConnectionModule };
