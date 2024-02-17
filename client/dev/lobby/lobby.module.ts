import { LobbyController } from './lobby.controller.js'
import { LobbyService } from './lobby.service.js'

export class LobbyModule {

	constructor() {
		const lobbyService = new LobbyService()
		new LobbyController(lobbyService)
	}

}