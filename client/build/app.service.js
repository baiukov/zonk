var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.events = {};
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
    return AppService;
}());
export { AppService };
