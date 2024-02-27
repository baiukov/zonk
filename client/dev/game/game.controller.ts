import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { GameService } from './game.service.js'

export class GameController {

	private gameService: GameService

	constructor(gameService: GameService) {
		this.gameService = gameService

		AppService.on(Events.PostLanguage, (newLanguage: string) => {
			this.gameService.currentLanguage = newLanguage
		})
	}
}