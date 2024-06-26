/**
 *  Dostuné názvy příkazu/koncových bodů na serveru
 */
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
    ServerEvents["SubmitRoll"] = "api/submitRoll";
    ServerEvents["Reroll"] = "api/reroll";
    ServerEvents["CheckCombination"] = "api/checkCombination";
    ServerEvents["CloseGame"] = "api/closeGame";
})(ServerEvents || (ServerEvents = {}));
