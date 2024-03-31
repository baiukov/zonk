/*
    Třída AppService - je třída služby aplikace, která se zabývá zpracováním logiky registrace a vyvolání eventu tak, že při jejich registraci uloží je do seznamu a po vyvolání v tom seznamu vyhledá a vyvolá metodu
*/
var AppService = /** @class */ (function () {
    function AppService() {
    }
    // uložení seznamu eventů
    AppService.events = {};
    // metoda pro registrace eventu
    AppService.on = function (eventName, event) {
        AppService.events[eventName] = event;
    };
    // metoda pro vyvolání některého z eventu, vyhledá ho v seznamu, pokud najde vyvolá příslušnou metodu
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
