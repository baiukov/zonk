import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { GameService } from './game.service.js'

/*
	Třída GameController - je třída správce hry, která se zabývá operováním stránkou her. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class GameController {

	// uložení služby připojení
	private gameService: GameService

	constructor(gameService: GameService) {
		this.gameService = gameService

		// registrace eventu nastavení jazyka
		AppService.on(Events.PostLanguage, (newLanguage: string) => {
			this.gameService.setCurrentLanguage(newLanguage)
		})
	}
}