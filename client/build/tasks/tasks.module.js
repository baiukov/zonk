import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
var TasksModule = /** @class */ (function () {
    function TasksModule() {
        var tasksService = new TasksService();
        new TasksController(tasksService);
    }
    return TasksModule;
}());
export { TasksModule };
