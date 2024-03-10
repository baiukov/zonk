import { AppService } from '../app.service.js';
import { Events } from '../enums/Events.enum.js';
import { ConnectionService } from './connection.service.js';
var ConnectionController = /** @class */ (function () {
    function ConnectionController(connectionService) {
        var _this = this;
        this.connectionService = connectionService;
        AppService.on(Events.SetConnectionType, function (type) {
            _this.connectionService.setConnectionType(type);
        });
        AppService.on(Events.EmitServer, function (config) {
            _this.connectionService.emitServer(config);
        });
        AppService.on(Events.SetIP, function (ip) {
            ConnectionService.setIP(ip);
        });
    }
    return ConnectionController;
}());
export { ConnectionController };
