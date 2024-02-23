import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'
import { getID } from '../utils/getID.js'
import { showPlayers } from '../utils/showPlayers.js'

export class GameService {

	constructor() {

		this.playDiceAnim(10000, [1, 2, 3, 4, 6])
		this.watch()
		this.watchState()

	}

	private watch = () => {

	}

	private watchState = () => {
		if (window.location.pathname != "/pages/game/") return

		const id = getID()

		const data = {
			"id": id
		}
		console.log(data)

		AppService.emitServer(
			ServerEvents.UpdateState,
			data,
			(response: string) => {
				this.update(response)
			},
			(error: string) => {

			}
		)
	}

	private update = (dataStr: string) => {
		const data = JSON.parse(dataStr)
		if (!data) {
			AppService.emit(Events.Notify, languageConfig.smthWrong)
			return
		}

		$("#totalPoints").text(data.total)
		console.log(data.goal, $("#goalPoints"))
		showPlayers(data)
		$("#goalPoints").text(data.goal)
		console.log(data.turn)
		if (data.turn) {
			$("#roll").removeAttr("disabled")
		} else {
			$("#roll").attr("disabled")
		}
	}

	private playDiceAnim = (time: number, correctValues: Array<number>) => {

		let intervalTime = 100
		let timeSpent = 0
		const interval = setInterval(() => {
			if (timeSpent == time) {
				this.setDice(correctValues)
				clearInterval(interval)
				return
			}
			if (timeSpent >= intervalTime) {
				intervalTime *= 1.15
				const values = []
				for (let i = 0; i < 5; i++) {
					values[i] = Math.floor(Math.random() * (6 - 1) + 1)
				}

				this.setDice(values)
			}

			timeSpent += 100
		}, 100)

	}

	private setDice(values: Array<number>) {
		const diceField = $(".dices")
		const dices = diceField.children("div")
		dices.each((i: number) => {
			const dice = dices[i]
			$(dice).empty()
			const dots = values[i]
			if (dots === 5) {
				const dotsFirst = $("<div class='dots5'></div>")
				const dotsSecond = $("<div class='dots5'></div>")
				const dotsThird = $("<div class='dots5'></div>")
				$(dotsFirst).append($("<div class='dot'></div>"))
				$(dotsFirst).append($("<div class='dot'></div>"))
				$(dotsSecond).append($("<div class='dot'></div>"))
				$(dotsThird).append($("<div class='dot'></div>"))
				$(dotsThird).append($("<div class='dot'></div>"))
				$(dice).append(dotsFirst, dotsSecond, dotsThird)
				return
			}
			const newDots = document.createElement("div")
			$(newDots).addClass("dots" + values[i])
			for (let j = 0; j < values[i]; j++) {
				const dot = document.createElement("div")
				$(dot).addClass("dot")
				$(newDots).append(dot)
			}
			$(dice).append(newDots)

		})

	}


}