export class GameView {

	public setDiceAmount = (element: HTMLDivElement, amount: number) => {
		if (amount === 5) {
			const dotsFirst = $("<div class='dots5'></div>")
			const dotsSecond = $("<div class='dots51'></div>")
			const dotsThird = $("<div class='dots5'></div>")
			$(dotsFirst).append($("<div class='dot'></div>"))
			$(dotsFirst).append($("<div class='dot'></div>"))
			$(dotsSecond).append($("<div class='dot'></div>"))
			$(dotsThird).append($("<div class='dot'></div>"))
			$(dotsThird).append($("<div class='dot'></div>"))

			$(element).append(dotsFirst, dotsSecond, dotsThird)
			return
		}

		const newDots = document.createElement("div")
		$(newDots).addClass("dots" + amount)
		for (let i = 0; i < amount; i++) {
			const dot = document.createElement("div")
			$(dot).addClass("dot")
			$(newDots).append(dot)
		}
		$(element).append(newDots)
	}

	public setClickHandler = (id: number, selectedDices: Array<number>, isClickable: boolean, bannedDices: Array<number>) => {
		if ($(`clickHandler${id}`).length > 0) return
		const clickHandler = document.createElement("div")
		$(clickHandler).addClass("click-handler")
		$(clickHandler).attr("id", "clickHandler" + id)
		if (isClickable && !bannedDices.includes(id)) {
			$(clickHandler).click((event) => {
				const idStr = $(event.target).attr("id") as string
				const id = parseInt(idStr?.charAt(idStr.length - 1))
				if (!selectedDices.includes(id)) {
					$(`#dice${id}`).addClass("selected")
					selectedDices.push(id)
				} else {
					$(`#dice${id}`).removeClass("selected")
					selectedDices.splice(selectedDices.indexOf(id), 1)
				}
			})
		} else {
			$(clickHandler).click(() => { })
		}

		$(`#dice${id}`).append(clickHandler)
	}

}