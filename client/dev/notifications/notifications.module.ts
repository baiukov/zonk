import { NotificationsController } from './notifications.controller.js'
import { NotificationsService } from './notifications.service.js'

export class NotificationsModule {

	constructor() {
		const notificationsService = new NotificationsService()
		new NotificationsController(notificationsService)
	}

}