import { TasksController } from './tasks.controller.js'
import { TasksService } from './tasks.service.js'

export class TasksModule {

	constructor() {
		const tasksService = new TasksService()
		new TasksController(tasksService)
	}

}