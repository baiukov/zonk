import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { LanguageController } from './language.controller.js'
import { LanguageService } from './language.service.js'

export class LanguageModule {

	constructor() {
		const languageService = new LanguageService()
		new LanguageController(languageService)
		log(LogLevels.INFO, "Language module has been initialized successfully")
	}

}