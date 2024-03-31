import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { LoggerController } from './logger.controller.js'
import { LoggerService } from './logger.service.js'

/*
	Třída LoggerModule - je třída modulu zpracování loggeru, která se zabývá vytvařením služby a správce loggeru
*/
export class LoggerModule {

	constructor() {
		const loggerService = new LoggerService()
		new LoggerController(loggerService)
		log(LogLevels.INFO, "Logger module has been initialized successfully")
	}

}