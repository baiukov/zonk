import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LoggerService } from './logger.service.js'

export class LoggerController {

	private loggerService: LoggerService

	constructor(loggerService: LoggerService) {
		this.loggerService = loggerService

		AppService.on(Events.Log, (data: { type: number, message: string }) => {
			this.loggerService.log(data.type, data.message)
		})
	}

}