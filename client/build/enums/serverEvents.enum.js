export var ServerEvents;
(function (ServerEvents) {
    ServerEvents["Login"] = "api/login";
    ServerEvents["GetPlayers"] = "api/getPlayers";
    ServerEvents["Check"] = "api/check";
    ServerEvents["GetRoom"] = "api/getRoom";
})(ServerEvents || (ServerEvents = {}));
