import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { ConnectionController } from './connection.controller.js'
import { ConnectionService } from './connection.service.js'

/*
	Třída ConnectionModule - je třída modulu komunikací, která se zabývá vytvařením služby a správce připojení
*/
export class ConnectionModule {

	constructor() {
		const connectionService = new ConnectionService()
		new ConnectionController(connectionService)
		log(LogLevels.INFO, "Connection module has been initialized successfully")
	}

}