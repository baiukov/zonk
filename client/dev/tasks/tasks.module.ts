import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { TasksController } from './tasks.controller.js'
import { TasksService } from './tasks.service.js'

/*
	Třída TasksModule - je třída modulu zpracování úkolů, která se zabývá vytvařením služby a správce úkolů
*/
export class TasksModule {

	constructor() {
		const tasksService = new TasksService()
		new TasksController(tasksService)
		log(LogLevels.INFO, "Tasks module has been initialized successfully")
	}

}