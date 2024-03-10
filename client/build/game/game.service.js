import { AppService } from '../app.service.js';
import { Events } from '../enums/Events.enum.js';
import { GameStatuses } from '../enums/GameStatuses.enum.js';
import { ServerEvents } from '../enums/ServerEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { secToMs } from '../utils/secToMs.js';
import { showPlayers } from '../utils/showPlayers.js';
import { GameView } from './game.view.js';
var GameService = /** @class */ (function () {
    function GameService() {
        var _this = this;
        this.currentLanguage = "ENG";
        this.view = new GameView();
        this.intervals = {
            diceAnimInterval: null,
            numberAnimInterval: null
        };
        this.selectedDices = [];
        this.bannedDices = [];
        this.setCurrentLanguage = function (language) {
            _this.currentLanguage = language;
        };
        this.watch = function () {
            $("#roll").click(_this.roll);
            $("#reroll").click(_this.checkCombination);
            $("#submitRoll").click(_this.submitRoll);
        };
        this.submitRoll = function () {
            var id = getID();
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.SubmitRoll,
                data: { id: id },
                onSuccess: function (_) {
                    _this.selectedDices = [];
                    _this.bannedDices = [];
                },
                onError: function (_) { }
            });
            return false;
        };
        this.checkCombination = function () {
            if (_this.selectedDices.length === 0) {
                AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].pickOne);
                return;
            }
            var id = getID();
            var chosenDices = {};
            for (var i = 0; i < _this.selectedDices.length; i++) {
                var diceID = _this.selectedDices[i];
                chosenDices[diceID] = _this.getDiceAmount(diceID);
            }
            var data = {
                id: id,
                chosenDices: chosenDices
            };
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.CheckCombination,
                data: data,
                onSuccess: function (response) {
                    if (JSON.parse(response).result) {
                        _this.reroll(data);
                    }
                    else {
                        AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].wrongCombination);
                    }
                },
                onError: function (message) {
                    AppService.emit(Events.Notify, message);
                    return false;
                }
            });
            return false;
        };
        this.reroll = function (data) {
            $(".click-handler").click(function () { return false; });
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.Reroll,
                data: data,
                onSuccess: function (_) {
                    for (var i = 0; i < 6; i++) {
                        if (_this.selectedDices.includes(i))
                            continue;
                        _this.playDiceAnim(i, secToMs(5), Math.round(Math.random() * 5 + 1));
                    }
                },
                onError: function (_) {
                }
            });
            return false;
        };
        this.getDiceAmount = function (diceID) {
            var allDices = $(".dice");
            var amount = 0;
            allDices.each(function (i) {
                var dice = allDices[i];
                var diceIDStr = $(dice).attr("id");
                if (!diceIDStr)
                    return undefined;
                var currentDiceID = parseInt(diceIDStr[diceIDStr.length - 1]);
                if (currentDiceID !== diceID)
                    return undefined;
                var diceChildren = $(dice).children("div");
                var dots = diceChildren[0];
                var dotsAmountStr = $(dots).attr("class");
                if (!dotsAmountStr)
                    return undefined;
                var dotsAmount = parseInt(dotsAmountStr[dotsAmountStr.length - 1]);
                amount = dotsAmount;
            });
            return amount;
        };
        this.roll = function () {
            for (var i = 0; i < 6; i++) {
                if (_this.selectedDices.includes(i))
                    continue;
                _this.playDiceAnim(i, secToMs(5), Math.round(Math.random() * 5 + 1));
            }
            var id = getID();
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.Roll,
                data: { id: id },
                onSuccess: function (_) { },
                onError: function (_) { }
            });
            return false;
        };
        this.watchUpdate = function () {
            if (window.location.pathname != "/pages/game/")
                return;
            setInterval(function () {
                var id = getID();
                AppService.emit(Events.EmitServer, {
                    eventName: ServerEvents.UpdateState,
                    data: { id: id },
                    onSuccess: function (response) {
                        _this.update(response);
                    },
                    onError: function (error) {
                        AppService.emit(Events.Notify, error);
                        window.location.href = "../lobby";
                    }
                });
            }, 100);
        };
        this.update = function (dataStr) {
            var data = JSON.parse(dataStr);
            if (!data) {
                AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].smthWrong);
                return;
            }
            var status = data.status;
            var isTurn = data.turn;
            _this.checkTurn(isTurn, status);
            _this.setPoints($("#totalPoints"), data.total);
            _this.setPoints($("#goalPoints"), data.goal);
            showPlayers(data);
            _this.setDicesForNotTurn(status, isTurn, data.bannedDices);
            _this.updateDices(data.dices, status, data.bannedDices);
            _this.setCurrentPoints(data.currentPoints);
            _this.checkButtonsVisibilty(status, isTurn);
            _this.selectedUpdate();
            _this.checkWin(data.winner, data.turn);
        };
        this.checkWin = function (winner, turn) {
            if (!winner)
                return;
            $(".win").show();
            $("#winner").text(winner);
            setTimeout(function () {
                if (!turn) {
                    window.location.href = "../lobby";
                    return;
                }
                AppService.emit(Events.EmitServer, {
                    eventName: ServerEvents.CloseGame,
                    data: { id: getID() },
                    onSuccess: function (_) {
                        window.location.href = "../lobby";
                    },
                    onError: function (error) {
                        AppService.emit(Events.Notify, error);
                    }
                });
            }, secToMs(10));
        };
        this.selectedUpdate = function () {
            for (var i = 0; i < 6; i++) {
                var element = $("#dice".concat(i));
                if (_this.selectedDices.includes(i)) {
                    if ($(element).hasClass('selected'))
                        return;
                    $(element).addClass('selected');
                    return;
                }
                $(element).removeClass('selected');
            }
        };
        this.checkButtonsVisibilty = function (status, turn) {
            if (turn && status != GameStatuses.PENDING) {
                $("#roll").show();
                $("#roll").removeAttr("disabled");
            }
            else {
                $("#roll").attr("disabled");
            }
            if (status != GameStatuses.PENDING || !turn) {
                $("#reroll").hide();
                $("#submitRoll").hide();
                $("#roll").show();
            }
            if (status === GameStatuses.PENDING && turn && !$("#reroll").is(":visible")) {
                $("#roll").hide();
                $("#submitRoll").show();
                $("#reroll").show();
            }
            if (status === GameStatuses.ROLLING) {
                $("#roll").attr("disabled", '');
            }
        };
        this.setCurrentPoints = function (currentPoints) {
            var element = $("#currentPoints");
            if (parseInt($(element).text()) === currentPoints || _this.intervals.numberAnimInterval)
                return;
            _this.playNumbersAnim(element, parseInt($(element).text()) || 0, currentPoints);
        };
        this.updateDices = function (dices, status, dataBannedDices) {
            var bannedDices = [];
            for (var i = 0; i < dataBannedDices.length; i++) {
                if (dataBannedDices[i] == 0)
                    continue;
                bannedDices.push(i);
            }
            if (!dices || status == GameStatuses.ROLLING)
                return;
            for (var i = 0; i < dices.length; i++) {
                _this.setDice(i, dices[i], !bannedDices.includes(i));
            }
            bannedDices.forEach(function (dice) {
                if (_this.selectedDices.includes(dice))
                    return;
                _this.selectedDices.push(dice);
            });
        };
        this.setPoints = function (element, points) {
            var currentPoints = parseInt(element.text());
            if (currentPoints === points)
                return;
            element.text(points);
        };
        this.checkTurn = function (turn, status) {
            if (turn || status != GameStatuses.ROLLING || _this.intervals.diceAnimInterval)
                return;
            for (var i = 0; i < 6; i++) {
                _this.playDiceAnim(i, secToMs(5.2), 1);
            }
        };
        this.setDicesForNotTurn = function (status, turn, bannedDices) {
            if (status != GameStatuses.ROLLING)
                return;
            if (turn)
                return;
            $("#roll").attr("disabled", '');
            var dicesToRoll = [0, 1, 2, 3, 4, 5];
            if (bannedDices) {
                for (var i = 0; i < bannedDices.length; i++) {
                    dicesToRoll.splice(dicesToRoll.indexOf(bannedDices[i]), 1);
                }
            }
            dicesToRoll.forEach(function (dice) {
                _this.playDiceAnim(dice, 5, 1);
            });
        };
        this.init = function () {
            $("#roll").hide();
            $("#reroll").hide();
            $("#submitRoll").hide();
            for (var i = 0; i < 6; i++) {
                _this.setDice(i, i + 1, true);
            }
        };
        this.playDiceAnim = function (diceID, time, correctValue) {
            var nextTimeToSwitch = time * 0.01;
            var currentTime = 0;
            var interval = setInterval(function () {
                _this.intervals.diceAnimInterval = interval;
                if (currentTime >= nextTimeToSwitch) {
                    var randomDice = Math.round(Math.random() * 5 + 1);
                    _this.setDice(diceID, randomDice, false);
                    nextTimeToSwitch *= 1.15;
                }
                if (currentTime >= time) {
                    _this.setDice(diceID, correctValue, true);
                    _this.intervals.diceAnimInterval = null;
                    clearInterval(interval);
                    return;
                }
                currentTime += 50;
            }, 50);
        };
        this.setDice = function (diceID, amount, isClickable) {
            var diceField = $(".dices");
            var dices = diceField.children("div");
            var setDiceToChild = function (i) {
                var currentDice = dices[i];
                var currentDiceStr = $(currentDice).attr("id");
                if (!currentDiceStr) {
                    return;
                }
                var currentDiceID = currentDiceStr[currentDiceStr.length - 1];
                if (parseInt(currentDiceID) != diceID)
                    return;
                var diceChildren = $(currentDice).children("div");
                if (!diceChildren)
                    return;
                var diceFirstChild = diceChildren[0];
                var diceFirstChildIDStr = $(diceFirstChild).attr("class");
                if (diceFirstChildIDStr) {
                    var diceFirstChildAmount = diceFirstChildIDStr[diceFirstChildIDStr.length - 1];
                    if (parseInt(diceFirstChildAmount) === amount)
                        return;
                }
                $(currentDice).empty();
                _this.view.setDiceAmount(currentDice, amount);
                _this.view.setClickHandler(parseInt(currentDiceID), _this.selectedDices, isClickable, _this.bannedDices);
            };
            dices.each(function (i) {
                setDiceToChild(i);
            });
        };
        this.init();
        this.watch();
        this.watchUpdate();
    }
    GameService.prototype.playNumbersAnim = function (element, start, stop) {
        var _this = this;
        if (start === 0 && stop === 0) {
            $(element).text(0);
            return;
        }
        var interval = 10;
        var difference = Math.abs(start - stop);
        var temp = start > stop ? stop : start;
        this.intervals.numberAnimInterval = setInterval(function () {
            if ((temp >= stop && start <= stop) || (temp <= stop && start >= stop)) {
                clearInterval(_this.intervals.numberAnimInterval || undefined);
                _this.intervals.numberAnimInterval = null;
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
    return GameService;
}());
export { GameService };
