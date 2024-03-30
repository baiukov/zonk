import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
export var log = function (type, message) {
    AppService.emit(Events.Log, { type: type, message: message });
};
