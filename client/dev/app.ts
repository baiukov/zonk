import { AppService } from './app.service.js'
import { LanguageModule } from './language/language.module.js'
import { LoginModule } from './login/login.module.js'

export class App {

	constructor() {
		new AppService()

		new LanguageModule()
		new LoginModule()

	}

}