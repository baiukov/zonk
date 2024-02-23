import { GameController } from './game.controller.js'
import { GameService } from './game.service.js'

export class GameModule {

	constructor() {
		const gameService = new GameService()
		new GameController(gameService)
	}

}