import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from './log.js'

// metoda pro obnovení seznamů hráčů v levém menu v looby a ve hře, dostane seznam ze serveru a přeparsuje vypíše hráče ve vhodném formátu
export const showPlayers = (response: Record<string, any>) => {
	const playerList = response.players

	const playersView = document.getElementById("playerList") as HTMLElement

	const getPlayerInList = (name: string) => {
		let playerElement: Element | null = null
		Array.from(playersView.children).forEach((element) => {
			const listPlayerName = $(element).text().split("|")[0]
			if (listPlayerName.trim() == name.trim()) {
				playerElement = element
			}
		})
		return playerElement
	}

	const existingPlayers: string[] = []

	playerList.forEach((player: Record<string, string>) => {
		const playerLable = player.name.split("|")
		const playerName = playerLable[0]
		existingPlayers.push(playerName)
		const playerElement = getPlayerInList(playerName)
		const playerPoints = playerElement == null ? 0 : $(playerElement).text().split("|")[1]
		const listElement = document.createElement("li")
		if (!playerElement) {
			$(listElement).text(player.name + " | " + player.totalPoints)
			playersView?.appendChild(listElement)
		} else if (playerPoints != player.totalPoints) {
			$(playerElement).text(player.name + " | " + player.totalPoints)
		}
	})

	$("li").each(function( _ ) {
		const playerInList = $( this ).text().split(" | ")[0];
		log(LogLevels.INFO, "HERE " + playerInList + existingPlayers)
		if (!existingPlayers.includes(playerInList)) {
			$(this).remove()
		}
	})

	log(LogLevels.INFO, "Player list has been updated: " + playerList)
}