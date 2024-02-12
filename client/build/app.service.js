var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.events = {};
    AppService.on = function (eventName, event) {
        Object.defineProperty(AppService.events, eventName, event);
    };
    AppService.emit = function (eventName, data) {
        Object.getOwnPropertyNames(AppService.events).forEach(function (currentEvent) {
            if (eventName != currentEvent)
                return;
            AppService.events[currentEvent](data);
        });
    };
    AppService.emitServer = function (eventName, data, successFunc, errorFunc) {
        $.ajax({
            url: "http://localhost:8080" + eventName,
            data: data,
            success: function (response) {
                successFunc(response);
            },
            error: function (xhr, status, error) {
                errorFunc(xhr.responseText);
            }
        });
    };
    return AppService;
}());
export { AppService };
