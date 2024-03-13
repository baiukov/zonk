import { AppService } from '../app.service.js';
import { Events } from '../enums/events.enum.js';
var TasksController = /** @class */ (function () {
    function TasksController(tasksService) {
        var _this = this;
        this.tasksService = tasksService;
        AppService.on(Events.GetTask, function (config) {
            _this.tasksService.createTask(config);
        });
        AppService.on(Events.FetchTask, function (data) {
            _this.tasksService.fetchTask(data);
        });
    }
    return TasksController;
}());
export { TasksController };
