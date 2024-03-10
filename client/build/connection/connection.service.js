import { ConnectionTypes } from '../enums/connectionTypes.enum.js';
import { TaskStatuses } from '../enums/TaskStatuses.enum.js';
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        var _this = this;
        this.getConnectionType = function () { return _this.connectionType; };
        this.setConnectionType = function (type) {
            _this.connectionType = type;
            localStorage.setItem("connectionType", type);
        };
        this.checkConnectionType = function () {
            var savedType = localStorage.getItem("connectionType");
            if (!savedType) {
                _this.connectionType = ConnectionTypes.Rest;
                return;
            }
            _this.connectionType = savedType;
        };
        this.checkIP = function () {
            var storedIP = localStorage.getItem("ip");
            if (!storedIP)
                return;
            ConnectionService.ip = storedIP.replaceAll('"', '');
        };
        this.emitServer = function (config) {
            console.log(_this.connectionType, config);
            switch (_this.connectionType) {
                case ConnectionTypes.Rest:
                    _this.emitRestServer(config);
                    break;
                case ConnectionTypes.WebSockets:
                    _this.emitWebSocket(config);
                    break;
                case ConnectionTypes.Sockets:
                    _this.emitClient(config);
            }
        };
        this.receiveDataFromJava = function (data) {
            var a = $(document.createElement("h1")).text(data);
            $("body").text(data);
            //this.emitClient("Hello, app!")
        };
        this.emitWebSocket = function (config) {
            if (!_this.webSocket || _this.webSocket.CLOSED || _this.webSocket.CLOSING) {
                _this.connectToWebSocket();
            }
            var dataToSend = JSON.stringify(config.data);
            var messageHandler = function (event) {
                var data = event.data;
                if (!data)
                    return;
                var messages = data.split(" ");
                var status = messages[0];
                var response = messages[1];
                if (status === TaskStatuses.Unexecuted)
                    return;
                if (status === TaskStatuses.Successfull) {
                    config.onSuccess(response);
                }
                else {
                    config.onError(response);
                }
                // this.webSocket?.close()
                // this.webSocket = undefined
            };
            var interval = setInterval(function () {
                if (!_this.webSocket)
                    return;
                if (_this.webSocket.CONNECTING || !_this.webSocket.OPEN)
                    return;
                _this.webSocket.send("".concat(config.eventName, " ").concat(dataToSend));
                _this.webSocket.onmessage = messageHandler;
                clearInterval(interval);
            }, 10);
        };
        this.connectToWebSocket = function () {
            _this.webSocket = new WebSocket("ws://".concat(ConnectionService.ip, ":8585/api/websockets"));
        };
        this.emitRestServer = function (config) {
            var str = JSON.stringify(config.data);
            if (!ConnectionService.ip) {
                return;
            }
            $.ajax({
                url: "http://".concat(ConnectionService.ip, ":8080/").concat(config.eventName),
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
        this.checkConnectionType();
        this.checkIP();
        // @ts-ignore
        window.receiveDataFromJava = this.receiveDataFromJava;
        this.emitClient("123");
    }
    ConnectionService.prototype.emitClient = function (a) {
        // @ts-ignore
        window.java.receiveDataFromWebPage(a);
    };
    ConnectionService.setIP = function (ip) {
        ConnectionService.ip = ip;
        localStorage.setItem("ip", ip);
    };
    return ConnectionService;
}());
export { ConnectionService };
