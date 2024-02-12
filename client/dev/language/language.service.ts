import { languageConfig } from './language.config.js'

export class LanguageService {

	constructor() {
		const defaultLanguage = "ENG"
		document.addEventListener("DOMContentLoaded", () => {
			this.setLanguage(defaultLanguage)
		})
	}

	private setLanguage = (langName: string) => {


		const language: any = languageConfig[langName]

		Object.keys(language).forEach((id: string) => {
			const element = $("#" + id)
			console.log(element)
			if (!element) return

			const text = language[id]

			switch (element.prop("nodeName")) {
				case "INPUT":
					$(element).attr("placeholder", text)
					break
				default:
					$(element).text(text)
			}
		})

	}

}