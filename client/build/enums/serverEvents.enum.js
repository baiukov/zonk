export var ServerEvents;
(function (ServerEvents) {
    ServerEvents["Login"] = "api/login";
    ServerEvents["GetPlayers"] = "api/getPlayers";
    ServerEvents["Check"] = "api/check";
    ServerEvents["GetRoom"] = "api/getRoom";
    ServerEvents["StartGame"] = "api/createGame";
    ServerEvents["UpdateState"] = "api/getState";
    ServerEvents["AddPlayer"] = "api/addPlayer";
    ServerEvents["Roll"] = "api/roll";
})(ServerEvents || (ServerEvents = {}));
