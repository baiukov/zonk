import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { getID } from '../utils/getID.js'
import { log } from '../utils/log.js'
import { secToMs } from '../utils/secToMs.js'
import { showPlayers } from '../utils/showPlayers.js'

export class LobbyService {

	private roomInterval: NodeJS.Timeout | undefined

	constructor() {
		this.watch()
		this.setUpdateInterval()
	}

	private watch = () => {
		$("#start").click(() => {
			const id = getID()
			const points = $("#goal").val()

			if (!id || !points) return

			const data = {
				"id": id,
				"points": points,
			}

			AppService.emit(
				Events.EmitServer,
				{
					eventName: ServerEvents.StartGame,
					data: data,
					onSuccess: (response: string) => {
						window.location.href = "../game"
					},
					onError: (error: string) => {
						log(LogLevels.ERROR, "Cannot start the game. Caused by: " + error)
					}
				}
			)
			return false
		})
		log(LogLevels.INFO, "Lobby buttons' listeners have been initialized")
	}

	private setUpdateInterval = () => {
		if (window.location.pathname != "/pages/lobby/") return
		this.updatePlayerList()

		this.roomInterval = setInterval(() => {
			this.updatePlayerList()
		}, secToMs(0.5))
		log(LogLevels.INFO, "Lobby's interval has been initialized")
	}

	private updatePlayerList = () => {
		const dataStr = localStorage.getItem("currentPlayer")
		if (!dataStr) {
			log(LogLevels.ERROR, "Cannot update player list. Cause by: player's data doesn't exist")
			return
		}

		const data = JSON.parse(dataStr)
		if (!data) {
			log(LogLevels.ERROR, "Cannot update player list. Cause by: player's data cannot be parsed")
			return
		}

		const id = data.sessionID
		if (!id) {
			log(LogLevels.ERROR, "Cannot update player list. Cause by: player doesn't have an sessionID")
			return
		}

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.GetRoom,
				data: { id: id },
				onSuccess: (roomName: string) => {
					this.getPlayers(roomName, id)
					this.setRoom()
				},
				onError: (error: string) => {
					AppService.emit(Events.Notify, error)
					AppService.emit(Events.ClearPlayer, 0)
					log(LogLevels.ERROR, "Cannot update player list. Cause by: player isn't in the room")
				}
			}
		)
	}

	private setRoom = () => {
		if (window.location.pathname != "/pages/lobby/") {
			window.location.href = "./pages/lobby"
		}
		log(LogLevels.INFO, "User was redirected to lobby screen")
	}

	private getPlayers = (roomName: string, id: string) => {
		const data = {
			room: roomName
		}
		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.GetPlayers,
				data: data,
				onSuccess: (response: string) => {
					this.update(response, roomName, id)
				},
				onError: (error: string) => {
					AppService.emit(Events.Notify, error)
					localStorage.removeItem("currentPlayer")
					log(LogLevels.ERROR, "Cannot update player list. Caused by: " + error)
					window.location.href = ""
				}
			}
		)
	}

	private update = (dataStr: string, room: string, id: string) => {
		const data = JSON.parse(dataStr)
		showPlayers(data)
		if (!data.isInGame) return
		window.location.href = "../game"

		const dataToSend = {
			id: id,
			room: room
		}

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.AddPlayer,
				data: dataToSend,
				onSuccess: (_: string) => { },
				onError: (error: string) => {
					AppService.emit(Events.Notify, error)
					log(LogLevels.ERROR, "Cannot add player to room. Caused by: " + error)
				}
			}
		)

	}

}