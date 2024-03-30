import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
var TasksModule = /** @class */ (function () {
    function TasksModule() {
        var tasksService = new TasksService();
        new TasksController(tasksService);
        log(LogLevels.INFO, "Tasks module has been initialized successfully");
    }
    return TasksModule;
}());
export { TasksModule };
