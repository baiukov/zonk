import { LogLevels } from '../enums/logLevels.enum'
import { log } from './log.js'

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

	playerList.forEach((player: Record<string, string>) => {
		const playerLable = player.name.split("|")
		const playerName = playerLable[0]
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

	log(LogLevels.INFO, "Player list has been updated: " + playerList)
}