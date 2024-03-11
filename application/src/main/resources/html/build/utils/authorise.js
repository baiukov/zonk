import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
export var authorise = function () {
    var dataStr = sessionStorage.getItem("currentPlayer") || "{}";
    var data = JSON.parse(dataStr);
    var room = data.room;
    var name = data.name;
    var points = data.points || 0;
    var dataToSend = {
        "room": room,
        "name": name,
        "points": points
    };
    AppService.emitServer(ServerEvents.Check, dataToSend, function () { }, function (message) {
        AppService.emit(Events.Notify, message);
        //window.location.href = "../../"
    });
};
