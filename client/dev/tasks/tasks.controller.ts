import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { TasksService } from './tasks.service.js'

export class TasksController {

	private tasksService: TasksService

	constructor(tasksService: TasksService) {
		this.tasksService = tasksService

		AppService.on(Events.GetTask, (config: Record<string, any>) => {
			this.tasksService.createTask(config)
		})

		AppService.on(Events.FetchTask, (data: Object) => {
			this.tasksService.fetchTask(data)
		})
	}

}