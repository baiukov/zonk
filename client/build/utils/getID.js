// metoda pro získání uloženého identifikáčního čísla uživatele
export var getID = function () {
    var playerStr = localStorage.getItem("currentPlayer");
    if (!playerStr)
        return null;
    var player = JSON.parse(playerStr);
    var id = player.sessionID;
    return id || null;
};
