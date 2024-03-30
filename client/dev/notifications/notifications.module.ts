import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { NotificationsController } from './notifications.controller.js'
import { NotificationsService } from './notifications.service.js'

export class NotificationsModule {

	constructor() {
		const notificationsService = new NotificationsService()
		new NotificationsController(notificationsService)
		log(LogLevels.INFO, "Notification module has been initialized successfully")
	}

}