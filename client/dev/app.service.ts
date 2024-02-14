export class AppService {

	private static ip: string | undefined

	private static events: Record<string, Function> = {}

	public static setIP = (ip: string) => { AppService.ip = ip }

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
		console.log(str)
		$.ajax({
			url: `http://${AppService.ip}:8080/${eventName}`,
			type: "POST",
			data: str,
			contentType: 'application/json',
			success: (response) => {
				successFunc(response)
			},
			error: (xhr, status, error) => {
				console.log(xhr.responseText, status, error)
				errorFunc(xhr.responseText)
			},
		})
	}

}