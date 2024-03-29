import { AppService } from '../app.service.js'
import { TaskStatuses } from '../enums/TaskStatuses.enum.js'
import { Events } from '../enums/events.enum.js'
import { Task } from './Task.js'

export class TasksService {

	private taskPool: Array<Task> = []

	public getTask = (config: Record<string, any>) => {
		console.log("cfg", config)
		const task = this.createTask(config)
		AppService.emit(Events.PostTask, task)
	}

	public fetchTask = (data: Record<string, any>) => {
		console.log("maindata", data.status)
		const taskID = parseInt(data.taskID)
		console.log('data', data.data, JSON.stringify(data.data))
		const response = JSON.stringify(data.data)
		const statusStr = data.status
		const status = Object.values(TaskStatuses).find(status => status === statusStr) as TaskStatuses
		console.log(taskID)
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