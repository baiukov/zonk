
export class AppService {

	private static ip: string | undefined

	private static events: Record<string, Function> = {}

	constructor() {
		if (!localStorage.getItem("ip")) return
		// @ts-ignore
		AppService.ip = localStorage.getItem("ip").replaceAll('"', '') as string
	}

	public static setIP = (ip: string) => {
		AppService.ip = ip
		localStorage.setItem("ip", ip)
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

	public static emitServer = (eventName: string, data: any, successFunc: Function, errorFunc: Function) => {
		const str = JSON.stringify(data)

		if (!AppService.ip) { return }

		$.ajax({
			url: `http://${AppService.ip}:8080/${eventName}`,
			type: "POST",
			data: str,
			contentType: 'application/json',
			success: (response) => {
				successFunc(response)
			},
			error: (xhr, status, error) => {
				errorFunc(xhr.responseText)
			},
		})
	}

}