import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LanguageService } from './language.service.js'

export class LanguageController {

	private languageService: LanguageService

	constructor(languageService: LanguageService) {
		this.languageService = languageService

		AppService.on(Events.GetLanguage, () => {
			AppService.emit(Events.PostLanguage, this.languageService.getLanguage())
		})
	}

}