import { LanguageService } from './language.service.js'

export class LanguageController {

	private languageService: LanguageService

	constructor(languageService: LanguageService) {
		this.languageService = languageService
	}

}