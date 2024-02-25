import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'
import { getID } from '../utils/getID.js'
import { secToMs } from '../utils/secToMs.js'
import { showPlayers } from '../utils/showPlayers.js'

export class GameService {

	private diceAnimInterval: number | undefined

	private updateInterval: number | undefined

	private dataIsNotRollingTime: number = 0

	constructor() {

		//this.playDiceAnim(10000, [1, 2, 3, 4, 6])
		this.watch()
		this.watchState()

	}

	private watch = () => {
		$("#roll").click(() => {
			const id = getID()

			this.playDiceAnim(secToMs(5), [])
			AppService.emitServer(
				ServerEvents.Roll,
				{ id: id },
				(_: string) => { },
				(_: string) => { }
			)

		})
	}

	private watchState = () => {
		if (window.location.pathname != "/pages/game/") return

		this.updateInterval = setInterval(() => {

			const id = getID()

			const data = {
				"id": id
			}

			AppService.emitServer(
				ServerEvents.UpdateState,
				data,
				(response: string) => {
					this.update(response)
				},
				(_: string) => {

				}
			)

		}, 100)
	}

	private update = (dataStr: string) => {
		const data = JSON.parse(dataStr)
		if (!data) {
			AppService.emit(Events.Notify, languageConfig.smthWrong)
			return
		}

		$("#totalPoints").text(data.total)
		showPlayers(data)
		$("#goalPoints").text(data.goal)
		if (data.turn) {
			$("#roll").removeAttr("disabled")
		} else {
			$("#roll").attr("disabled")
		}


		if (data.isRolling) {
			$("#roll").attr("disabled", '')
			if (!data.turn && !this.diceAnimInterval) {
				this.playDiceAnim(secToMs(4.9), [])
			}
		}


		if (data.dices) {
			clearInterval(this.diceAnimInterval)
			this.diceAnimInterval = undefined
			this.setDice(data.dices)
		}
	}

	private playDiceAnim = (time: number, correctValues: Array<number>) => {
		let intervalTime = 100
		let timeSpent = 0
		this.diceAnimInterval = setInterval(() => {
			console.log(timeSpent, time)
			if (timeSpent >= time && time != -1) {
				this.setDice(correctValues)
				clearInterval(this.diceAnimInterval)
				return
			}
			if (timeSpent >= intervalTime) {
				intervalTime *= ((time == -1) ? 1 : 1.15)
				console.log(intervalTime)
				const values: Array<number> = []
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