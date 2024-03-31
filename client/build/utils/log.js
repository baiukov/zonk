import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
// metoda pro posílání požadavku o logování do loggeru. Jenom pro zjednodušení syntaxe
export var log = function (type, message) {
    AppService.emit(Events.Log, { type: type, message: message });
};
