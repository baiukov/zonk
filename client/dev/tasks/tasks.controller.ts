import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { TasksService } from './tasks.service.js'

/*
	Třída TasksController - je třída správce úkoly posíláných na server, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class TasksController {

	// uložení služby úkolu
	private tasksService: TasksService

	constructor(tasksService: TasksService) {
		this.tasksService = tasksService

		// registrace eventu vytváření úkolu
		AppService.on(Events.GetTask, (config: Record<string, any>) => {
			this.tasksService.getTask(config)
		})

		// registrace eventu vyhledání úkolu z aktivního seznamu
		AppService.on(Events.FetchTask, (data: Object) => {
			this.tasksService.fetchTask(data)
		})
	}

}