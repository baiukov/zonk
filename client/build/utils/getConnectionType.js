export var getConnectionType = function () {
    var playerStr = localStorage.getItem("connectionType");
    if (!playerStr)
        return null;
    var player = JSON.parse(playerStr);
    var id = player.sessionID;
    return id || null;
};
