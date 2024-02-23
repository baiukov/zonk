import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { PlayerStatus } from '../enums/playerStatus.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'
import { getID } from '../utils/getID.js'
import { save } from '../utils/save.js'

export class LoginService {

	private currentLanguage: string = "ENG";

	constructor() {
		this.watch()
		this.checkPlayer()
	}

	public setCurrentLanguage = (language: string) => { this.currentLanguage = language }

	private checkPlayer = () => {
		if (window.location.pathname != "/") return

		console.log("1")
		AppService.emitServer(
			ServerEvents.Check,
			{ id: getID() },
			(status: string) => {
				console.log(status)
				switch (status) {
					case PlayerStatus.INGAME:
						window.location.href = "../pages/game"
						break
					case PlayerStatus.INLOBBY:
						window.location.href = "/pages/lobby"
						break
				}
			},
			(error: string) => {
				console.log("1")
				AppService.emit(Events.Notify, error)
			}
		)
	}

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
				(response: string) => {
					this.login(response)
				},
				(error: string) => {
					AppService.emit(Events.GetLanguage, null)
					AppService.emit(Events.Notify, languageConfig[this.currentLanguage][error])
				})
			return false
		})

	}

	private login = (sessionID: string) => {
		const data = {
			sessionID: sessionID
		}
		save(data)
		window.location.href = "./pages/lobby"
	}

	public clearPlayer = () => {
		window.location.pathname = ""
		localStorage.removeItem("currentPlayer")
	}

}