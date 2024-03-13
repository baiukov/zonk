import { ConnectionController } from './connection.controller.js'
import { ConnectionService } from './connection.service.js'

export class ConnectionModule {

	constructor() {
		const connectionService = new ConnectionService()
		new ConnectionController(connectionService)

	}

}