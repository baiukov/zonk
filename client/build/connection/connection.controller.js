import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ConnectionService } from './connection.service.js';
/*
    Třída ConnectionController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var ConnectionController = /** @class */ (function () {
    function ConnectionController(connectionService) {
        var _this = this;
        this.connectionService = connectionService;
        // registrace eventu nastavení typu připojení
        AppService.on(Events.SetConnectionType, function (type) {
            _this.connectionService.setConnectionType(type);
        });
        // registrace eventu pro posílání zprávy na nějaký server
        AppService.on(Events.EmitServer, function (config) {
            _this.connectionService.emitServer(config);
        });
        // registrace eventu nastavení ip adresy
        AppService.on(Events.SetIP, function (ip) {
            ConnectionService.setIP(ip);
        });
        // registrace eventu, který je vyvolán po nalezení úkolu
        AppService.on(Events.PostTask, function (task) {
            _this.connectionService.onPostTask(task);
        });
    }
    return ConnectionController;
}());
export { ConnectionController };
