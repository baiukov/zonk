import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LoginService } from './login.service.js'

/*
	Třída LoginController - je třída správce příhlášení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class LoginController {

	// uložení služby příhlášení
	private loginService: LoginService

	constructor(loginService: LoginService) {
		this.loginService = loginService

		// registrace eventu nastavení jazyka
		AppService.on(Events.PostLanguage, (language: string) => {
			this.loginService.setCurrentLanguage(language)
		})

		// registrace eventu vymazání hráče
		AppService.on(Events.ClearPlayer, () => {
			this.loginService.clearPlayer()
		})
	}

}