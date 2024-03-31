import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
import { GameStatuses } from '../enums/gameStatuses.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { ServerEvents } from '../enums/serverEvents.enum.js';
import { languageConfig } from '../language/language.config.js';
import { getID } from '../utils/getID.js';
import { log } from '../utils/log.js';
import { secToMs } from '../utils/secToMs.js';
import { showPlayers } from '../utils/showPlayers.js';
import { GameView } from './game.view.js';
/*
    Třída GameService - je třída služby hry, která se zabývá zpracováním logiky akce, které se provadějí během hry
*/
var GameService = /** @class */ (function () {
    // konstruktor třídy, který vyvolá potřebné pro initializaci metody
    function GameService() {
        var _this = this;
        // uložení aktuálního jazyka
        this.currentLanguage = "ENG";
        // vytvoření a uložení instance view hry
        this.view = new GameView();
        // uložení probíhajících intervalů
        this.intervals = {
            diceAnimInterval: null,
            numberAnimInterval: null
        };
        // uložení seznamů vybraných kostek
        this.selectedDices = [];
        // uložení seznamů zablokovaných kostek
        this.bannedDices = [];
        // metoda pro nastavení aktuálního jazyka
        this.setCurrentLanguage = function (language) {
            _this.currentLanguage = language;
        };
        // metoda pro nastavení poslouchače kliknutí tlačitek
        this.watch = function () {
            $("#roll").click(_this.roll);
            $("#reroll").click(_this.checkCombination);
            $("#submitRoll").click(_this.submitRoll);
            log(LogLevels.INFO, "Game buttons' listeners have been initialized");
        };
        // metoda potvrzení výsledku kola po hazení kostek, pošle požadavek o to na server
        this.submitRoll = function () {
            var id = getID();
            AppService.emit(Events.EmitServer, {
                eventName: ServerEvents.SubmitRoll,
                data: { id: id },
                onSuccess: function (_) {
                    _this.selectedDices = [];
                    _this.bannedDices = [];
                    log(LogLevels.INFO, "The roll has been submited");
                },
                onError: function (error) {
                    log(LogLevels.ERROR, "Cannot submit roll. Caused by: " + error);
                }
            });
            return false;
        };
        // metoda ověření kombinací, vybraných hráčem, po ověření, že je vybrán aspoň jedena kostka, pošle požadavek o ověření na server
        this.checkCombination = function () {
            if (_this.selectedDices.length === 0) {
                log(LogLevels.WARN, "Cannot check combination. Caused by: none of dice are picked");
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
                        log(LogLevels.WARN, "Cannot reroll. Caused by: wrong combination");
                        AppService.emit(Events.Notify, languageConfig[_this.currentLanguage].wrongCombination);
                    }
                },
                onError: function (error) {
                    log(LogLevels.ERROR, "Cannot reroll. Caused by: " + error);
                    AppService.emit(Events.Notify, error);
                    return false;
                }
            });
            return false;
        };
        // metoda pro přehození kostek, pošle požadavek na server
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
                    log(LogLevels.INFO, "Player has rerolled successfully.");
                },
                onError: function (error) {
                    log(LogLevels.ERROR, "Cannot reroll. Caused by: " + error);
                }
            });
            return false;
        };
        // metoda pro žískání počtu bodů na kostce
        this.getDiceAmount = function (diceID) {
            var allDices = $(".dice");
            var amount = 0;
            allDices.each(function (i) {
                var dice = allDices[i];
                var diceIDStr = $(dice).attr("id");
                if (!diceIDStr) {
                    return undefined;
                }
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
        // metoda pro hazení kostkami, pošle požadavek na server
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
                onSuccess: function (_) {
                    log(LogLevels.INFO, "Player has rolled successfully");
                },
                onError: function (error) {
                    log(LogLevels.ERROR, "Cannot roll. Caused by: " + error);
                }
            });
            return false;
        };
        // metoda pro obnovení stránky hry pro hráče, nastavuje se interval pro posílání požadavků na server s dotazem na aktuální stav
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
                        log(LogLevels.ERROR, "Cannot update player list. Caused by: " + error);
                        AppService.emit(Events.Notify, error);
                        window.location.href = "../lobby";
                    }
                });
            }, 100);
        };
        // metoda pro obnovení prvků stránky hry po získání nových dat o aktuálním stavu
        this.update = function (dataStr) {
            var data = JSON.parse(dataStr);
            if (!data) {
                log(LogLevels.ERROR, "Cannot update game state. Caused by: no data");
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
        // metoda pro ověření, jestli už není vítěž, pokud je, tak se zobrazí okno s jménem vítěze a pošle požadavek o ukončení hry
        this.checkWin = function (winner, turn) {
            if (!winner)
                return;
            $(".win").show();
            $("#winner").text(winner);
            log(LogLevels.INFO, "Game has been finished. Winner: " + winner);
            setTimeout(function () {
                if (!turn) {
                    window.location.href = "../lobby";
                    return;
                }
                AppService.emit(Events.EmitServer, {
                    eventName: ServerEvents.CloseGame,
                    data: { id: getID() },
                    onSuccess: function (_) {
                        log(LogLevels.INFO, "Game has been closed successfully");
                        window.location.href = "../lobby";
                    },
                    onError: function (error) {
                        log(LogLevels.ERROR, "Cannot close game. Caused by: " + error);
                        AppService.emit(Events.Notify, error);
                    }
                });
            }, secToMs(10));
        };
        // metoda pro obnovení vybraných kostek
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
        // metoda pro ověření viditelnosti tlačitek správy kola
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
        // metoda pro nastavení aktuálního počtu bodů za kolo
        this.setCurrentPoints = function (currentPoints) {
            var element = $("#currentPoints");
            if (parseInt($(element).text()) === currentPoints || _this.intervals.numberAnimInterval) {
                return;
            }
            _this.playNumbersAnim(element, parseInt($(element).text()) || 0, currentPoints);
            log(LogLevels.INFO, "Current points have been updated. New amount: " + currentPoints);
        };
        // metoda pro obnovení zablokovaných kostek
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
        // metoda pro obnovení celkového scóre, pokud se počet změnil
        this.setPoints = function (element, points) {
            var currentPoints = parseInt(element.text());
            if (currentPoints === points)
                return;
            element.text(points);
        };
        // metoda pro ověření, jestli hráč teď hraje
        this.checkTurn = function (turn, status) {
            if (turn || status != GameStatuses.ROLLING || _this.intervals.diceAnimInterval)
                return;
            for (var i = 0; i < 6; i++) {
                _this.playDiceAnim(i, secToMs(5.2), 1);
            }
        };
        // metoda pro nastavení kostek pro nehrající hráče
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
        // metoda pro initializaci poslouchačů tlačítek a kostek na desce
        this.init = function () {
            $("#roll").hide();
            $("#reroll").hide();
            $("#submitRoll").hide();
            for (var i = 0; i < 6; i++) {
                _this.setDice(i, i + 1, true);
            }
        };
        // metoda přehrávání animaci při hazení kostek
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
        // metoda pro nastavení počtu bodů na kostce a jestli je možné ji výbrat
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
    // metoda pro přehrávání animaci čísel
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
