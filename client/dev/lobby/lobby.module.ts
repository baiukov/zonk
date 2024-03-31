import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { LobbyController } from './lobby.controller.js'
import { LobbyService } from './lobby.service.js'

/*
	Třída LobbyModule - je třída modulu zpracování mistnosti s hráči, která se zabývá vytvařením služby a správce lobby
*/
export class LobbyModule {

	constructor() {
		const lobbyService = new LobbyService()
		new LobbyController(lobbyService)
		log(LogLevels.INFO, "Lobby module has been initialized successfully")
	}

}