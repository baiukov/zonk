import { AppService } from '../app.service.js';
var LoginService = /** @class */ (function () {
    function LoginService() {
        this.watch = function () {
            $("#go").click(function () {
                var name = $("#name").val();
                var room = $("#room").val();
                var data = {
                    "name": name,
                    "room": room,
                };
                AppService.emitServer("/api/login", data, function () { console.log("1"); }, function () { console.log("2"); });
                return false;
            });
        };
        this.watch();
    }
    return LoginService;
}());
export { LoginService };
