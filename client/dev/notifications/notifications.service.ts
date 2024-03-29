import { secToMs } from '../utils/secToMs.js'

export class NotificationsService {

	public show(message: string) {
		const error = document.createElement("div")
		$(error).hide()
		$(error).addClass("error")
		const errorText = document.createElement("p")
		$(errorText)
			.addClass("error-message")
			.text(message)
		$(error).append(errorText)

		$(error).click(() => { $(error).remove() })

		$(".error-pane").append(error)

		const unshow = (elem: HTMLDivElement) => {
			$(elem).fadeOut(secToMs(1), () => {
				$(elem).remove()
			})
		}

		const show = (elem: HTMLDivElement) => {
			$(error).fadeIn(secToMs(1), () => {
				setTimeout(() => { unshow(elem) }, secToMs(10))
			})
		}

		show(error)

	}

}