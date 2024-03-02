import { AppService } from '../app.service.js'
import { ConnectionTypes } from '../enums/connectionTypes.enum.js'
import { Events } from '../enums/events.enum.js'
import { ConnectionService } from './connection.service.js'

export class ConnectionController {

	private connectionService: ConnectionService

	constructor(connectionService: ConnectionService) {
		this.connectionService = connectionService

		AppService.on(Events.SetConnectionType, (type: ConnectionTypes) => {
			this.connectionService.setConnectionType(type)
		})

		AppService.on(Events.EmitServer, (config: Record<string, any>) => {
			this.connectionService.emitServer(config)
		})

		AppService.on(Events.SetIP, (ip: string) => {
			ConnectionService.setIP(ip)
		})

	}

}