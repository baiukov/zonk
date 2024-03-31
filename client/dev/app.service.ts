
/*
	Třída AppService - je třída služby aplikace, která se zabývá zpracováním logiky registrace a vyvolání eventu tak, že při jejich registraci uloží je do seznamu a po vyvolání v tom seznamu vyhledá a vyvolá metodu
*/
export class AppService {

	// uložení seznamu eventů
	private static events: Record<string, Function> = {}

	// metoda pro registrace eventu
	public static on = (eventName: string, event: Function) => {
		AppService.events[eventName] = event
	}

	// metoda pro vyvolání některého z eventu, vyhledá ho v seznamu, pokud najde vyvolá příslušnou metodu
	public static emit = (eventName: string, data: any) => {
		Object.getOwnPropertyNames(AppService.events).forEach((currentEvent: string) => {
			if (eventName != currentEvent) return
			AppService.events[currentEvent](data)
		})
	}

}