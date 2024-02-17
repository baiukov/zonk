import { AppService } from './app.service.js'
import { LanguageModule } from './language/language.module.js'
import { LobbyModule } from './lobby/lobby.module.js'
import { LoginModule } from './login/login.module.js'
import { NotificationsModule } from './notifications/notifications.module.js'

export class App {

	constructor() {
		new AppService()

		new LanguageModule()
		new LoginModule()
		new NotificationsModule()
		new LobbyModule()

	}

}