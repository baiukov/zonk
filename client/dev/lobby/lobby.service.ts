import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { getID } from '../utils/getID.js'
import { secToMs } from '../utils/secToMs.js'
import { showPlayers } from '../utils/showPlayers.js'

export class LobbyService {

	private roomInterval: number | undefined

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

			AppService.emitServer(
				ServerEvents.StartGame,
				data,
				(response: string) => {

					console.log(response)
					window.location.href = "../game"
				},
				(error: string) => {
					console.log(error)
				})
			return false
		})
	}

	private setUpdateInterval = () => {
		if (window.location.pathname != "/pages/lobby/") return

		this.roomInterval = setInterval(() => {
			this.updatePlayerList()
		}, secToMs(0.5))
	}

	private updatePlayerList = () => {
		const dataStr = localStorage.getItem("currentPlayer")
		if (!dataStr) return

		const data = JSON.parse(dataStr)
		if (!data) return

		const id = data.sessionID
		if (!id) return

		AppService.emitServer(
			ServerEvents.GetRoom,
			{ id: id },
			(roomName: string) => {
				this.getPlayers(roomName)
				this.setRoom()
			},
			(error: string) => {
				AppService.emit(Events.Notify, error)
				AppService.emit(Events.ClearPlayer, 0)
			}
		)
	}

	private setRoom = () => {
		if (window.location.pathname != "/pages/lobby/") {
			window.location.href = "./pages/lobby"
		}
	}

	private getPlayers = (roomName: string) => {
		const data = {
			room: roomName
		}
		AppService.emitServer(
			ServerEvents.GetPlayers,
			data,
			(response: string) => {
				showPlayers(JSON.parse(response))
			},
			(error: string) => {
				AppService.emit(Events.Notify, error)
				window.location.href = ""
				localStorage.removeItem("currentPlayer")
			}
		)
	}


}