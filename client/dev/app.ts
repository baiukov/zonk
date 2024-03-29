import { AppService } from './app.service.js'
import { ConnectionModule } from './connection/connection.module.js'
import { GameModule } from './game/game.module.js'
import { LanguageModule } from './language/language.module.js'
import { LobbyModule } from './lobby/lobby.module.js'
import { LoginModule } from './login/login.module.js'
import { NotificationsModule } from './notifications/notifications.module.js'
import { TasksModule } from './tasks/tasks.module.js'

export class App {

	constructor() {
		new AppService()

		new ConnectionModule()
		new LanguageModule()
		new LoginModule()
		new NotificationsModule()
		new LobbyModule()
		new GameModule()
		new TasksModule()
	}

}