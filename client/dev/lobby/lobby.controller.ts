import { LobbyService } from './lobby.service.js'

export class LobbyController {

	private lobbyService: LobbyService

	constructor(lobbyService: LobbyService) {
		this.lobbyService = lobbyService

	}

}