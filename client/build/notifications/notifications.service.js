"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
var secToMs_js_1 = require("../utils/secToMs.js");
var NotificationsService = /** @class */ (function () {
    function NotificationsService() {
    }
    NotificationsService.prototype.show = function (message) {
        var error = document.createElement("div");
        $(error).hide();
        $(error).addClass("error");
        var errorText = document.createElement("p");
        $(errorText)
            .addClass("error-message")
            .text(message);
        $(error).append(errorText);
        $(error).click(function () { $(error).remove(); });
        $(".error-pane").append(error);
        var unshow = function (elem) {
            $(elem).fadeOut((0, secToMs_js_1.secToMs)(1), function () {
                $(elem).remove();
            });
        };
        var show = function (elem) {
            $(error).fadeIn((0, secToMs_js_1.secToMs)(1), function () {
                setTimeout(function () { unshow(elem); }, (0, secToMs_js_1.secToMs)(10));
            });
        };
        show(error);
    };
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;
