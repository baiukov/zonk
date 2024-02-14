import { languageConfig } from './language.config.js'

export class LanguageService {

	private language = "ENG"

	constructor() {
		document.addEventListener("DOMContentLoaded", () => {
			this.update(this.language)
		})
	}

	public getLanguage = () => { return this.language }

	public setLanguage = (language: string) => { this.language = language }

	private update = (langName: string) => {
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