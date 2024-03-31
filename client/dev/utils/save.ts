import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from './log.js'

// metoda pro úkládání dat uživatele do lokálního úložiště
export const save = (data: Record<any, any>) => {
	const dataStr = localStorage.getItem("currentPlayer")
	let currentData: Object = {}
	if (dataStr) {
		currentData = JSON.parse(dataStr)
	}
	if (currentData) {
		Object.assign(currentData, data)
	}
	localStorage.setItem("currentPlayer", JSON.stringify(currentData))
	log(LogLevels.INFO, "Data saved to local storage " + currentData)
}