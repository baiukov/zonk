export const save = (data: Record<any, any>) => {
	const dataStr = localStorage.getItem("curretPlayer")
	let currentData: Object = {}
	if (dataStr) {
		currentData = JSON.parse(dataStr)
	}
	if (currentData) {
		Object.assign(currentData, data)
	}
	localStorage.setItem("currentPlayer", JSON.stringify(currentData))

}