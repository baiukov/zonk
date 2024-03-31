import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LoggerService } from './logger.service.js'

/*
	Třída LoggerController - je třída správce loggeru, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class LoggerController {

	private loggerService: LoggerService

	constructor(loggerService: LoggerService) {
		this.loggerService = loggerService

		// registrace eventu logování
		AppService.on(Events.Log, (data: { type: number, message: string }) => {
			this.loggerService.log(data.type, data.message)
		})
	}

}