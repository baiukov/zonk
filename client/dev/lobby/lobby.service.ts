import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { secToMs } from '../utils/secToMs.js'

export class LobbyService {

	private roomInterval: number | undefined

	constructor() {
		this.setUpdateInterval()
	}

	private setUpdateInterval = () => {
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
				this.showPlayers(JSON.parse(response))
			},
			(error: string) => {
				AppService.emit(Events.Notify, error)
				window.location.href = ""
				localStorage.removeItem("currentPlayer")
			}
		)
	}

	public showPlayers = (response: Record<string, any>) => {
		const playerList = response.players[0]
		const playersView = document.getElementById("playerList") as HTMLElement

		const isPlayerInList = (name: string) => {
			let isIn: boolean = false
			Array.from(playersView.children).forEach((element) => {
				const listPlayerName = $(element).text().split("|")[0]
				if (listPlayerName.trim() == name.trim()) {
					isIn = true
				}
			})
			return isIn
		}

		playerList.forEach((player: Record<string, string>) => {
			if (!isPlayerInList(player.name.split("|")[0])) {
				const listElement = document.createElement("li")
				$(listElement).text(player.name + " | 0")
				playersView?.appendChild(listElement)
			}
		})
	}


}