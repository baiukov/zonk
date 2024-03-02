import { ConnectionTypes } from '../enums/connectionTypes.enum.js';
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        var _this = this;
        this.connectionType = ConnectionTypes.Rest;
        this.getConnectionType = function () { return _this.connectionType; };
        this.setConnectionType = function (type) {
            _this.connectionType = type;
        };
        this.checkIP = function () {
            var storedIP = localStorage.getItem("ip");
            if (!storedIP)
                return;
            ConnectionService.ip = storedIP.replaceAll('"', '');
        };
        this.emitServer = function (config) {
            switch (_this.connectionType) {
                case ConnectionTypes.Rest:
                    _this.emitRestServer(config);
                    break;
                case ConnectionTypes.WebSockets:
                    console.log(1);
                    _this.emitWebSocket(config);
                    break;
            }
        };
        this.emitWebSocket = function (config) {
            if (!_this.webSocket) {
                _this.connectToWebSocket();
            }
            var dataToSend = JSON.stringify(config.data);
            var interval = setInterval(function () {
                var _a, _b;
                if (!((_a = _this.webSocket) === null || _a === void 0 ? void 0 : _a.OPEN))
                    return;
                (_b = _this.webSocket) === null || _b === void 0 ? void 0 : _b.send(config.eventName + " " + dataToSend);
                clearInterval(interval);
            }, 10);
        };
        this.connectToWebSocket = function () {
            _this.webSocket = new WebSocket("ws://" + ConnectionService.ip + ":8585/api/websockets");
            console.log(_this.webSocket);
        };
        this.emitRestServer = function (config) {
            var str = JSON.stringify(config.data);
            if (!ConnectionService.ip) {
                return;
            }
            $.ajax({
                url: "http://" + ConnectionService.ip + ":8080/" + config.eventName,
                type: "POST",
                data: str,
                contentType: 'application/json',
                success: function (response) {
                    config.onSuccess(response);
                },
                error: function (xhr, status, error) {
                    config.onError(xhr.responseText);
                },
            });
        };
        this.checkIP();
    }
    ConnectionService.setIP = function (ip) {
        ConnectionService.ip = ip;
        localStorage.setItem("ip", ip);
    };
    return ConnectionService;
}());
export { ConnectionService };
