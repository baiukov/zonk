import { LobbyService } from './lobby.service.js'


/*
	Třída LobbyController - je třída správce připojení, která se zabývá operováním eventů. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class LobbyController {

	private lobbyService: LobbyService

	constructor(lobbyService: LobbyService) {
		this.lobbyService = lobbyService
	}

}