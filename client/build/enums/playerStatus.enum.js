/**
 *  Dostuné stavy hráčů
 */
export var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus["UNKNOWN"] = "unknown";
    PlayerStatus["UNAUTHORISED"] = "unauthorised";
    PlayerStatus["INLOBBY"] = "inlobby";
    PlayerStatus["INGAME"] = "ingame";
})(PlayerStatus || (PlayerStatus = {}));
