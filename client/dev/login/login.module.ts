import { LoginController } from './login.controller.js'
import { LoginService } from './login.service.js'

export class LoginModule {

	constructor() {
		const loginService = new LoginService()
		new LoginController(loginService)

	}

}