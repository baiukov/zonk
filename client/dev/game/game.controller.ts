import { GameService } from './game.service.js'

export class GameController {

	private gameService: GameService

	constructor(gameService: GameService) {
		this.gameService = gameService
	}
}