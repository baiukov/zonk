import { LogLevels } from '../enums/logLevels.enum.js'

/*
	Třída LoggerService - je třída služby loggeru, která se zabývá zpracováním logiky logování informací tak, že do konzole vypíše získanou zprávu úpavenou podle patternu, klient ji převezme a zaloguje vlastnimi prostředky
*/
export class LoggerService {

	public log(type: number, message: string) {
		if (type < 0 || type > 4) {
			console.log("Error happened, when tried to log message: " + message + ", with type of logging: #" + type)
			return
		}
		const date = new Date()
		console.log(`%d{${date.getHours}:${date.getMinutes}:${date.getSeconds}.${date.getMilliseconds}} [frontend] ${LogLevels[type]}: ${message}`)
	}

}