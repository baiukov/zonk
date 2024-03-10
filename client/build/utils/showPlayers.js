export var showPlayers = function (response) {
    var playerList = response.players;
    var playersView = document.getElementById("playerList");
    var getPlayerInList = function (name) {
        var playerElement = null;
        Array.from(playersView.children).forEach(function (element) {
            var listPlayerName = $(element).text().split("|")[0];
            if (listPlayerName.trim() == name.trim()) {
                playerElement = element;
            }
        });
        return playerElement;
    };
    playerList.forEach(function (player) {
        var playerLable = player.name.split("|");
        var playerName = playerLable[0];
        var playerElement = getPlayerInList(playerName);
        var playerPoints = playerElement == null ? 0 : $(playerElement).text().split("|")[1];
        var listElement = document.createElement("li");
        if (!playerElement) {
            $(listElement).text(player.name + " | " + player.totalPoints);
            playersView === null || playersView === void 0 ? void 0 : playersView.appendChild(listElement);
        }
        else if (playerPoints != player.totalPoints) {
            console.log(playerPoints, player.totalPoints);
            $(playerElement).text(player.name + " | " + player.totalPoints);
        }
    });
};
