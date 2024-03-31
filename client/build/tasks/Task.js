import { TaskStatuses } from '../enums/TaskStatuses.enum.js';
/*
    Třída Task - je třída služby entity úkolu posíláného socketovému serveru
*/
var Task = /** @class */ (function () {
    // konstruktor třídy specifikující identifikáční číslo úkolu a nastavující naparsováná vstupní data úkolu
    function Task(id, config) {
        var _this = this;
        // Gettery
        this.getID = function () { return _this.id; };
        this.getStatus = function () { return _this.status; };
        this.getOriginData = function () { return _this.originData; };
        this.getEventName = function () { return _this.eventName; };
        this.getResponse = function () { return _this.responseData; };
        this.getOnError = function () { return _this.onError; };
        this.getOnSuccess = function () { return _this.onSuccess; };
        // Settery
        this.setID = function (id) { _this.id = id; };
        this.setStatus = function (isResolved) { _this.status = isResolved; };
        this.setOriginData = function (originData) { _this.originData = originData; };
        this.setEventName = function (eventName) { _this.eventName = eventName; };
        this.setResponse = function (response) { _this.responseData = response; };
        this.setOnError = function (onError) { _this.onError = onError; };
        this.setOnSucces = function (onSucces) { _this.onSuccess = onSucces; };
        // metoda vytvářející JSON řádek z prvku instaci třídy
        this.toJSONString = function () {
            var json = {
                taskID: _this.id.toString(),
                commandName: _this.eventName,
                status: _this.status,
                data: JSON.stringify(_this.originData),
            };
            return JSON.stringify(json);
        };
        this.id = id;
        this.originData = config.data;
        this.onError = config.onError;
        this.onSuccess = config.onSuccess;
        this.eventName = config.eventName;
        this.responseData = null;
        this.status = TaskStatuses.Unexecuted;
    }
    return Task;
}());
export { Task };
