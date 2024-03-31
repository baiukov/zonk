import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

// metoda pro posílání požadavku o logování do loggeru. Jenom pro zjednodušení syntaxe
export const log = (type: number, message: string) => {
	AppService.emit(Events.Log, { type, message })
}