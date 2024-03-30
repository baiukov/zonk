import { LogLevels } from '../enums/logLevels.enum.js'

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