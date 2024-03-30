import { AppService } from '../app.service.js';
import { TaskStatuses } from '../enums/TaskStatuses.enum.js';
import { Events } from '../enums/events.enum.js';
import { LogLevels } from '../enums/logLevels.enum.js';
import { log } from '../utils/log.js';
import { Task } from './Task.js';
var TasksService = /** @class */ (function () {
    function TasksService() {
        var _this = this;
        this.taskPool = [];
        this.getTask = function (config) {
            var task = _this.createTask(config);
            AppService.emit(Events.PostTask, task);
        };
        this.fetchTask = function (data) {
            var taskID = parseInt(data.taskID);
            var response = JSON.stringify(data.data);
            var statusStr = data.status;
            var status = Object.values(TaskStatuses).find(function (status) { return status === statusStr; });
            var task = _this.getTaskByID(taskID);
            if (task) {
                task.setStatus(status);
                task.setResponse(response);
            }
            AppService.emit(Events.PostTask, task);
        };
        this.createTask = function (config) {
            var newID = _this.generateTaskID();
            while (_this.getTaskByID(newID)) {
                newID = _this.generateTaskID();
            }
            var task = new Task(newID, config);
            _this.taskPool.push(task);
            log(LogLevels.INFO, "New task has been created: " + task.getID() + " " + task.getEventName() + " " + task.getOriginData());
            return task;
        };
        this.generateTaskID = function () {
            var max = 99999;
            var min = 10000;
            return Math.floor(Math.random() * (max - min) + min);
        };
        this.getTaskByID = function (id) {
            var task = null;
            _this.taskPool.forEach(function (currentTask) {
                if (currentTask.getID() === id) {
                    task = currentTask;
                }
            });
            return task;
        };
    }
    return TasksService;
}());
export { TasksService };
