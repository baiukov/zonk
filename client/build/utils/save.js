"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
var save = function (data) {
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
exports.save = save;
