import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

export const log = (type: number, message: string) => {
	AppService.emit(Events.Log, { type, message })
}