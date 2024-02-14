import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'

export class LoginService {

	private currentLanguage: string = "ENG";

	constructor() {
		this.watch()
	}

	public setCurrentLanguage = (language: string) => { this.currentLanguage = language }

	private watch = () => {
		$("#go").click(() => {
			const name = $("#name").val()
			const room = $("#room").val()
			const ip = $("#ip").val()

			if (!name || !room || !ip) return

			AppService.setIP(ip as string)

			const data = {
				"name": name,
				"room": room,
			}

			AppService.emitServer(
				ServerEvents.Login,
				data,
				() => {
					this.login(data)
				},
				(error: string) => {
					AppService.emit(Events.GetLanguage, null)
					AppService.emit(Events.Notify, languageConfig[this.currentLanguage][error])
				})
			return false
		})
	}

	private login = (data: Object) => {
		sessionStorage.setItem("currentPlayer", JSON.stringify(
			{ data: data }
		))
		window.location.href = "./pages/lobby"
	}


}