import { AppService } from '../app.service.js'

export class LoginService {

	constructor() {
		this.watch()
	}

	private watch = () => {
		$("#go").click(() => {
			const name = $("#name").val()
			const room = $("#room").val()

			const data = {
				"name": name,
				"room": room,
			}

			AppService.emitServer("/api/login", data, () => { console.log("1") }, () => { console.log("2") })
			return false
		})
	}

}