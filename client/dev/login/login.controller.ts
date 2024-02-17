import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LoginService } from './login.service.js'

export class LoginController {

	private loginService: LoginService

	constructor(loginService: LoginService) {
		this.loginService = loginService

		AppService.on(Events.PostLanguage, (language: string) => {
			this.loginService.setCurrentLanguage(language)
		})

		AppService.on(Events.ClearPlayer, () => {
			this.loginService.clearPlayer()
		})
	}

}