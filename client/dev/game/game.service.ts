import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { GameStatuses } from '../enums/gameStatuses.enum.js'
import { LogLevels } from '../enums/logLevels.enum.js'
import { ServerEvents } from '../enums/serverEvents.enum.js'
import { languageConfig } from '../language/language.config.js'
import { getID } from '../utils/getID.js'
import { log } from '../utils/log.js'
import { secToMs } from '../utils/secToMs.js'
import { showPlayers } from '../utils/showPlayers.js'
import { GameView } from './game.view.js'

/*
	Třída GameService - je třída služby hry, která se zabývá zpracováním logiky akce, které se provadějí během hry
*/
export class GameService {

	// uložení aktuálního jazyka
	private currentLanguage = "ENG"

	// vytvoření a uložení instance view hry
	private view = new GameView()

	// uložení probíhajících intervalů
	private intervals: Record<string, NodeJS.Timeout | null> = {
		diceAnimInterval: null,
		numberAnimInterval: null
	}

	// uložení seznamů vybraných kostek
	private selectedDices: Array<number> = []

	// uložení seznamů zablokovaných kostek
	private bannedDices: Array<number> = []

	// konstruktor třídy, který vyvolá potřebné pro initializaci metody
	constructor() {
		this.init()
		this.watch()
		this.watchUpdate()
	}

	// metoda pro nastavení aktuálního jazyka
	public setCurrentLanguage = (language: string) => {
		this.currentLanguage = language
	}

	// metoda pro nastavení poslouchače kliknutí tlačitek
	private watch = () => {
		$("#roll").click(this.roll)
		$("#reroll").click(this.checkCombination)
		$("#submitRoll").click(this.submitRoll)
		log(LogLevels.INFO, "Game buttons' listeners have been initialized")
	}

