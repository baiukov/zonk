/**
 *  Dostuné typy připojení
 */
export var ConnectionTypes;
(function (ConnectionTypes) {
    // restový typ připojení 
    ConnectionTypes["Rest"] = "Rest";
    // socketový typ připojení
    ConnectionTypes["Sockets"] = "Sockets";
})(ConnectionTypes || (ConnectionTypes = {}));
