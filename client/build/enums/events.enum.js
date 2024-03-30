export var Events;
(function (Events) {
    Events["Notify"] = "ShowNotification";
    Events["GetLanguage"] = "GetLanguage";
    Events["PostLanguage"] = "PostLanguage";
    Events["UpdatePlayerList"] = "UpdatePlayerList";
    Events["ClearPlayer"] = "ClearPlayer";
    Events["SetConnectionType"] = "SetConnectionType";
    Events["SetIP"] = "SetIP";
    Events["EmitServer"] = "EmitServer";
    Events["GetTask"] = "GetTask";
    Events["PostTask"] = "PostTask";
    Events["FetchTask"] = "FetchTask";
    Events["Log"] = "Log";
})(Events || (Events = {}));
