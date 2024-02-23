export const getID = () => {
	const playerStr = localStorage.getItem("currentPlayer")
	if (!playerStr) return null
	const player = JSON.parse(playerStr)
	const id = player.sessionID
	return id || null
}