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

	private selectedDices: Array<boolean> = [false, false, false, false, false, false]

	private numberInterval: number | undefined

	public currentLanguage = "ENG"

	constructor() {

		//this.playDiceAnim(10000, [1, 2, 3, 4, 6])
		this.setDice([1, 2, 3, 4, 5, 6])
		this.watch()
		this.watchState()

	}

	private watch = () => {
		$("#roll").click(() => {
			this.playDiceAnim(secToMs(5), [])

			const id = getID()

			AppService.emitServer(
				ServerEvents.Roll,
				{ id: id },
				(_: string) => { },
				(_: string) => { }
			)
			return false
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
			AppService.emit(Events.Notify, languageConfig[this.currentLanguage].smthWrong)
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

		const element = $("#currentPoints") as unknown as HTMLElement
		if (parseInt($(element).text()) != data.currentPoints && !this.numberInterval) {
			this.playNumbersAnim(
				element,
				parseInt($(element).text()) || 0,
				data.currentPoints,
			)
		}

		if (!data.isPending || !data.turn) {
			$("#roll").text(languageConfig[this.currentLanguage].roll)
			$("#reroll").remove()
		}


		if (data.isPending && data.turn && $("#reroll").length <= 0) {
			$("#roll").text(languageConfig[this.currentLanguage].enough)
			const reroll = document.createElement("button")
			$(reroll).attr("type", "submit")
				.addClass("reroll")
				.attr("id", "reroll")
				.text(languageConfig[this.currentLanguage].reroll)
			$(".submits").append(reroll)
		}
	}

	private playDiceAnim = (time: number, correctValues: Array<number>) => {
		let intervalTime = 100
		let timeSpent = 0
		this.diceAnimInterval = setInterval(() => {
			if (timeSpent >= time && time != -1) {
				this.setDice(correctValues)
				clearInterval(this.diceAnimInterval)
				return
			}
			if (timeSpent >= intervalTime) {
				intervalTime *= ((time == -1) ? 1 : 1.15)
				const values: Array<number> = []
				for (let i = 0; i < 6; i++) {
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
		let j = 1
		dices.each((i: number) => {
			const dice = dices[i]
			let doesExist = false
			const diceChildren = $(dice).children("div")
			const dots = values[i]
			diceChildren.each((index: number) => {
				const element = diceChildren[index]
				if (!$(element).attr("class")?.startsWith("dots")) return
				const dotsIndexStr = $(element).attr("class") as string
				const dotsIndex = parseInt(dotsIndexStr.charAt(dotsIndexStr.length - 1))
				if (dotsIndex == dots) {
					doesExist = true
				}
			})
			if (doesExist) return

			$(dice).empty()

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

		for (let i = 1; i <= 6; i++) {
			if ($(`#clickHandler${i}`).length > 0) return
			const clickHandler = document.createElement("div")
			$(clickHandler).addClass("click-handler")
			$(clickHandler).attr("id", "clickHandler" + i)
			$(clickHandler).click((event) => {
				const idStr = $(event.target).attr("id") as string
				const id = parseInt(idStr?.charAt(idStr.length - 1))
				if (!this.selectedDices[id]) {
					$(`#dice${id}`).addClass("selected")
				} else {
					$(`#dice${id}`).removeClass("selected")
				}
				this.selectedDices[id] = !this.selectedDices[id]
			})
			$(`#dice${i}`).append(clickHandler)
		}

	}

	private playNumbersAnim(element: HTMLElement, start: number, stop: number) {
		if (start === 0 && stop === 0) {
			$(element).text(0)
			return
		}
		const interval = 10
		const difference = Math.abs(start - stop)
		let temp = start > stop ? stop : start
		this.numberInterval = setInterval(() => {
			if ((temp >= stop && start <= stop) || (temp <= stop && start >= stop)) {
				clearInterval(this.numberInterval)
				this.numberInterval = undefined
				$(element).text(stop.toFixed(0))
				return
			}

			if (start < stop) {
				temp += difference * 0.01
			} else {
				temp -= difference * 0.01
			}
			$(element).text(temp.toFixed(0))
		}, interval)
	}


}