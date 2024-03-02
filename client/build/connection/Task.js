import { v4 as uuidv4 } from 'uuid';
var Task = /** @class */ (function () {
    function Task(commandName) {
        this.id = uuidv4();
        console.log(this.id);
        this.commandName = commandName;
    }
    return Task;
}());
export { Task };
