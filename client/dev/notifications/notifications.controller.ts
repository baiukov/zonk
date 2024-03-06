import { AppService } from '../app.service.js'
import { Events } from '../enums/Events.enum.js'
import { NotificationsService } from './notifications.service.js'

export class NotificationsController {

	private notificationsService: NotificationsService

	constructor(notificationsService: NotificationsService) {
		this.notificationsService = notificationsService

		AppService.on(Events.Notify, (message: string) => {
			this.notificationsService.show(message)
		})

	}


}