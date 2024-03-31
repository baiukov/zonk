/*
    Třída GameView - je třída pro vytváření přehledu statických prvků stránky hry a nastavení jejich dynamických zpracování událostí
*/
var GameView = /** @class */ (function () {
    function GameView() {
        // metoda pro nastavení viditelných černých teček na bílem čtverečku - kostce
        this.setDiceAmount = function (element, amount) {
            if (amount === 5) {
                var dotsFirst = $("<div class='dots5'></div>");
                var dotsSecond = $("<div class='dots51'></div>");
                var dotsThird = $("<div class='dots5'></div>");
                $(dotsFirst).append($("<div class='dot'></div>"));
                $(dotsFirst).append($("<div class='dot'></div>"));
                $(dotsSecond).append($("<div class='dot'></div>"));
                $(dotsThird).append($("<div class='dot'></div>"));
                $(dotsThird).append($("<div class='dot'></div>"));
                $(element).append(dotsFirst, dotsSecond, dotsThird);
                return;
            }
            var newDots = document.createElement("div");
            $(newDots).addClass("dots" + amount);
            for (var i = 0; i < amount; i++) {
                var dot = document.createElement("div");
                $(dot).addClass("dot");
                $(newDots).append(dot);
            }
            $(element).append(newDots);
        };
        // metoda pro poslouchání údalosti kliknutí na kostku, resp. její výběr
        this.setClickHandler = function (id, selectedDices, isClickable, bannedDices) {
            if ($("clickHandler".concat(id)).length > 0)
                return;
            var clickHandler = document.createElement("div");
            $(clickHandler).addClass("click-handler");
            $(clickHandler).attr("id", "clickHandler" + id);
            if (isClickable && !bannedDices.includes(id)) {
                $(clickHandler).click(function (event) {
                    var idStr = $(event.target).attr("id");
                    var id = parseInt(idStr === null || idStr === void 0 ? void 0 : idStr.charAt(idStr.length - 1));
                    if (!selectedDices.includes(id)) {
                        $("#dice".concat(id)).addClass("selected");
                        selectedDices.push(id);
                    }
                    else {
                        $("#dice".concat(id)).removeClass("selected");
                        selectedDices.splice(selectedDices.indexOf(id), 1);
                    }
                });
            }
            else {
                $(clickHandler).click(function () { });
            }
            $("#dice".concat(id)).append(clickHandler);
        };
    }
    return GameView;
}());
export { GameView };
