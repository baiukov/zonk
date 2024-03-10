"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var Events;
(function (Events) {
    Events["Notify"] = "ShowNotification";
    Events["GetLanguage"] = "GetLanguage";
    Events["PostLanguage"] = "PostLanguage";
    Events["UpdatePlayerList"] = "UpdatePlayerList";
    Events["ClearPlayer"] = "ClearPlayer";
    Events["SetConnectionType"] = "SetConnectionType";
    Events["SetIP"] = "SetIP";
    Events["EmitServer"] = "EmitServer";
})(Events || (exports.Events = Events = {}));
