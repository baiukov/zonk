import { AppService } from '../app.service.js';
import { ConnectionTypes } from '../enums/connectionTypes.enum.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { TaskStatuses } from '../enums/TaskStatuses.enum.js';
import { log } from '../utils/log.js';
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        var _this = this;
        this.getConnectionType = function () { return _this.connectionType; };
        this.setConnectionType = function (type) {
            _this.connectionType = type;
            localStorage.setItem("connectionType", type);
            log(LogLevels.INFO, "Connection has changed to: " + type);
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
            switch (_this.connectionType) {
                case ConnectionTypes.Rest:
                    _this.emitRestServer(config);
                    break;
                case ConnectionTypes.Sockets:
                    _this.getTask(config);
                    break;
            }
        };
        this.getTask = function (config) {
            AppService.emit(Events.GetTask, config);
        };
        this.onPostTask = function (task) {
            if (task.getStatus() === TaskStatuses.Unexecuted) {
                _this.emitSocketServer(task);
            }
            else {
                _this.resolveTask(task);
            }
        };
        this.emitSocketServer = function (task) {
            // @ts-ignore
            window.cefQuery({ request: task.toJSONString(), onSuccess: function (_) { } });
            log(LogLevels.INFO, "Message to client has been sent. Message: " + task.toJSONString);
        };
        this.receiveDataFromJava = function (dataStr) {
            var data = JSON.parse(dataStr);
            log(LogLevels.INFO, "Get message from client. Message: " + dataStr);
            AppService.emit(Events.FetchTask, data);
        };
        this.resolveTask = function (task) {
            var status = task.getStatus();
            if (!task || status === TaskStatuses.Unexecuted) {
                log(LogLevels.ERROR, "Cannot resolve task properly, because it doesn't exist or unexecuted");
                return;
            }
            var response = task.getResponse();
            if (!response) {
                log(LogLevels.ERROR, "Cannot resolve task properly, because there is no response");
                return;
            }
            if (status === TaskStatuses.Successfull) {
                task.getOnSuccess()(response);
            }
            else {
                task.getOnError()(response);
            }
            log(LogLevels.INFO, "Task " + task.getID + " has been successfully resolved.");
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
        window.receiveMessageFromJava = this.receiveDataFromJava;
    }
    ConnectionService.setIP = function (ip) {
        ConnectionService.ip = ip;
        localStorage.setItem("ip", ip);
        log(LogLevels.INFO, "IP has changed to: " + ip);
    };
    return ConnectionService;
}());
export { ConnectionService };
