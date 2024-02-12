import { LoginService } from './login.service.js'

export class LoginController {

	private loginService: LoginService

	constructor(loginService: LoginService) {
		this.loginService = loginService
	}

}