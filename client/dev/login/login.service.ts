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

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.Check,
				data: { id: getID() },
				onSuccess: (status: string) => {
					switch (status) {
						case PlayerStatus.INGAME:
							window.location.href = "../pages/game"
							break
						case PlayerStatus.INLOBBY:
							window.location.href = "/pages/lobby"
							break
					}
				},
				onError: (error: string) => {
					console.log("1")
					AppService.emit(Events.Notify, error)
				}
			}
		)
	}

	private watch = () => {
		$("#go").click(() => {
			const name = $("#name").val()
			const room = $("#room").val()
			const ip = $("#ip").val()
			const connection = $("#connection").val()

			if (!name || !room || !ip || !connection) return

			AppService.emit(Events.SetIP, ip as string)

			AppService.emit(Events.SetConnectionType, connection)

			const data = {
				"name": name,
				"room": room,
			}

			AppService.emit(
				Events.EmitServer,
				{
					eventName: ServerEvents.Login,
					data: data,
					onSuccess: (response: string) => {
						this.login(response)
					},
					onError: (error: string) => {
						AppService.emit(Events.GetLanguage, null)
						AppService.emit(Events.Notify, languageConfig[this.currentLanguage][error])
					}
				}
			)
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