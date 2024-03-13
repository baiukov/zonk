export var save = function (data) {
    var dataStr = localStorage.getItem("curretPlayer");
    var currentData = {};
    if (dataStr) {
        currentData = JSON.parse(dataStr);
    }
    if (currentData) {
        Object.assign(currentData, data);
    }
    localStorage.setItem("currentPlayer", JSON.stringify(currentData));
};
