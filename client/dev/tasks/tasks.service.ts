import { AppService } from '../app.service.js'
import { TaskStatuses } from '../enums/TaskStatuses.enum.js'
import { Events } from '../enums/events.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { Task } from './Task.js'

export class TasksService {

	private taskPool: Array<Task> = []

	public getTask = (config: Record<string, any>) => {
		const task = this.createTask(config)
		AppService.emit(Events.PostTask, task)
	}

	public fetchTask = (data: Record<string, any>) => {
		const taskID = parseInt(data.taskID)
		const response = JSON.stringify(data.data)
		const statusStr = data.status
		const status = Object.values(TaskStatuses).find(status => status === statusStr) as TaskStatuses
		const task: Task | null = this.getTaskByID(taskID)
		if (task) {
			(task as Task).setStatus(status);
			(task as Task).setResponse(response)
		}
		AppService.emit(Events.PostTask, task)
	}

	public createTask = (config: Record<string, any>) => {
		let newID = this.generateTaskID()
		while (this.getTaskByID(newID)) {
			newID = this.generateTaskID()
		}
		const task = new Task(newID, config)
		this.taskPool.push(task)
		log(LogLevels.INFO, "New task has been created: " + task.getID() + " " + task.getEventName() + " " + task.getOriginData())
		return task
	}

	private generateTaskID = () => {
		const max = 99999
		const min = 10000
		return Math.floor(Math.random() * (max - min) + min)
	}

	private getTaskByID = (id: number) => {
		let task: Task | null = null
		this.taskPool.forEach((currentTask: Task) => {
			if (currentTask.getID() === id) {
				task = currentTask
			}
		})
		return task
	}

}