import { secToMs } from '../utils/secToMs.js';
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
            $(elem).fadeOut(secToMs(1), function () {
                $(elem).remove();
            });
        };
        var show = function (elem) {
            $(error).fadeIn(secToMs(1), function () {
                setTimeout(function () { unshow(elem); }, secToMs(10));
            });
        };
        show(error);
    };
    return NotificationsService;
}());
export { NotificationsService };
