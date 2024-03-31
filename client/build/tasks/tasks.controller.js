import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
/*
    Třída TasksController - je třída správce úkoly posíláných na server, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
var TasksController = /** @class */ (function () {
    function TasksController(tasksService) {
        var _this = this;
        this.tasksService = tasksService;
        // registrace eventu vytváření úkolu
        AppService.on(Events.GetTask, function (config) {
            _this.tasksService.getTask(config);
        });
        // registrace eventu vyhledání úkolu z aktivního seznamu
        AppService.on(Events.FetchTask, function (data) {
            _this.tasksService.fetchTask(data);
        });
    }
    return TasksController;
}());
export { TasksController };
