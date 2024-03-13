import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { secToMs } from '../utils/secToMs.js';
import { showPlayers } from '../utils/showPlayers.js';
var GameService1 = /** @class */ (function () {
    function GameService1() {
        var _this = this;
        this.dataIsNotRollingTime = 0;
        this.selectedDices = [false, false, false, false, false, false];
        this.currentLanguage = "ENG";
        this.dices = [];
        this.watch = function () {
            $("#roll").click(function () {
                _this.selectedDices = [false, false, false, false, false, false];
                _this.playDiceAnim(secToMs(5), [], [0, 1, 2, 3, 4, 5]);
                var id = getID();
                AppService.emitServer(ServerEvents.Roll, { id: id }, function (_) { }, function (_) { });
                return false;
            });
            $("#submitRoll").click(function () {
                var id = getID();
                AppService.emitServer(ServerEvents.SubmitRoll, { id: id }, function (_) { }, function (_) { });
                return false;
            });
            $("#reroll").click(function () {
                var isAllFalse = true;
                _this.selectedDices.forEach(function (dice) {
                    if (!dice)
                        return;
                    isAllFalse = false;
                });
                if (isAllFalse) {
                    AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].pickOne);
                    return;
                }
                var id = getID();
                var chosenDices = {};
                var unchosenDices = [];
                for (var i = 0; i < _this.selectedDices.length; i++) {
                    if (!_this.selectedDices[i]) {
                        unchosenDices.push(_this.dices[i - 1]);
                        continue;
                    }
                    chosenDices[i] = _this.dices[i - 1];
                }
                var data = {
                    id: id,
                    chosenDices: chosenDices
                };
                var dicesToRoll = [];
                for (var i = 0; i < _this.selectedDices.length; i++) {
                    if (!_this.selectedDices[i])
                        dicesToRoll.push(i);
                }
                console.log(dicesToRoll);
                _this.playDiceAnim(secToMs(5), [], dicesToRoll);
                AppService.emitServer(ServerEvents.Reroll, data, function (_) { }, function (_) {
                    console.log(_);
                });
                return false;
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
                AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].smthWrong);
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
                    _this.playDiceAnim(secToMs(4.9), [], [0, 1, 2, 3, 4, 5]);
                }
            }
            if (data.dices) {
                _this.dices = data.dices;
                clearInterval(_this.diceAnimInterval);
                _this.diceAnimInterval = undefined;
                _this.setDice(data.dices);
            }
            var element = $("#currentPoints");
            if (parseInt($(element).text()) != data.currentPoints && !_this.numberInterval) {
                _this.playNumbersAnim(element, parseInt($(element).text()) || 0, data.currentPoints);
            }
            if (!data.isPending || !data.turn) {
                $("#reroll").hide();
                $("#submitRoll").hide();
                $("#roll").show();
            }
            console.log();
            if (data.isPending && data.turn && !$("#reroll").is(":visible")) {
                $("#roll").hide();
                $("#submitRoll").show();
                $("#reroll").show();
            }
        };
        this.playDiceAnim = function (time, correctValues, rollingDices) {
            var intervalTime = 100;
            var timeSpent = 0;
            console.log("here", rollingDices);
            _this.diceAnimInterval = setInterval(function () {
                if (timeSpent >= time && time != -1) {
                    _this.setDice(correctValues);
                    clearInterval(_this.diceAnimInterval);
                    return;
                }
                if (timeSpent >= intervalTime) {
                    intervalTime *= ((time == -1) ? 1 : 1.15);
                    var values = [];
                    for (var i = 0; i < 6; i++) {
                        if (rollingDices.includes(i)) {
                            values[i] = Math.floor(Math.random() * (6 - 1) + 1);
                        }
                        else {
                            values[i] = correctValues[i];
                        }
                    }
                    _this.setDice(values);
                }
                timeSpent += 100;
            }, 100);
        };
        this.setDice([1, 2, 3, 4, 5, 6]);
        this.watch();
        this.watchState();
        $("#submitRoll").hide();
        $("#reroll").hide();
    }
    GameService1.prototype.setDice = function (values) {
        var _this = this;
        var diceField = $(".dices");
        var dices = diceField.children("div");
        dices.each(function (i) {
            var dice = dices[i];
            var doesExist = false;
            var diceChildren = $(dice).children("div");
            var dots = values[i];
            diceChildren.each(function (index) {
                var _a;
                var element = diceChildren[index];
                if (!((_a = $(element).attr("class")) === null || _a === void 0 ? void 0 : _a.startsWith("dots")))
                    return;
                var dotsIndexStr = $(element).attr("class");
                var dotsIndex = parseInt(dotsIndexStr.charAt(dotsIndexStr.length - 1));
                if (dotsIndex == dots) {
                    doesExist = true;
                }
            });
            if (doesExist)
                return;
            $(dice).empty();
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
        var _loop_1 = function (i) {
            $("#dice" + i).ready(function () {
                if ($("#clickHandler" + i).length > 0)
                    return;
                var clickHandler = document.createElement("div");
                $(clickHandler).addClass("click-handler");
                $(clickHandler).attr("id", "clickHandler" + i);
                $(clickHandler).click(function (event) {
                    var idStr = $(event.target).attr("id");
                    var id = parseInt(idStr === null || idStr === void 0 ? void 0 : idStr.charAt(idStr.length - 1));
                    if (!_this.selectedDices[id]) {
                        $("#dice" + id).addClass("selected");
                    }
                    else {
                        $("#dice" + id).removeClass("selected");
                    }
                    _this.selectedDices[id] = !_this.selectedDices[id];
                });
                $("#dice" + i).append(clickHandler);
            });
        };
        for (var i = 1; i <= 6; i++) {
            _loop_1(i);
        }
    };
    GameService1.prototype.playNumbersAnim = function (element, start, stop) {
        var _this = this;
        if (start === 0 && stop === 0) {
            $(element).text(0);
            return;
        }
        var interval = 10;
        var difference = Math.abs(start - stop);
        var temp = start > stop ? stop : start;
        this.numberInterval = setInterval(function () {
            if ((temp >= stop && start <= stop) || (temp <= stop && start >= stop)) {
                clearInterval(_this.numberInterval);
                _this.numberInterval = undefined;
                $(element).text(stop.toFixed(0));
                return;
            }
            if (start < stop) {
                temp += difference * 0.01;
            }
            else {
                temp -= difference * 0.01;
            }
            $(element).text(temp.toFixed(0));
        }, interval);
    };
    return GameService1;
}());
export { GameService1 };
