/*
    Třída LobbyController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var LobbyController = /** @class */ (function () {
    function LobbyController(lobbyService) {
        this.lobbyService = lobbyService;
    }
    return LobbyController;
}());
export { LobbyController };
