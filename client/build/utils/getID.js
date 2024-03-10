"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getID = void 0;
var getID = function () {
    var playerStr = localStorage.getItem("currentPlayer");
    if (!playerStr)
        return null;
    var player = JSON.parse(playerStr);
    var id = player.sessionID;
    return id || null;
};
exports.getID = getID;
