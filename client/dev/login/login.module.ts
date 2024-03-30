import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { LoginController } from './login.controller.js'
import { LoginService } from './login.service.js'

export class LoginModule {

	constructor() {
		const loginService = new LoginService()
		new LoginController(loginService)
		log(LogLevels.INFO, "Login module has been initialized successfully")
	}

}