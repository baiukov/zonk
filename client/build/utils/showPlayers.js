export var showPlayers = function (response) {
    var playerList = response.players;
    var playersView = document.getElementById("playerList");
    var isPlayerInList = function (name) {
        var isIn = false;
        Array.from(playersView.children).forEach(function (element) {
            var listPlayerName = $(element).text().split("|")[0];
            if (listPlayerName.trim() == name.trim()) {
                isIn = true;
            }
        });
        return isIn;
    };
    playerList.forEach(function (player) {
        if (!isPlayerInList(player.name.split("|")[0])) {
            var listElement = document.createElement("li");
            $(listElement).text(player.name + " | 0");
            playersView === null || playersView === void 0 ? void 0 : playersView.appendChild(listElement);
        }
    });
};
