import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LanguageService } from './language.service.js'

/*
	Třída LanguageController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class LanguageController {

	// uložení služby jazyka
	private languageService: LanguageService

	constructor(languageService: LanguageService) {
		this.languageService = languageService

		// registrace eventu nastavení nového jazyka stránky
		AppService.on(Events.GetLanguage, () => {
			AppService.emit(Events.PostLanguage, this.languageService.getLanguage())
		})
	}

}