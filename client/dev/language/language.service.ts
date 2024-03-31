import { LogLevels } from '../enums/logLevels.enum.js'
import { log } from '../utils/log.js'
import { languageConfig } from './language.config.js'

/*
	Třída LanguageService - je třída služby jazyka, která se zabývá zpracováním logiky nastavení a initializace řádku na stránce podle jazyka
*/
export class LanguageService {

	// nastavení standardního jazyka
	private language = "ENG"

	// konstruktor třídy, ze po načítání stránky, bude vyvolána metoda nastavení textových prvků podle jazyka
	constructor() {
		document.addEventListener("DOMContentLoaded", () => {
			this.update(this.language)
		})
	}

	// Gettery
	public getLanguage = () => { return this.language }

	// Settery
	public setLanguage = (language: string) => { this.language = language }

	// metoda nastavení jazykových prvků podle jazyka. Pro všechny řádky z konfiguráčního souboru, zkusí si vyhledat prvken na stránce a vnořit do něj text podle typu prvku
	private update = (langName: string) => {
		const language: any = languageConfig[langName]

		Object.keys(language).forEach((id: string) => {
			const element = $("#" + id)
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
		log(LogLevels.INFO, "Language " + this.language + " has been initialized")
	}

}