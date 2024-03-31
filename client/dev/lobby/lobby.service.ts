import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { getID } from '../utils/getID.js'
import { log } from '../utils/log.js'
import { secToMs } from '../utils/secToMs.js'
import { showPlayers } from '../utils/showPlayers.js'

/*
	Třída LobbyService - je třída služby lobby, která se zabývá zpracováním logiky mistnosti, do které se hráči připojí, než se hra nastartuje a může ji úpravovat
*/
export class LobbyService {

	// konstruktor třídy, ze po načítání stránky, bude vyvolána metoda obnovení seznamů hráčů a poslouchání stisknutí tlačitek
	constructor() {
		this.watch()
		this.setUpdateInterval()
	}

	// metoda pro poslouchání stisnutí tlačitka nastartování hry, až bude stisnuté jedním z hráčů, ověří jestli cíl hry uveden správně a spustí ji, reps. pošle požadavek o spuštění na server
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

	// metoda nastavující obnovení seznamů hráčů, pokud uživatel není na této stránce, nebude spuštěna
	private setUpdateInterval = () => {
		if (window.location.pathname != "/pages/lobby/") return
		this.updatePlayerList()

		setInterval(() => {
			this.updatePlayerList()
		}, secToMs(0.5))
		log(LogLevels.INFO, "Lobby's interval has been initialized")
	}

	// metoda obnovení seznamů hráčů, pošle požadavek název mistnosti na server, jako data předá identifikáční číslo uživatele v této mistnosti
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

	// metoda pro přesměrování uživatele do stránky mistnosti
	private setRoom = () => {
		if (window.location.pathname != "/pages/lobby/") {
			window.location.href = "./pages/lobby"
		}
		log(LogLevels.INFO, "User was redirected to lobby screen")
	}

	// metoda obnovení dotazu seznamů hráčů, pošle požadavek o seznam na server, jako data předá název mistnosti. Pokud se nastane chyba, vrátí hráče na hlávní stránku
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

	// metoda pro viditelné obnovení seznamu hráčů. Až dostane seznam ze serveru, obnoví seznam hračů, jinak přidá nového hráče k mistnosti, resp. pošle požadavek o to
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