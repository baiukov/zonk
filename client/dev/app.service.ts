
export class AppService {

	private static events: Record<string, Function> = {}

	constructor() {
	}

	public static on = (eventName: string, event: Function) => {
		AppService.events[eventName] = event
	}

	public static emit = (eventName: string, data: any) => {
		Object.getOwnPropertyNames(AppService.events).forEach((currentEvent: string) => {
			if (eventName != currentEvent) return
			AppService.events[currentEvent](data)
		})
	}

}