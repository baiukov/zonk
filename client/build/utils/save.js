import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from './log.js';
// metoda pro úkládání dat uživatele do lokálního úložiště
export var save = function (data) {
    var dataStr = localStorage.getItem("currentPlayer");
    var currentData = {};
    if (dataStr) {
        currentData = JSON.parse(dataStr);
    }
    if (currentData) {
        Object.assign(currentData, data);
    }
    localStorage.setItem("currentPlayer", JSON.stringify(currentData));
    log(LogLevels.INFO, "Data saved to local storage " + currentData);
};
