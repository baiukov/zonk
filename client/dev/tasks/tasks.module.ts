import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { TasksController } from './tasks.controller.js'
import { TasksService } from './tasks.service.js'

export class TasksModule {

	constructor() {
		const tasksService = new TasksService()
		new TasksController(tasksService)
		log(LogLevels.INFO, "Tasks module has been initialized successfully")
	}

}