	// metoda potvrzení výsledku kola po hazení kostek, pošle požadavek o to na server
	private submitRoll = () => {
		const id = getID()

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.SubmitRoll,
				data: { id: id },
				onSuccess: (_: string) => {
					this.selectedDices = []
					this.bannedDices = []
					log(LogLevels.INFO, "The roll has been submited")
				},
				onError: (error: string) => {
					log(LogLevels.ERROR, "Cannot submit roll. Caused by: " + error)
				}
			}
		)
		return false
	}

	// metoda ověření kombinací, vybraných hráčem, po ověření, že je vybrán aspoň jedena kostka, pošle požadavek o ověření na server
	private checkCombination = () => {
		if (this.selectedDices.length === 0) {
			log(LogLevels.WARN, "Cannot check combination. Caused by: none of dice are picked")
			AppService.emit(Events.Notify, languageConfig[this.currentLanguage].pickOne)
			return
		}

		const id = getID()

		const chosenDices: Record<number, number> = {}
		for (let i = 0; i < this.selectedDices.length; i++) {
			const diceID = this.selectedDices[i]
			chosenDices[diceID] = this.getDiceAmount(diceID)
		}

		const data = {
			id: id,
			chosenDices: chosenDices
		}

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.CheckCombination,
				data: data,
				onSuccess: (response: string) => {
					if (JSON.parse(response).result) {
						this.reroll(data)
					} else {
						log(LogLevels.WARN, "Cannot reroll. Caused by: wrong combination")
						AppService.emit(
							Events.Notify,
							languageConfig[this.currentLanguage].wrongCombination
						)
					}
				},
				onError: (error: string) => {
					log(LogLevels.ERROR, "Cannot reroll. Caused by: " + error)
					AppService.emit(Events.Notify, error)
					return false
				}
			}
		)
		return false
	}

	// metoda pro přehození kostek, pošle požadavek na server
	private reroll = (data: Record<string, string | Object>) => {
		$(".click-handler").click(() => { return false })
		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.Reroll,
				data: data,
				onSuccess: (_: string) => {
					for (let i = 0; i < 6; i++) {
						if (this.selectedDices.includes(i)) continue
						this.playDiceAnim(i, secToMs(5), Math.round(Math.random() * 5 + 1))
					}
					log(LogLevels.INFO, "Player has rerolled successfully.")
				},
				onError: (error: string) => {
					log(LogLevels.ERROR, "Cannot reroll. Caused by: " + error)
				}
			}
		)
		return false
	}

	// metoda pro žískání počtu bodů na kostce
	private getDiceAmount = (diceID: number) => {
		const allDices = $(".dice")
		let amount: number = 0
		allDices.each((i: number) => {
			const dice = allDices[i]
			const diceIDStr = $(dice).attr("id")
			if (!diceIDStr) { return undefined }
			const currentDiceID = parseInt(diceIDStr[diceIDStr.length - 1])
			if (currentDiceID !== diceID) return undefined
			const diceChildren = $(dice).children("div")
			const dots = diceChildren[0]
			const dotsAmountStr = $(dots).attr("class")
			if (!dotsAmountStr) return undefined
			const dotsAmount = parseInt(dotsAmountStr[dotsAmountStr.length - 1])
			amount = dotsAmount
		})
		return amount
	}

	// metoda pro hazení kostkami, pošle požadavek na server
	private roll = () => {
		for (let i = 0; i < 6; i++) {
			if (this.selectedDices.includes(i)) continue
			this.playDiceAnim(i, secToMs(5), Math.round(Math.random() * 5 + 1))
		}

		const id = getID()

		AppService.emit(
			Events.EmitServer,
			{
				eventName: ServerEvents.Roll,
				data: { id: id },
				onSuccess: (_: string) => {
					log(LogLevels.INFO, "Player has rolled successfully")
				},
				onError: (error: string) => {
					log(LogLevels.ERROR, "Cannot roll. Caused by: " + error)
				}
			}
		)
		return false
	}

	// metoda pro obnovení stránky hry pro hráče, nastavuje se interval pro posílání požadavků na server s dotazem na aktuální stav
	private watchUpdate = () => {
		if (window.location.pathname != "/pages/game/") return

		setInterval(() => {
			const id = getID()

			AppService.emit(
				Events.EmitServer,
				{
					eventName: ServerEvents.UpdateState,
					data: { id: id },
					onSuccess: (response: string) => {
						this.update(response)
					},
					onError: (error: string) => {
						log(LogLevels.ERROR, "Cannot update player list. Caused by: " + error)
						AppService.emit(Events.Notify, error)
						window.location.href = "../lobby"
					}
				}
			)
		}, 100)
	}

	// metoda pro obnovení prvků stránky hry po získání nových dat o aktuálním stavu
	private update = (dataStr: string) => {
		const data = JSON.parse(dataStr)
		if (!data) {
			log(LogLevels.ERROR, "Cannot update game state. Caused by: no data")
			AppService.emit(Events.Notify, languageConfig[this.currentLanguage].smthWrong)
			return
		}

		const status = data.status
		const isTurn = data.turn
		this.checkTurn(isTurn, status)
		this.setPoints($("#totalPoints"), data.total)
		this.setPoints($("#goalPoints"), data.goal)
		showPlayers(data)
		this.setDicesForNotTurn(status, isTurn, data.bannedDices)
		this.updateDices(data.dices, status, data.bannedDices)
		this.setCurrentPoints(data.currentPoints)
		this.checkButtonsVisibilty(status, isTurn)
		this.selectedUpdate()
		this.checkWin(data.winner, data.turn)
	}

	// metoda pro ověření, jestli už není vítěž, pokud je, tak se zobrazí okno s jménem vítěze a pošle požadavek o ukončení hry
	private checkWin = (winner: string, turn: boolean) => {
		if (!winner) return
		$(".win").show()
		$("#winner").text(winner)
		log(LogLevels.INFO, "Game has been finished. Winner: " + winner)
		setTimeout(() => {
			if (!turn) {
				window.location.href = "../lobby"
				return
			}
			AppService.emit(
				Events.EmitServer,
				{
					eventName: ServerEvents.CloseGame,
					data: { id: getID() },
					onSuccess: (_: string) => {
						log(LogLevels.INFO, "Game has been closed successfully")
						window.location.href = "../lobby"
					},
					onError: (error: string) => {
						log(LogLevels.ERROR, "Cannot close game. Caused by: " + error)
						AppService.emit(Events.Notify, error)
					}
				}
			)

		}, secToMs(10))
	}

	// metoda pro obnovení vybraných kostek
	private selectedUpdate = () => {
		for (let i = 0; i < 6; i++) {
			const element = $(`#dice${i}`)
			if (this.selectedDices.includes(i)) {
				if ($(element).hasClass('selected')) return
				$(element).addClass('selected')
				return
			}
			$(element).removeClass('selected')
		}
	}

	// metoda pro ověření viditelnosti tlačitek správy kola
	private checkButtonsVisibilty = (status: string, turn: boolean) => {
		if (turn && status != GameStatuses.PENDING) {
			$("#roll").show()
			$("#roll").removeAttr("disabled")
		} else {
			$("#roll").attr("disabled")
		}
		if (status != GameStatuses.PENDING || !turn) {
			$("#reroll").hide()
			$("#submitRoll").hide()
			$("#roll").show()
		}
		if (status === GameStatuses.PENDING && turn && !$("#reroll").is(":visible")) {
			$("#roll").hide()
			$("#submitRoll").show()
			$("#reroll").show()
		}
		if (status === GameStatuses.ROLLING) {
			$("#roll").attr("disabled", '')
		}
	}

	// metoda pro nastavení aktuálního počtu bodů za kolo
	private setCurrentPoints = (currentPoints: number) => {
		const element = $("#currentPoints") as unknown as HTMLElement
		if (parseInt($(element).text()) === currentPoints || this.intervals.numberAnimInterval) {
			return
		}
		this.playNumbersAnim(
			element,
			parseInt($(element).text()) || 0,
			currentPoints,
		)
		log(LogLevels.INFO, "Current points have been updated. New amount: " + currentPoints)
	}

	// metoda pro obnovení zablokovaných kostek
	private updateDices = (dices: Array<number> | undefined, status: string, dataBannedDices: Array<number>) => {
		const bannedDices = []
		for (let i = 0; i < dataBannedDices.length; i++) {
			if (dataBannedDices[i] == 0) continue
			bannedDices.push(i)
		}
		if (!dices || status == GameStatuses.ROLLING) return
		for (let i = 0; i < dices.length; i++) {
			this.setDice(i, dices[i], !bannedDices.includes(i))
		}
		bannedDices.forEach((dice) => {
			if (this.selectedDices.includes(dice)) return
			this.selectedDices.push(dice)
		})
	}

	// metoda pro obnovení celkového scóre, pokud se počet změnil
	private setPoints = (element: JQuery<HTMLElement>, points: number) => {
		const currentPoints = parseInt(element.text())
		if (currentPoints === points) return
		element.text(points)
	}

	// metoda pro ověření, jestli hráč teď hraje
	private checkTurn = (turn: boolean, status: string) => {
		if (turn || status != GameStatuses.ROLLING || this.intervals.diceAnimInterval) return
		for (let i = 0; i < 6; i++) {
			this.playDiceAnim(i, secToMs(5.2), 1)
		}
	}

	// metoda pro nastavení kostek pro nehrající hráče
	private setDicesForNotTurn = (status: string, turn: boolean, bannedDices: Array<number>) => {
		if (status != GameStatuses.ROLLING) return
		if (turn) return
		$("#roll").attr("disabled", '')
		const dicesToRoll = [0, 1, 2, 3, 4, 5]
		if (bannedDices) {
			for (let i = 0; i < bannedDices.length; i++) {
				dicesToRoll.splice(dicesToRoll.indexOf(bannedDices[i]), 1)
			}
		}
		dicesToRoll.forEach((dice) => {
			this.playDiceAnim(dice, 5, 1)
		})
	}

	// metoda pro initializaci poslouchačů tlačítek a kostek na desce
	private init = () => {
		$("#roll").hide()
		$("#reroll").hide()
		$("#submitRoll").hide()
		for (let i = 0; i < 6; i++) {
			this.setDice(i, i + 1, true)
		}
	}

	// metoda přehrávání animaci při hazení kostek
	private playDiceAnim = (diceID: number, time: number, correctValue: number) => {
		let nextTimeToSwitch = time * 0.01
		let currentTime = 0
		const interval = setInterval(() => {
			this.intervals.diceAnimInterval = interval
			if (currentTime >= nextTimeToSwitch) {
				const randomDice = Math.round(Math.random() * 5 + 1)
				this.setDice(diceID, randomDice, false)
				nextTimeToSwitch *= 1.15
			}
			if (currentTime >= time) {
				this.setDice(diceID, correctValue, true)
				this.intervals.diceAnimInterval = null
				clearInterval(interval)
				return
			}
			currentTime += 50
		}, 50)

	}

	// metoda pro nastavení počtu bodů na kostce a jestli je možné ji výbrat
	private setDice = (diceID: number, amount: number, isClickable: boolean) => {
		const diceField = $(".dices")
		const dices = diceField.children("div")

		const setDiceToChild = (i: number) => {
			const currentDice = dices[i]
			const currentDiceStr = $(currentDice).attr("id")
			if (!currentDiceStr) {

				return
			}
			const currentDiceID = currentDiceStr[currentDiceStr.length - 1]
			if (parseInt(currentDiceID) != diceID) return
			const diceChildren = $(currentDice).children("div")
			if (!diceChildren) return

			const diceFirstChild = diceChildren[0]
			const diceFirstChildIDStr = $(diceFirstChild).attr("class")
			if (diceFirstChildIDStr) {
				const diceFirstChildAmount = diceFirstChildIDStr[diceFirstChildIDStr.length - 1]
				if (parseInt(diceFirstChildAmount) === amount) return
			}
			$(currentDice).empty()

			this.view.setDiceAmount(currentDice, amount)
			this.view.setClickHandler(parseInt(currentDiceID), this.selectedDices, isClickable, this.bannedDices)
		}

		dices.each((i: number) => {
			setDiceToChild(i)
		})

	}

	// metoda pro přehrávání animaci čísel
	private playNumbersAnim(element: HTMLElement, start: number, stop: number) {
		if (start === 0 && stop === 0) {
			$(element).text(0)
			return
		}
		const interval = 10
		const difference = Math.abs(start - stop)
		let temp = start > stop ? stop : start
		this.intervals.numberAnimInterval = setInterval(() => {
			if ((temp >= stop && start <= stop) || (temp <= stop && start >= stop)) {
				clearInterval(this.intervals.numberAnimInterval || undefined)
				this.intervals.numberAnimInterval = null
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