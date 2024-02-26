import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { secToMs } from '../utils/secToMs.js';
import { showPlayers } from '../utils/showPlayers.js';
var GameService = /** @class */ (function () {
    function GameService() {
        var _this = this;
        this.dataIsNotRollingTime = 0;
        this.watch = function () {
            $("#roll").click(function () {
                _this.playDiceAnim(secToMs(5), []);
                var id = getID();
                AppService.emitServer(ServerEvents.Roll, { id: id }, function (_) { }, function (_) { });
            });
        };
        this.watchState = function () {
            if (window.location.pathname != "/pages/game/")
                return;
            _this.updateInterval = setInterval(function () {
                var id = getID();
                var data = {
                    "id": id
                };
                AppService.emitServer(ServerEvents.UpdateState, data, function (response) {
                    _this.update(response);
                }, function (_) {
                });
            }, 100);
        };
        this.update = function (dataStr) {
            var data = JSON.parse(dataStr);
            if (!data) {
                AppService.emit(Events.Notify, languageConfig.smthWrong);
                return;
            }
            $("#totalPoints").text(data.total);
            showPlayers(data);
            $("#goalPoints").text(data.goal);
            if (data.turn) {
                $("#roll").removeAttr("disabled");
            }
            else {
                $("#roll").attr("disabled");
            }
            if (data.isRolling) {
                $("#roll").attr("disabled", '');
                if (!data.turn && !_this.diceAnimInterval) {
                    _this.playDiceAnim(secToMs(4.9), []);
                }
            }
            if (data.dices) {
                clearInterval(_this.diceAnimInterval);
                _this.diceAnimInterval = undefined;
                _this.setDice(data.dices);
            }
        };
        this.playDiceAnim = function (time, correctValues) {
            var intervalTime = 100;
            var timeSpent = 0;
            _this.diceAnimInterval = setInterval(function () {
                console.log(timeSpent, time);
                if (timeSpent >= time && time != -1) {
                    _this.setDice(correctValues);
                    clearInterval(_this.diceAnimInterval);
                    return;
                }
                if (timeSpent >= intervalTime) {
                    intervalTime *= ((time == -1) ? 1 : 1.15);
                    var values = [];
                    for (var i = 0; i < 6; i++) {
                        values[i] = Math.floor(Math.random() * (6 - 1) + 1);
                    }
                    _this.setDice(values);
                }
                timeSpent += 100;
            }, 100);
        };
        //this.playDiceAnim(10000, [1, 2, 3, 4, 6])
        this.watch();
        this.watchState();
    }
    GameService.prototype.setDice = function (values) {
        var diceField = $(".dices");
        var dices = diceField.children("div");
        dices.each(function (i) {
            var dice = dices[i];
            $(dice).empty();
            var dots = values[i];
            if (dots === 5) {
                var dotsFirst = $("<div class='dots5'></div>");
                var dotsSecond = $("<div class='dots5'></div>");
                var dotsThird = $("<div class='dots5'></div>");
                $(dotsFirst).append($("<div class='dot'></div>"));
                $(dotsFirst).append($("<div class='dot'></div>"));
                $(dotsSecond).append($("<div class='dot'></div>"));
                $(dotsThird).append($("<div class='dot'></div>"));
                $(dotsThird).append($("<div class='dot'></div>"));
                $(dice).append(dotsFirst, dotsSecond, dotsThird);
                return;
            }
            var newDots = document.createElement("div");
            $(newDots).addClass("dots" + values[i]);
            for (var j = 0; j < values[i]; j++) {
                var dot = document.createElement("div");
                $(dot).addClass("dot");
                $(newDots).append(dot);
            }
            $(dice).append(newDots);
        });
    };
    return GameService;
}());
export { GameService };
