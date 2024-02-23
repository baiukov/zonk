export const showPlayers = (response: Record<string, any>) => {
	const playerList = response.players

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