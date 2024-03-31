import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { secToMs } from '../utils/secToMs.js'

/*
	Třída NotificationsService - je třída služby notifikací, která se zabývá zpracováním logiky vypísování zpráv na obrazovku a jejich pak mazáním
*/
export class NotificationsService {

	// metoda která přidá zprávu na obrazovku a po 10 sekudnách ji smaže
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
		log(LogLevels.INFO, "Notification has been shown. Message: " + message)
	}

}