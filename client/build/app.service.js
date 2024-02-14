var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.events = {};
    AppService.setIP = function (ip) { AppService.ip = ip; };
    AppService.on = function (eventName, event) {
        AppService.events[eventName] = event;
    };
    AppService.emit = function (eventName, data) {
        Object.getOwnPropertyNames(AppService.events).forEach(function (currentEvent) {
            if (eventName != currentEvent)
                return;
            AppService.events[currentEvent](data);
        });
    };
    AppService.emitServer = function (eventName, data, successFunc, errorFunc) {
        var str = JSON.stringify(data);
        console.log(str);
        $.ajax({
            url: "http://" + AppService.ip + ":8080/" + eventName,
            type: "POST",
            data: str,
            contentType: 'application/json',
            success: function (response) {
                successFunc(response);
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText, status, error);
                errorFunc(xhr.responseText);
            },
        });
    };
    return AppService;
}());
export { AppService };
