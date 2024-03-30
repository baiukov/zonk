import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { PlayerStatus } from '../enums/PlayerStatus.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'
import { getID } from '../utils/getID.js'
import { log } from '../utils/log.js'
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
					log(LogLevels.INFO, "Player's status is " + status + ", redirecting..")
				},
				onError: (error: string) => {
					log(LogLevels.ERROR, "Cannot check player's status. Caused by: " + error)
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
						log(LogLevels.ERROR, "Cannot procceed in the logging. Caused by: " + error)
					}
				}
			)
			return false
		})
		log(LogLevels.INFO, "Lobby buttons' listeners have been initialized")
	}

	private login = (sessionID: string) => {
		const data = {
			sessionID: sessionID
		}
		save(data)
		window.location.href = "./pages/lobby"
		log(LogLevels.INFO, "Player has been logged in and will be redirected to lobby. SessionID: " + sessionID)
	}

	public clearPlayer = () => {
		window.location.pathname = ""
		localStorage.removeItem("currentPlayer")
		log(LogLevels.WARN, "This player has been removed from the game")
	}

}