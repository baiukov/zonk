import { LanguageController } from './language.controller.js'
import { LanguageService } from './language.service.js'

export class LanguageModule {

	constructor() {
		const languageService = new LanguageService()
		new LanguageController(languageService)

	}

}